"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useLoginModal from "../../hooks/useLoginModal"
import useRegisterModal from "../../hooks/useRegisterModal"
import Button from "../Button"
import Heading from "../Heading"
import Input from "../inputs/Input"
import Modal from "./Modal"

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    console.log("Credentials:", data)

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Logged in")
        router.refresh()
        loginModal.onClose()
        reset()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
      console.log("SignIn Callback:", callback)
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
        //   center
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 lg:-mt-1 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  )

  const handleClose = useCallback(() => {
    reset()
    loginModal.onClose()
  }, [loginModal, reset])

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
