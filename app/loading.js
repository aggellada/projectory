"use client";

import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <p className="text-white text-lg">Loading...</p>
        <p className="text-white text-lg">
          Please wait while your data is loading.
        </p>
      </div>
    </div>
  );
}
