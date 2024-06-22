import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import NavBar from "@/component/navbar/Navbar"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "iRENT Services",
  description: "iRENT Rental Services",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
