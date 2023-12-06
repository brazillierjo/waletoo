"use client";

import { useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import { Calendar } from "@/src/components/ui/calendar";
import { Card } from "@/src/components/ui/card";
import { getLocale } from "@/src/utils/locales";
import { useAtom } from "jotai";

export const CalendarWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const locale = getLocale(user?.lang);

  return (
    <Card className="h-fit w-fit ring">
      <Calendar mode="single" selected={date} onSelect={setDate} locale={locale} className="rounded-md border" />
    </Card>
  );
};