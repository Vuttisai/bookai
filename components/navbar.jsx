"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
const Navbar = () => {
  const notificationBarAnimation = {
    initial: { opacity: 0, scaleX: 0 },
    animate: { opacity: 1, scaleX: 1 },
    transition: { duration: 1000.5, ease: "easeInOut" },
  };
  const user = useUser();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={notificationBarAnimation}
      className="sticky top-0 w-full rounded-full backdrop-blur-md bg-white/30 ..."
    >
      <div className="flex justify-between items-center p-2 z-2">
        <div className="flex w-full justify-between">
          {/* <Image src={logo} alt="logo" className="top-0 w-[55px] h-[55px]" /> */}
          <Link href="/">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#0f0c29]  via-[#302b63] via-30% to-[#24243e] to-90% ...">
              Book-AI
            </h1>
          </Link>
          <UserButton afterSignOutUrl="/" className="top-0 w-[55px] h-[55px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
