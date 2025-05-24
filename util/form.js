"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function newProject(formData) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const date = formData.get("date");
  const formattedDate = new Date(date); // Converts to ISO-8601 format

  await prisma.project.create({
    data: {
      project: formData.get("project"),
      description: formData.get("description"),
      slug: formData.get("project").replace(/\s+/g, "-").toLowerCase(),
      completed: false,
      date: formattedDate,
      userId: user.id,
    },
  });

  revalidatePath("/");
}

export async function addTask(formData, projectSlug) {
  const project = await prisma.project.findUnique({
    where: {
      slug: projectSlug,
    },
  });

  await prisma.task.create({
    data: {
      title: formData.get("title"),
      projectId: project.id,
    },
  });

  revalidatePath(`/project/${projectSlug}`);
}

export async function checkAllTasksComplete(projectId) {
  const tasks = await prisma.task.findMany({
    where: { projectId },
    select: { completed: true },
  });

  const allTasksComplete = tasks.every((task) => task.completed);

  await prisma.project.update({
    where: { id: projectId },
    data: { completed: allTasksComplete },
  });
}

export async function updateTask(taskId, field, slug) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      [field]: !task[field],
      role: field === "completed" ? false : !task.role,
    },
  });

  revalidatePath(`/project/${slug}`);

  await checkAllTasksComplete(task.projectId);
}

export async function doneTaskKanban(taskId, field, kbLower, slug) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      backlog: true,
      review: true,
      doing: true,
      completed: true,
      role: true,
    },
  });

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      [field]: !task[field],
      [kbLower]: false,
      role: false,
    },
  });

  revalidatePath(`/project/${slug}`);
}

export async function deleteTask(taskId, slug) {
  const deleteTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath(`/project/${slug}`);
}

export async function changeTask(taskId, newValue, slug) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: newValue,
    },
  });

  revalidatePath(`/project/${slug}`);
}

export async function doneProject(projectId) {
  // await prisma.project.findUnique({
  //   where: { id: projectId },
  //   select: { completed: true },
  // });

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      completed: true,
    },
  });

  await prisma.task.updateMany({
    where: {
      projectId: projectId,
    },
    data: {
      completed: true,
      backlog: false,
      doing: false,
      review: false,
      role: false,
    },
  });

  revalidatePath("/dashboard");
}

export async function undoneProject(projectId) {
  await prisma.project.findUnique({
    where: { id: projectId },
    select: { completed: true },
  });

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      completed: false,
    },
  });

  await prisma.task.updateMany({
    where: {
      projectId: projectId,
    },
    data: {
      completed: false,
      role: false,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteProject(projectId) {
  await prisma.task.deleteMany({
    where: {
      projectId: projectId,
    },
  });

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/dashboard");
}

export async function getProgress(taskId) {
  await prisma.task.findMany({
    where: {
      id: taskId,
    },
  });
}
