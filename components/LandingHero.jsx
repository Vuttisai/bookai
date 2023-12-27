"use client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import logo from "../public/landing.png";
import { motion } from "framer-motion";

import Link from "next/link";
import scroll from "../public/arrow.png";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-black font-bold py-3 text-center space-y-5 ">
      <motion.div
        animate={{
          y: [0, -10, 0],
          transition: { duration: 0.7, repeat: Infinity },
        }}
        className="flex justify-center"
      >
        <Image alt="logo" src={logo} className="w-[150px]" />
      </motion.div>
      <div className="text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
        <h1>
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03001e] via-[#7303c0] via-30% to-[#ec38bc]">
            Book AI
          </span>
        </h1>
      </div>
      <p className="text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600">
        Embark on a literary adventure with Book AI, your innovative book
        generation platform powered by artificial intelligence.
      </p>
      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <button
          variant="premium"
          className="md:text-sm p-3 mt-5 md:p-6 rounded-full font-semibold bg-gradient-to-r  from-purple-400 to-pink-600"
        >
          Start Generating For Free
        </button>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
        }}
        className=" flex justify-center  items-center"
        style={{ marginTop: "50px" }}
      >
        <Image alt="scroll" src={scroll} className="w-[30px]" />
      </motion.div>
    </div>
  );
};

export default LandingHero;
