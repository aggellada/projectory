"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DateTime() {
  const [dateAndTime, setDateAndTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const currentDate = date.toLocaleString();
      setDateAndTime(currentDate);
    }, 1000);
  }, []);

  return (
    <Link href="/">
      <h1>{dateAndTime}</h1>
    </Link>
  );
}
