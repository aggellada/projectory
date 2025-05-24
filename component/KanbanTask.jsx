"use client";

import { doneTaskKanban, updateTask } from "@/util/form";
import { Check, X } from "lucide-react";

export default function KanbanTask({ task, kbLower, slug }) {
  const colorMap = {
    backlog: "bg-red-800",
    doing: "bg-yellow-800",
    review: "bg-blue-800",
    completed: "bg-green-800",
  };

  return (
    <div
      className={`w-full flex justify-between pl-8 pr-4 ${colorMap[kbLower]} rounded-2xl`}
    >
      <h1 className="text-lg">{task.title}</h1>
      <div className="flex gap-2 items-center justify-end">
        <button onClick={() => updateTask(task.id, kbLower, slug)}>
          <X className="hover:text-red-600 transition hover:cursor-pointer" />
        </button>
        {task.completed === false && (
          <button
            onClick={() => doneTaskKanban(task.id, "completed", kbLower, slug)}
          >
            <Check className="hover:text-green-400 transition hover:cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
}
