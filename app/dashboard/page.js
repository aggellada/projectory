import ProjectManagement from "@/component/ProjectManagement";
import Sidebar from "@/component/Sidebar";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  if (!isLoggedIn) return redirect("api/auth/login");

  if (!user?.id) {
    throw new Error("User not found");
  }

  const projectsData = await prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    include: { tasks: true },
  });

  const tasksData = await prisma.task.findMany();

  return (
    <>
      <Sidebar
        projectsData={projectsData}
        isLoggedIn={isLoggedIn}
        classes="hidden md:flex w-1/5 min-h-screen  border-r-2 border-gray-700 flex-col grow items-center"
      />
      <div className="w-full flex flex-col min-h-screen">
        <Header
          projectsData={projectsData}
          isLoggedIn={isLoggedIn}
          user={user}
        />
        <ProjectManagement projectsData={projectsData} tasksData={tasksData} />
        <Footer />
      </div>
    </>
  );
}
