"use client";

import { changeTask, deleteTask, updateTask } from "@/util/form";
import { Loader2, Pencil, Save, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Tasks({ task, slug }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(null);

  const inputRef = useRef();

  const handleEditBtn = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {updating && (
        <div className="w-[150px] h-[50px] rounded-4xl fixed bottom-10 right-10 bg-zinc-100 flex gap-4 items-center px-4 text-black">
          <Loader2 className="animate-spin text-black" />
          <h1>Updating</h1>
        </div>
      )}

      {!task.role && !task.completed && (
        <div
          className={`flex w-full p-2 md:p-4 rounded-2xl ${
            task.completed ? "bg-green-700" : "bg-gray-900"
          }`}
        >
          <div className="w-full flex justify-between pl-6">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                className="bg-white text-black"
                placeholder={task.title}
                defaultValue={task.title}
                // required
              />
            ) : (
              <h1 className="text-l font-light">{task.title}</h1>
            )}
            <div className="flex gap-4 md:gap-9 pr-6">
              <select
                id="actions"
                onChange={async (e) => {
                  setUpdating(true);
                  try {
                    await updateTask(task.id, e.target.value, slug);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setUpdating(null);
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Actions
                </option>
                <option value="backlog" className="text-black">
                  Backlog
                </option>
                <option value="doing" className="text-black">
                  Doing
                </option>
                <option value="review" className="text-black">
                  Review
                </option>
                <option value="completed" className="text-black">
                  Done
                </option>
              </select>
              {isEditing ? (
                <button
                  onClick={() => {
                    changeTask(task.id, inputRef.current.value, slug);
                    setIsEditing(false);
                  }}
                >
                  <Save className="hover:text-blue-500 transition" />
                </button>
              ) : (
                <button onClick={handleEditBtn}>
                  <Pencil className="hover:text-blue-500 transition hover:cursor-pointer" />
                </button>
              )}
              <button
                onClick={() => {
                  deleteTask(task.id, slug);
                }}
              >
                <Trash2 className="hover:text-red-500 transition hover:cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
