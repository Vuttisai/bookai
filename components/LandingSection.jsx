"use client";
import React from "react";
import section from "../public/landing1.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const LandingSection = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex-grow">
      <div className="h-screen flex flex-col md:flex-row p-4 md:p-7 justify-between ">
        <motion.div
          initial={{ opacity: 0, x: 5 }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="p-7 md:p-9 justify-center space-y-3"
        >
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
            Create Your Story
          </h1>
          <p className="text-sm md:text-lg text-[#9094A6] ">
            Generate a unique book tailored to your preferences. Choose the
            genre, specify the number of pages and chapters, and provide a
            captivating prompt. Watch as Book AI brings your ideas to life with
            engaging narratives.
          </p>
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#de6161] to-[#2657eb]">
            Tailored for You
          </h1>
          <p className="text-sm md:text-lg text-[#9094A6] ">
            Craft stories that captivate and entertain. Our advanced AI model
            ensures precise generation, adhering to your specified parameters.
            From fantasy realms to thrilling adventures, the possibilities are
            endless.
          </p>
          <h1 className="font-bold">How It Works</h1>
          <div className="flex flex-col md:flex-row justify-around space-y-3 md:space-x-3 md:space-y-0  font-light">
            <div className="workContainer">
              Specify Details: Choose the genre, set the number of pages,
              chapters, and provide a user prompt.
            </div>
            <div className="workContainer">
              Generate: Let Book AI work its magic. Our AI engine will create a
              custom-tailored story based on your inputs.
            </div>
            <div className="workContainer">
              Explore Your Creation: Dive into the generated book, complete with
              titles, chapters, and captivating content.
            </div>
          </div>
          <div className="flex justify-center items-center p-10">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <button
                variant="outline"
                className="bg-gradient-to-r from-[#03001e] via-[#7303c0] via-30% to-[#ec38bc] hover:from-[#667db6] hover:via-[#0082c8] hover:to-[#667db6] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 5 }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className=" hidden md:flex justify-center relative overflow-hidden "
        >
          <Image
            src={section}
            alt="sectionimage"
            // width={740}
            // height={740}
            className=" md:w-[1300px] w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-2% " />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingSection;
