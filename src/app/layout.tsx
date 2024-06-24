import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import NavBar from "./components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import ClientOnly from "./components/ClientOnly"

export const metadata: Metadata = {
  title: "iRENT Services",
  description: "iRENT Rental Services",
}

const font = Nunito({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
