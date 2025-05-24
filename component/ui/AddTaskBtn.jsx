"use client";

import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

function AddTaskBtn({ setUpdating }) {
  const { pending, data } = useFormStatus();

  useEffect(() => {
    if (pending) {
      setUpdating(true);
    } else {
      setUpdating(null);
    }
  }, [pending]);

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-[#5b2797] text-sm md:text-md px-4 py-2 md:px-6 md:py-2 rounded-4xl hover:cursor-pointer"
    >
      {pending ? "Uploading..." : "Add Task"}
    </button>
  );
}

export default AddTaskBtn;
