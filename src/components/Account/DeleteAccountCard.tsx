"use client";

import { useState } from "react";
import DeleteBanner from "@/public/assets/webp/delete-banner.webp";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Route } from "@/src/enums/frontendRoutes";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { signOut } from "next-auth/react";

export const DeleteAccountCard: React.FC = () => {
  const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);
  const [user] = useAtom(userAtom);

  const handleDelete = () => {
    !hasConfirmedDeletion && setHasConfirmedDeletion(true);

    hasConfirmedDeletion &&
      UserApi.delete().then((res) => {
        if (!res) return;

        signOut({
          callbackUrl: Route.HOME,
        });
      });
  };

  if (!user) return null;

  return (
    <motion.div className="w-full md:w-[400px]" initial="hidden" animate="visible" variants={makeCardOpacity(0.4)}>
      <Card className="flex flex-col justify-between">
        <CardHeader className="p-2">
          <div className="relative mb-3">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={DeleteBanner.src} alt="Delete banner" />
            </picture>
          </div>

          <CardTitle className="relative text-center text-lg font-semibold">Suppression du compte</CardTitle>
        </CardHeader>

        <Separator className="mb-4" />

        <CardDescription className="text-center text-sm">
          <span className="text-red-500">Attention</span>, cette action est irréversible.
        </CardDescription>
        <CardContent className="flex flex-col gap-2 p-5 text-center text-sm">
          Je souhaite supprimer mon compte définitivement
        </CardContent>

        <CardFooter className="flex justify-center p-5">
          <Button className={cn(hasConfirmedDeletion && "bg-red-500 hover:bg-red-500")} onClick={handleDelete}>
            {hasConfirmedDeletion ? "Confirmer la suppression" : "Supprimer mon compte"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
