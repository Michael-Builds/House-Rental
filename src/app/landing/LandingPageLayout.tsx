"use client"
import React from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Main from "./Main"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Main />
        <Link href="/main">Go to Main App</Link>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
