"use client";
import Link from "next/link";
import React from "react";
import logoB from "../public/ghosti.png";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import classNames from "classnames";
import { useAuth } from "@clerk/nextjs";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-10 w-10 mr-3">
          <Image fill alt="logo" src={logoB} className="" />
        </div>
        <h1
          className={classNames(
            "text-2xl font-bold text-white",
            font.className
          )}
        >
          Book AI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <button
            variant="outline"
            className="bg-gradient-to-r from-[#03001e] via-[#7303c0] via-30% to-[#ec38bc] hover:from-[#667db6] hover:via-[#0082c8] hover:to-[#667db6] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
