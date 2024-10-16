"use client";
import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="shadow-inner backdrop-filter backdrop-blur-md bg-opacity-50 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card mt-4">
      {/* Logo on the left */}
      <Link href="/" className="font-bold text-2xl text-lg flex items-center">
        <BulbOutlined className="bg-gradient-to-tr border-secondary from-primary via-primary to-primary rounded-lg w-9 p-2 h-9 mr-2 border text-white" />
        Pic<span className="bg-[#9CA986] text-white px-1 rounded">me</span>
      </Link>

      {/* Sign In button on the right */}
      <div>
        <Button className="bg-[#9CA986]" onClick={() => console.log("Sign In Clicked")}>
          upload image
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
