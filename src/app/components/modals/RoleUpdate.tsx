"use client"

import React, { useMemo, useState, useEffect } from "react"
import useRoleUpdateModal from "../../hooks/useRoleUpdateModal"
import Modal from "./Modal"
import Heading from "../Heading"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import useLoginModal from "../../hooks/useLoginModal"
import { signOut } from "next-auth/react"

enum STEPS {
  USER_SELECTION = 0,
  ROLE_ASSIGNMENT = 1,
}

interface User {
  id: string
  email: string
  name: string
  role: string
}

const RoleUpdate = () => {
  const router = useRouter()
  const roleUpdateModal = useRoleUpdateModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.USER_SELECTION)
  const [users, setUsers] = useState<User[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      role: "",
    },
  })

  const email = watch("email")
  const name = watch("name")
  const role = watch("role")

  useEffect(() => {
    if (roleUpdateModal.isOpen) {
      axios
        .get("/api/users")
        .then((response) => setUsers(response.data))
        .catch((error) => {
          console.error("Error fetching users:", error)
          toast.error("Failed to fetch users")
        })
    }
  }, [roleUpdateModal.isOpen])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.ROLE_ASSIGNMENT) {
      return onNext()
    }
    setIsLoading(true)

    axios
      .post("/api/users", data)
      .then(() => {
        toast.success("Role updated successfully")
        localStorage.removeItem("authToken")
        signOut({ redirect: false }).then(() => {
          reset()
          setStep(STEPS.USER_SELECTION)
          roleUpdateModal.onClose()
          router.refresh()
          loginModal.onOpen()
        })
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.ROLE_ASSIGNMENT) {
      return "Update"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.USER_SELECTION) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Select a user"
        subtitle="Choose a user to update their role"
      />
      <select
        value={email}
        onChange={(e) => {
          setCustomValue("email", e.target.value)
          const selectedUser = users.find(
            (user) => user.email === e.target.value
          )
          if (selectedUser) {
            setCustomValue("name", selectedUser.name)
            setCustomValue("role", selectedUser.role)
          }
        }}
        className="w-full p-2 pt-4 pb-4 border border-neutral-400 focus:border focus:border-neutral-600 rounded focus:ring-0 focus:outline-none"
      >
        <option value="" disabled className="font-light text-neutral-500 ">
          Select a user
        </option>
        {users.map((user) => (
          <option
            key={user.id}
            value={user.email}
            className="font-light text-neutral-500"
          >
            {user.email}
          </option>
        ))}
      </select>
      <Input
        id="name"
        label="Name"
        disabled={true}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  if (step === STEPS.ROLE_ASSIGNMENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Assign a role"
          subtitle="Choose a role for the selected user"
        />
        <select
          value={role}
          onChange={(e) => setCustomValue("role", e.target.value)}
          className="w-full p-2 pt-4 pb-4 border border-neutral-400 focus:border focus:border-neutral-600 rounded focus:ring-0 focus:outline-none"
        >
          <option value="" className="font-light text-neutral-500" disabled>
            Select a role
          </option>
          <option value="USER" className="font-light text-neutral-500">
            User
          </option>
          <option value="LANDLORD" className="font-light text-neutral-500">
            Landlord
          </option>
          <option value="ADMIN" className="font-light text-neutral-500">
            Admin
          </option>
        </select>
      </div>
    )
  }

  return (
    <Modal
      isOpen={roleUpdateModal.isOpen}
      onClose={roleUpdateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.USER_SELECTION ? undefined : onBack}
      title="Update User Role"
      disabled={isLoading}
      body={bodyContent}
    />
  )
}

export default RoleUpdate
