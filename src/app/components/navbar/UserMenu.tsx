"use client"
import React, { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import useRegisterModal from "../../hooks/useRegisterModal"
import useLoginModal from "../../hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "../../types"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const handleLogout = () => {
    signOut()
    toggleOpen()
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="max-sm:hidden md:block text-sm font-semibold py-3 px-4 rounded-full hpver:bg-neutral-100 transition cursor-pointer "
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
            {currentUser ? (
              <>
                <MenuItem onClick={toggleOpen} label="My trips" />
                <MenuItem onClick={toggleOpen} label="My favorites" />
                <MenuItem onClick={toggleOpen} label="My reservations" />
                <MenuItem onClick={toggleOpen} label="My properties" />
                <MenuItem onClick={toggleOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
