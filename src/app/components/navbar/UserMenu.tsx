"use client"
import React, { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import useRegisterModal from "../../hooks/useRegisterModal"
import useLoginModal from "../../hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "../../types"
import useRentModal from "../../hooks/useRentModal"
import { useRouter } from "next/navigation"
import useRoleUpdateModal from "../../hooks/useRoleUpdateModal"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const roleUpdateModal = useRoleUpdateModal()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
    toggleOpen()
  }

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    if (currentUser.role !== "ADMIN" && currentUser.role !== "LANDLORD") {
      return
    }

    rentModal.onOpen()
  }, [loginModal, currentUser, rentModal])

  const renderMenuItems = () => {
    if (!currentUser) {
      return (
        <>
          <MenuItem
            onClick={() => {
              loginModal.onOpen()
              toggleOpen()
            }}
            label="Login"
          />
          <MenuItem
            onClick={() => {
              registerModal.onOpen()
              toggleOpen()
            }}
            label="Sign up"
          />
        </>
      )
    }
    switch (currentUser.role) {
      case "LANDLORD":
        return (
          <>
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/reservations")
              }}
              label="My reservations"
            />
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/properties")
              }}
              label="My properties"
            />
            <MenuItem
              onClick={() => {
                rentModal.onOpen()
                toggleOpen()
              }}
              label="Airbnb my home"
            />
            <hr />
            <MenuItem onClick={handleLogout} label="Logout" />
          </>
        )
      case "USER":
        return (
          <>
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/trips")
              }}
              label="My trips"
            />
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/favorites")
              }}
              label="My favorites"
            />
            <hr />
            <MenuItem onClick={handleLogout} label="Logout" />
          </>
        )
      case "ADMIN":
        return (
          <>
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/trips")
              }}
              label="My trips"
            />
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/favorites")
              }}
              label="My favorites"
            />
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/reservations")
              }}
              label="My reservations"
            />
            <MenuItem
              onClick={() => {
                toggleOpen()
                router.push("/properties")
              }}
              label="My properties"
            />
            <MenuItem
              onClick={() => {
                rentModal.onOpen()
                toggleOpen()
              }}
              label="Airbnb my home"
            />
            <MenuItem
              onClick={() => {
                roleUpdateModal.onOpen()
                toggleOpen()
              }}
              label="Add Landlord"
            />
            <hr />
            <MenuItem onClick={handleLogout} label="Logout" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="max-sm:hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="max-sm:hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-md shadown-md w-[40vw] md:w-3/4 bg-white border-[1px] overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer ">
            {renderMenuItems()}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
