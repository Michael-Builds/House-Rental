import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import NavBar from "./components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import ClientOnly from "./components/ClientOnly"
import getCurrentUser from "./actions/getCurrentUser"
import RentModal from "./components/modals/RentModal"
import RoleUpdate from "./components/modals/RoleUpdate"
import SearchModal from "./components/modals/SearchModal"

export const metadata: Metadata = {
  title: "iRENT Services",
  description: "iRENT Rental Services",
}

const font = Nunito({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RoleUpdate />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
