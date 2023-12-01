"use client";

import Image from "next/image";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { useToast } from "@/src/components/ui/use-toast";
import useDateFormatter from "@/src/hooks/useDateFormatter";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { makeCardOpacity } from "@/src/utils/animations";
import { currencies } from "@/src/utils/currencies";
import { operationFormats } from "@/src/utils/operationFormats";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const MyAccountCard: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  const { toast } = useToast();
  const formattedDate = useDateFormatter(user ? user.createdAt : new Date());
  const randomImageUrl = useGetRandomImageUrl();

  const currenciesNames = currencies.map((currency) => currency.name);

  const handleCurrencyChange = (newCurrencyName: string) => {
    const newCurrency = currencies.find((currency) => currency.name === newCurrencyName);

    if (user && newCurrency && newCurrency.name !== user.currency.name) {
      UserApi.patch({ currency: newCurrency }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.currency = newCurrency;

          setUser(newUser);
          toast({
            title: "Devise",
            description: "La devise a bien été mise à jour.",
          });
        }
      });
    }
  };

  const handleFormatChange = (newFormat: string) => {
    if (user && newFormat !== user.operationFormat) {
      UserApi.patch({ operationFormat: newFormat }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.operationFormat = newFormat;

          setUser(newUser);
          toast({
            title: "Format des opérations",
            description: "Le format des opérations a bien été mis à jour.",
          });
        }
      });
    }
  };

  if (!user) return null;

  return (
    <motion.div className="w-full lg:w-fit" initial="hidden" animate="visible" variants={makeCardOpacity()}>
      <Card className="w-full lg:w-fit lg:min-w-[400px]">
        <CardHeader className="p-2">
          <div className="relative mb-8">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={randomImageUrl ?? ""} alt="user banner" />
            </picture>

            {user.avatar && (
              <Image
                className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-black"
                width={100}
                height={100}
                src={user.avatar}
                alt="Avatar"
                priority
              />
            )}

            <div className="float-right">
              <Tooltip
                title="Pourquoi ne puis-je pas modifier mes informations personnelles ?"
                description="Walletoo récupère vos informations directement du service tiers utilisé pour la connexion. Par conséquent, Walletoo ne peut pas modifier ces informations."
              />
            </div>
          </div>

          <CardTitle className="relative text-center text-lg font-semibold">{user.fullName}</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-3 p-5 text-sm">
          <div className="flex items-center gap-2">
            <p className="break-keep">E-mail :</p>
            <b>{user.email}</b>
          </div>

          <div className="flex items-center gap-2">
            <p className="break-keep">Création : </p>
            <b>{formattedDate}</b>
          </div>

          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap">Format des opérations :</p>
            <Select
              defaultValue={user.operationFormat ?? ""}
              onValueChange={(newValue) => handleFormatChange(newValue)}
            >
              <SelectTrigger className="h-6 w-fit">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {operationFormats.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap">Devise :</p>
            <Select
              defaultValue={user.currency.name ?? ""}
              onValueChange={(newValue) => handleCurrencyChange(newValue)}
            >
              <SelectTrigger className="h-6 w-fit">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {currenciesNames.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
