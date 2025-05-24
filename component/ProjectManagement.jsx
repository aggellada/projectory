"use client";

import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import Link from "next/link";
import { deleteProject, doneProject, undoneProject } from "@/util/form";
import CircularProgressBar from "./CircularProgressBar";

export default function ProjectManagement({ projectsData, tasksData }) {
  const [addProject, setAddProject] = useState(false);
  const [expandIndex, setExpandIndex] = useState(null);
  const [sortSelected, setSortSelected] = useState(null);

  const modalRef = useRef();

  const projectsSortMap = {
    asc: [...projectsData].sort((a, b) => a.date - b.date),
    desc: [...projectsData].sort((a, b) => b.date - a.date),
    none: projectsData,
  };

  const projects = projectsSortMap[sortSelected] || projectsData;

  useEffect(() => {
    if (addProject) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [addProject]);

  const handleSortChange = (value) => {
    setSortSelected(value);
  };

  const handleAddProjectClick = () => {
    setAddProject(true);
  };

  const handleCloseModal = () => {
    setAddProject(false);
  };

  function expandDropdown(e, index) {
    e.stopPropagation();
    e.preventDefault();

    setExpandIndex(index);
    if (expandIndex === index) setExpandIndex(false);
  }

  return (
    <>
      <Modal ref={modalRef} handleCloseModal={handleCloseModal} />
      <div className="w-full min-h-[85vh] grow flex flex-col">
        <div className="w-full h-fit flex flex-col md:flex-row pt-6 px-12 gap-2">
          <div className="h-full w-full flex flex-col justify-center">
            <h1 className="font-bold text-3xl">Projects</h1>
            <p>Quick progress check on your projects.</p>
          </div>
          <div className="w-full h-full flex items-center justify-between lg:justify-end gap-8">
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="" disabled>
                Sort by:
              </option>
              <option value="none" className="text-black">
                Created
              </option>
              <option value="asc" className="text-black">
                Soonest
              </option>
              <option value="desc" className="text-black">
                Latest
              </option>
            </select>
            <button
              className="text-white px-4 py-2 lg:px-6 lg:py-3 rounded-3xl bg-purple-700 hover:cursor-pointer"
              onClick={handleAddProjectClick}
            >
              + Add Project
            </button>
          </div>
        </div>
        <div className="w-full h-full p-6">
          {projects.length != 0 ? (
            <div className="w-full flex flex-col lg:grid grid-cols-2 gap-4">
              {projects.map((formObj, i) => {
                // Date
                const currentDate = new Date();
                const diffInMilliseconds = formObj.date - currentDate;
                const diffInDays = Math.floor(
                  diffInMilliseconds / (1000 * 60 * 60 * 24)
                );

                const wordedDate = new Date(formObj.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );

                let remainingDays;
                if (diffInDays < 0) {
                  remainingDays = `${Math.abs(diffInDays)} DAYS OVERDUE`;
                } else if (diffInDays > 1) {
                  remainingDays = `${diffInDays} DAYS LEFT`;
                } else if (diffInDays === 1) {
                  remainingDays = `${diffInDays} DAY LEFT`;
                } else if (diffInDays === 0) {
                  remainingDays = "DUE TODAY";
                }

                // Completed
                const completedCount = tasksData.filter(
                  (taskArr) =>
                    taskArr.projectId === formObj.id && taskArr.completed
                ).length;

                const totalCount = tasksData.filter(
                  (taskArr) => taskArr.projectId === formObj.id
                ).length;

                const progressPercentage =
                  totalCount === 0
                    ? formObj.completed
                      ? 100
                      : 0
                    : (completedCount / totalCount) * 100;

                // const correspondingData = projectsData.find(
                //   (projData) => projData.projectId === formObj.projectId
                // );

                // const noTasks =
                //   formObj.completed && correspondingData.tasks.length === 0
                //     ? 32
                //     : 0;

                const allTasksCompleted =
                  formObj.tasks.length > 0 &&
                  formObj.tasks.every((task) => task.completed);

                return (
                  <Link href={`/project/${formObj.slug}`} key={formObj.id}>
                    <div
                      className={`flex-col-reverse gap-2 justify-center md:flex-row w-full h-full relative flex border-2 border-gray-700 hover:border-[hsl(263,70%,50%)] p-6 ${
                        (formObj.tasks.length === 0 && formObj.completed) ||
                        allTasksCompleted
                          ? "bg-green-900"
                          : ""
                      }`}
                    >
                      <div className="absolute right-6 top-3 flex flex-col items-end">
                        <button
                          className="bg-gray-700 px-4"
                          onClick={(e) => expandDropdown(e, i)}
                        >
                          ...
                        </button>
                        {expandIndex === i && (
                          <div className="bg-[#030711] flex flex-col border-2 border-gray-700 w-[100px] z-20">
                            {formObj.completed && allTasksCompleted ? (
                              <button
                                onClick={(e) => {
                                  undoneProject(formObj.id);
                                  expandDropdown(e, i);
                                }}
                              >
                                Undone
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  doneProject(formObj.id);
                                  expandDropdown(e, i);
                                }}
                              >
                                Done
                              </button>
                            )}

                            <button
                              onClick={(e) => {
                                deleteProject(formObj.id);
                                expandDropdown(e, i);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-4/5 h-full flex flex-col bg-[hsla(215,28%,17%,0.464)]">
                        <div className="flex justify-center items-start gap-4 md:gap-8 px-4 pt-2">
                          <button className="w-full bg-[rgb(23,23,114))] rounded-3xl">
                            {formObj.completed && allTasksCompleted
                              ? "DONE"
                              : "IN PROGRESS"}
                          </button>
                          <button className="w-full bg-[rgba(138,138,205,0.333)] rounded-3xl">
                            {remainingDays}
                          </button>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-6 pl-4 pt-4">
                          <div className="flex gap-4">
                            <h2 className="basis-2/12">Title: </h2>
                            <h2 className="basis-10/12">{formObj.project}</h2>
                          </div>
                          <div className="flex gap-4">
                            <h2 className="basis-2/12">Description: </h2>
                            <h2 className="basis-10/12">
                              {formObj.description}
                            </h2>
                          </div>
                          <div className="flex gap-4">
                            <h2 className="basis-2/12">Due Date: </h2>
                            <h2 className="basis-10/12">{wordedDate}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/5 h-full flex items-center flex-col justify-center">
                        <CircularProgressBar
                          progressPercentage={progressPercentage}
                          className="w-[100px]"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full border-2 border-gray-700 flex flex-col justify-center items-center gap-3">
              <h1 className="text-3xl font-bold">No projects yet</h1>
              <p>You can start tracking as soon as you add one.</p>
              <button
                className="text-white px-6 py-3 rounded-3xl bg-purple-700 hover:cursor-pointer"
                onClick={handleAddProjectClick}
              >
                + Add Project
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
