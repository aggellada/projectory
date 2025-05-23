"use client";

import newProject from "@/util/form";
import { forwardRef } from "react";
import SaveButton from "./ui/SaveButton";

const Modal = forwardRef(function ({ handleCloseModal }, ref) {
  return (
    <dialog
      ref={ref}
      onClose={handleCloseModal}
      className="m-auto p-12 rounded-2xl border-2 border-violet-900 bg-[hsl(224,71%,4%)] text-white backdrop:bg-[rgba(0,0,0,0.692)]"
    >
      <div className="flex flex-col items-center gap-4 pb-6">
        <h1 className="font-bold text-2xl">Add Project Entry</h1>
        <p>Fill in the form below</p>
      </div>
      <form className="flex flex-col" action={newProject}>
        <label htmlFor="project">Project: </label>
        <input
          type="text"
          className="w-[300px] border-2 rounded-sm bg-[hsl(216,37%,13%)] border-gray-600"
          id="project"
          name="project"
          required
        />
        <label>Date: </label>
        <input
          type="date"
          className="w-[300px] border-2 rounded-sm bg-[hsl(216,37%,13%)] border-gray-600"
          id="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <label htmlFor="description">Description: </label>
        <textarea
          rows="6"
          className="w-[300px] border-2 rounded-sm bg-[hsl(216,37%,13%)] border-gray-600"
          id="description"
          name="description"
          required
        />
        <div className="flex gap-4 justify-end pt-4 ">
          <button
            onClick={handleCloseModal}
            type="button"
            className="px-4 py-1 rounded-2xl hover:cursor-pointer"
          >
            Close
          </button>
          <SaveButton handleCloseModal={handleCloseModal} />
        </div>
      </form>
    </dialog>
  );
});

export default Modal;
