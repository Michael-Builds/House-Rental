"use client"
import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import image from "../../../public/logo.png"

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src={image}
    />
  )
}

export default Logo
