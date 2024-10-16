"use client";
import Image from "next/image";
import React from "react";
import moon from "@/public/moon.png"
import peace from "@/public/girl.png"
import pov from "@/public/pov.png"



const Overlayit = () => {
  return (
    <div className="max-w-6xl mx-auto">
       <h1 className="text-4xl font-semibold text-center mb-8 mt-8 family-helvetica" style={{ textDecoration: 'underline', textDecorationColor: '#9CA986' }}>OverlayIt Images gallery</h1>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6" style={{alignItems: "center"}}>
    <Image alt="peace" src={peace} layout="responsive" className="object-cover" />
    <Image alt="moon" src={moon} layout="responsive" className="object-cover" />
    <Image alt="cat" src={pov} layout="responsive" className="object-cover" />
   </div>
    </div>
  );
}

export default Overlayit
