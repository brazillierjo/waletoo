import UserModel from "@/src/mongoDB/userSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/utils/authOptions";
import { NextRequest } from "next/server";
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";
import { ITransaction } from "@/src/interfaces/transactionInterface";

export async function POST(req: NextRequest, config: { params: { type: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const user = await UserModel.findOne({ email: session?.user?.email });
        const { type } = config.params;

        // IF NO SESSION FOUND, RETURN 401
        if (!session) throw new Error("Unauthorized");

        // IF NO USER FOUND, RETURN 404
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }

        // IF TYPE IS NOT INCOMES OR EXPENSES, RETURN 400
        if (type !== DynamicUrlParams.INCOMES && type !== DynamicUrlParams.EXPENSES) {
            return new Response(JSON.stringify({ message: "Invalid type" }), {
                status: 400,
            });
        }

        // IF THERE IS NO BODY, RETURN 400
        if (!req.body) {
            return new Response(JSON.stringify({ message: "No body provided" }), {
                status: 400,
            });
        }

        const { label, amount } = await req.json();
        const newTransaction = { label, amount };

        if (type === DynamicUrlParams.INCOMES) {
            user.incomes.push(newTransaction);
            await user.save();
            return new Response(JSON.stringify({ data: user.incomes[user.incomes.length - 1], message: "Transaction added.", status: 200 }));
        }

        if (type === DynamicUrlParams.EXPENSES) {
            user.expenses.push(newTransaction);
            await user.save();
            return new Response(JSON.stringify({ data: user.expenses[user.expenses.length - 1], message: "Transaction added.", status: 200 }));
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}

export async function DELETE(req: NextRequest, config: { params: { type: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const user = await UserModel.findOne({ email: session?.user?.email });
        const { type } = config.params;
        const { id: _id } = await req.json();

        // IF NO SESSION FOUND, RETURN 401
        if (!session?.user?.email) throw new Error("Unauthorized");

        // IF NO USER FOUND, RETURN 404
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }

        // IF TYPE IS NOT INCOMES OR EXPENSES, RETURN 400
        if (type !== DynamicUrlParams.INCOMES && type !== DynamicUrlParams.EXPENSES) {
            return new Response(JSON.stringify({ message: "Invalid type" }), {
                status: 400,
            });
        }

        // IF THERE IS NO ID IN THE BODY, RETURN 400
        if (!_id) {
            return new Response(JSON.stringify({ message: "No id provided" }), {
                status: 400,
            });
        }

        // IF TYPE IS "incomes" OR "expenses", FILTER THE ARRAY TO REMOVE THE TRANSACTION
        if (type === DynamicUrlParams.INCOMES) {
            user.incomes = user.incomes.filter((income: ITransaction) => income._id?.toString() !== _id);
        }

        if (type === DynamicUrlParams.EXPENSES) {
            user.expenses = user.expenses.filter((expense: ITransaction) => expense._id?.toString() !== _id);
        }

        await user.save();

        return new Response(JSON.stringify({ message: "Transaction deleted.", status: 200 }));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}
