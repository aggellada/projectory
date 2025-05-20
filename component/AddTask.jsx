"use client";

import { addTask } from "@/util/form";

export default function AddTask({ slug }) {
  return (
    <form
      action={(formData) => addTask(formData, slug)}
      className="flex items-center justify-between md:justify-normal md:gap-12 w-full"
    >
      <input
        type="text"
        name="title"
        id="title"
        className="w-[230px] md:w-[300px] bg-white text-black"
      />
      <button
        type="submit "
        className="bg-[#5b2797] text-sm md:text-md px-4 py-2 md:px-6 md:py-2 rounded-4xl hover:cursor-pointer"
      >
        +Add Task
      </button>
    </form>
  );
}
