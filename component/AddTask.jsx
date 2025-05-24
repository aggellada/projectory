"use client";

import { addTask } from "@/util/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import AddTaskBtn from "./ui/AddTaskBtn";

export default function AddTask({ slug }) {
  const [updating, setUpdating] = useState(null);

  console.log("updating2: ", updating);

  return (
    <form
      action={(formData) => addTask(formData, slug)}
      className="flex items-center justify-between md:justify-normal md:gap-12 w-full"
    >
      {updating && (
        <div className="w-[150px] h-[50px] rounded-4xl fixed bottom-10 right-10 bg-zinc-100 flex gap-4 items-center px-4 text-black">
          <Loader2 className="animate-spin text-black" />
          <h1>Updating</h1>
        </div>
      )}
      <input
        type="text"
        name="title"
        id="title"
        className="w-[230px] md:w-[300px] bg-white text-black"
      />
      <AddTaskBtn setUpdating={setUpdating} />
    </form>
  );
}
