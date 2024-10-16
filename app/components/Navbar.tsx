"use client";
import React from "react";
import { InstagramOutlined } from "@ant-design/icons";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="shadow-inner backdrop-filter backdrop-blur-md bg-opacity-50 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-4 bg-card mt-4">
      {/* Logo on the left */}
      <Link href="/" className="font-bold text-2xl text-lg flex items-center">
        Pic<span className="bg-[#9CA986] text-white px-1 rounded">me</span>
      </Link>

      {/* Sign In button on the right */}
      <div className="flex items-center">
      <Link href="https://www.instagram.com/ankitpanwar07/" target="_blank" className="font-bold text-2xl text-lg flex items-center text-black hover:text-black">
        <InstagramOutlined style={{ fontSize: '28px', color: '#9ca986', marginRight: '10px' }} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
