"use client"
import React from "react"
import { Button as AntButton } from "antd"
import Link from "next/link"

const HeroSection: React.FC = () => {

  return (
    <section className="container w-full m-auto">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div
          className="text-center space-y-8"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="max-w-screen-lg mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1 className="lg:leading-[75px] leading-[45px] md:leading-[70px]">
            Effortlessly <span className="bg-[#9CA986] text-white px-2 rounded">Remove Background</span>  or <span className="bg-[#9CA986] text-white px-2 rounded">Add Text Behind</span> Any Image With Pic<span className="bg-[#9CA986] text-white px-1 rounded">me</span>
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Upload your image and get rid of the background or add text to it in just a few clicks!`}
          </p>
          <div>
            
          </div>
          <div className="space-y-4 md:space-y-0 md:space-x-4 ">
            <Link href="/text-behind-image" className="w-5/6 md:w-1/4 text-xl font-medium rounded-3xl mb-3">
              <AntButton type="primary" className="w-5/6 md:w-1/4 text-xl font-medium rounded-3xl mb-3">
               Upload image
              </AntButton>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
