"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ projectsData, isLoggedIn, classes }) {
  const [inProgress, setInProgress] = useState(false);
  const [done, setDone] = useState(false);
  const [overdue, setOverdue] = useState(false);

  const now = new Date();

  const pastDueDateProjects = projectsData.filter((project) => {
    const projectDeadline = new Date(project.date);

    if (now > projectDeadline) {
      return project;
    }
  });

  const projectsCompleted = projectsData.filter((project) => {
    const allTasksDone = project.tasks.every((task) => task.completed);

    if (project.completed && allTasksDone) {
      return project;
    }
  });

  const inProgressProjects = projectsData.filter((project) => {
    if (!project.completed) {
      return project;
    }
  });

  const handleInProgressArrow = () => {
    setInProgress((prev) => !prev);
  };

  const handleDoneArrow = () => {
    setDone((prev) => !prev);
  };

  const handleOverdueArrow = () => {
    setOverdue((prev) => !prev);
  };

  return (
    <div className={classes}>
      <div className="w-full h-[10vh] flex justify-center items-center border-b-2 border-gray-700">
        <Link href="/dashboard">
          <h1 className="text-4xl font-bold">Projectory</h1>
        </Link>
      </div>
      <div className="pt-5 w-full ">
        <div className="flex justify-between px-6 py-3 rounded-t-3xl bg-gray-900 mx-4 border-b-2 border-gray-950 ">
          <h1>In Progress</h1>
          <button onClick={handleInProgressArrow}>
            {inProgress ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {inProgress && (
          <div className="mx-4 bg-gray-900 rounded-b-3xl">
            {inProgressProjects.length > 0 ? (
              inProgressProjects.map((project) => {
                const isPast = pastDueDateProjects.includes(project);
                return (
                  <div key={project.id}>
                    {!project.completed && !isPast && (
                      <div className="w-full p-2 " key={project.id}>
                        <Link href={`/project/${project.slug}`}>
                          <button className="bg-gray-800 w-full p-2 hover:cursor-pointer rounded-2xl hover:bg-gray-800">
                            {project.project}
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="mx-4 bg-gray-900 rounded-b-3xl text-center">
                <div className="w-full p-2">
                  <h1>No in progress projects.</h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pt-5 w-full ">
        <div className="flex justify-between px-6 py-3 rounded-t-3xl bg-gray-900 mx-4 border-b-2 border-gray-950 ">
          <h1>Completed</h1>
          <button onClick={handleDoneArrow}>
            {done ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {done && (
          <div className="mx-4 bg-gray-900 rounded-b-3xl">
            {projectsCompleted.length > 0 ? (
              projectsCompleted.map((project) => {
                return (
                  <div key={project.id}>
                    <div className="w-full p-2" key={project.id}>
                      <Link href={`/project/${project.slug}`}>
                        <button className="bg-gray-800 w-full p-2 hover:cursor-pointer rounded-2xl hover:bg-gray-800">
                          {project.project}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mx-4 bg-gray-900 rounded-b-3xl text-center">
                <div className="w-full p-2">
                  <h1>No finished projects.</h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pt-5 w-full ">
        <div className="flex justify-between px-6 py-3 rounded-t-3xl bg-gray-900 mx-4 border-b-2 border-gray-950 ">
          <h1>Overdue</h1>
          <button onClick={handleOverdueArrow}>
            {overdue ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {overdue && (
          <div className="mx-4 bg-gray-900 rounded-b-3xl">
            {pastDueDateProjects.length > 0 ? (
              pastDueDateProjects.map((project) => {
                return (
                  <div key={project.id}>
                    <div className="w-full p-2" key={project.id}>
                      <Link href={`/project/${project.slug}`}>
                        <button className="bg-gray-800 w-full p-2 hover:cursor-pointer rounded-2xl hover:bg-gray-800">
                          {project.project}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mx-4 bg-gray-900 rounded-b-3xl text-center">
                <div className="w-full p-2">
                  <h1>No overdue projects.</h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
