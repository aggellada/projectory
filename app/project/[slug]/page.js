import AddTask from "@/component/AddTask";
import BiggerCircularProgressBar from "@/component/BiggerCircularProgresBar";
import KanbanTask from "@/component/KanbanTask";
import MobileProjectHeading from "@/component/MobileProjectHeading";
import Tasks from "@/component/Tasks";
import { prisma } from "@/lib/prisma";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug: slug,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      projectId: project.id,
    },
  });

  const reversedTasks = [...tasks].reverse();

  const completedCount = tasks.filter((taskArr) => taskArr.completed).length;
  const totalCount = tasks.length;
  const progressPercentage =
    project.completed && totalCount === 0
      ? 100
      : (completedCount / totalCount) * 100 || 0;

  const kanbanBoard = ["Backlog", "Doing", "Review", "Completed"];

  const backlogTotal = tasks.filter((task) => task.backlog).length;
  const doingTotal = tasks.filter((task) => task.doing).length;
  const reviewTotal = tasks.filter((task) => task.review).length;
  const completedTotal = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const wordedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!project) return <div>Project not found</div>;

  return (
    <div className="w-full min-h-[90vh] flex">
      <div className="h-full md:px-12 py-6 w-full">
        <Link href="/">
          <button className="ml-4 px-4 md:px-12 py-2 rounded-4xl bg-transparent border-2 border-gray-600 hover:cursor-pointer flex items-center">
            <ArrowBigLeft size={40} strokeWidth={0.5} /> Go back
          </button>
        </Link>
        <div className="hidden md:flex justify-around mt-8 w-full h-[30vh] gap-4">
          <div className="h-full w-full flex justify-center items-center flex-col gap-4 border-2 border-gray-700">
            <div className="flex gap-12">
              <h1 className="text-3xl">{project.project}</h1>
            </div>
            <div>
              <h1 className="text-lg">{wordedDate}</h1>
            </div>
            <div>
              <h1 className="text-sm">{project.description}</h1>
            </div>
          </div>
          <div className="h-full w-full border-2 border-gray-700">
            <div className="w-full h-1/2 justify-center items-center flex">
              <h1 className="text-2xl font-bold">Total tasks: {totalTasks}</h1>
            </div>
            <div className="flex w-full h-1/2 gap-8 justify-center">
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
          <div className="h-full flex justify-center items-center w-full border-2 border-gray-700">
            <BiggerCircularProgressBar
              progressPercentage={progressPercentage}
            />
          </div>
        </div>
        <MobileProjectHeading
          backlogTotal={backlogTotal}
          doingTotal={doingTotal}
          reviewTotal={reviewTotal}
          completedTotal={completedTotal}
          totalTasks={totalTasks}
          progressPercentage={progressPercentage}
          project={project}
        />
        <div className="flex flex-col md:flex-row min-h-[300px] gap-4 mt-12 px-4">
          {kanbanBoard.map((kanban) => {
            const kbLower = kanban.toLowerCase();
            return (
              <div
                className="bg-gray-800 rounded-3xl flex flex-col w-full grow"
                key={kanban}
              >
                <div className="w-full h-8 bg-gray-900 rounded-t-3xl flex justify-center items-center">
                  <h1>{kanban}</h1>
                </div>
                <div className="w-full min-h-[100px] h-fit px-4 py-2 flex flex-col gap-2">
                  {kanban === "Completed" &&
                    project.completed &&
                    tasks.map((task) => {
                      if (task.completed) {
                        return (
                          <KanbanTask
                            task={task}
                            kbLower={kbLower}
                            key={task.id}
                          />
                        );
                      }
                    })}
                  {tasks.map((task) => {
                    if (task[kbLower] && !project.completed) {
                      return (
                        <KanbanTask
                          task={task}
                          kbLower={kbLower}
                          key={task.id}
                          slug={slug}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-fit grow flex flex-col gap-4 pt-6 p-4">
          <h1 className="text-4xl font-bold">Tasks</h1>
          <div className="w-full flex justify-center gap-4 items-center mt-2 px-4">
            <AddTask slug={slug} />
          </div>
          {tasks.length === 0 && <h1>No tasks has been added yet.</h1>}
          {reversedTasks.map((task) => {
            if (project.completed && !task.completed) {
              return <Tasks task={task} slug={slug} key={task.id} />;
            } else if (!project.completed) {
              return <Tasks task={task} slug={slug} key={task.id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
