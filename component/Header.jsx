"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import DateTime from "./DateTime";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header({ projectsData, isLoggedIn, user }) {
  const [expand, setExpand] = useState(false);

  const clickExpander = () => {
    setExpand((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-[10vh] px-4 md:px-0 sticky top-0 flex items-center border-b-2 border-gray-600 bg-[#030711] z-50">
        <Menu className="md:hidden" onClick={clickExpander} />
        <div className="hidden md:flex w-full h-full justify-between items-center px-12">
          {user && (
            <div className="flex gap-4 items-center">
              <img
                src={user.picture}
                className="rounded-full w-[50px] h-[50px] "
                alt="user profile picture"
              />
              <h1>Hi, {user.given_name}!</h1>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <DateTime />
            {isLoggedIn && (
              <LogoutLink className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Logout
              </LogoutLink>
            )}
          </div>
        </div>
      </div>
      {expand && (
        <Sidebar
          classes="w-full md:hidden h-screen z-50"
          projectsData={projectsData}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
}
