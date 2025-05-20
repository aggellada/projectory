import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { isAuthenticated } = getKindeServerSession();
  // const user = await isAuthenticated();

  // if (!user) {
  //   redirect("/home");
  // }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Subtle background SVG blob */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-blue-600 opacity-20 rounded-full blur-[200px] z-0" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-green-500 opacity-20 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-blue-500">Projectory</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-4 text-gray-300">
          Projectory is a modern project management platform built with Next.js,
          Prisma, and Tailwind CSS — designed to help you stay organized,
          streamline your workflow, and deliver results faster.
        </p>

        <div className="flex justify-center my-10">
          <img
            src="/project-management.png"
            alt="Project management dashboard"
            className="w-full max-w-xl rounded-xl shadow-xl"
          />
        </div>

        <p className="text-gray-400 mb-2">
          Manage projects, track tasks, and collaborate with ease.
        </p>
        <p className="text-gray-400 mb-8">
          Log in or create an account to access your dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/api/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            href="/api/auth/register"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
