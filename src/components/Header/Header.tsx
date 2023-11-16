"use client";
import Link from "next/link";
import Logo from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontend-routes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function Header() {
    const { data: session } = useSession();

    return (
        <header>
            <nav className='mx-auto flex items-center justify-between px-4 py-2 lg:px-8'>
                <div className='flex items-center gap-2 text-xl font-bold'>
                    <Logo />
                </div>

                <div className='flex items-center gap-6'>
                    {!session && (
                        <Link href={Route.SIGNIN}>
                            <Button className='flex gap-2'>
                                Se connecter <ArrowRightIcon />
                            </Button>
                        </Link>
                    )}

                    <ModeToggle />

                    {session?.user?.name && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <HamburgerMenuIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={Route.WALLET}>Mon Wallet</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={Route.PROFILE}>Mon profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button onClick={() => signOut()}>Se déconnecter</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </header>
    );
}
