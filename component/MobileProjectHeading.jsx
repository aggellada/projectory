import React from "react";
import BiggerCircularProgressBar from "./BiggerCircularProgresBar";

function MobileProjectHeading({
  backlogTotal,
  doingTotal,
  reviewTotal,
  completedTotal,
  totalTasks,
  progressPercentage,
  project,
}) {
  const wordedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full lg:hidden md:flex-row flex-col flex">
      <div className="w-full m:w-1/2 h-full justify-center items-center pt-4 md:pt-8 flex gap-8">
        <div className="flex flex-col md:px-12 h-full gap-2 text-center items-center justify-center ">
          <div className="flex gap-12 ">
            <h1 className="text-3xl">{project.project}</h1>
          </div>
          <div>
            <h1 className="text-lg">{wordedDate}</h1>
          </div>
          <div>
            <h1 className="text-sm">{project.description}</h1>
          </div>
        </div>
        <div>
          <BiggerCircularProgressBar progressPercentage={progressPercentage} />
        </div>
      </div>
      <div className="w-full justify-center flex my-2 md:mt-4 px-4">
        <h1 className="text-2xl font-bold">Total tasks: {totalTasks}</h1>
      </div>
      <div className="w-full md:w-1/2 flex justify-between">
        <div className="flex w-full gap-6 justify-center md:flex-wrap">
          <div className="text-center">
            <h1 className="font-semibold text-lg">Backlog </h1>
            <p className="text-4xl ">{backlogTotal}</p>
          </div>
          <div className="text-center">
            <h1 className="font-semibold text-lg">Doing </h1>
            <p className="text-4xl ">{doingTotal}</p>
          </div>
          <div className="text-center">
            <h1 className="font-semibold text-lg">Review </h1>
            <p className="text-4xl ">{reviewTotal}</p>
          </div>
          <div className="text-center">
            <h1 className="font-semibold text-lg">Completed </h1>
            <p className="text-4xl ">{completedTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileProjectHeading;
