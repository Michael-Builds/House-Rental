'use client'
import Image from 'next/image'
import { useRouter } from "next/navigation"

export default function Test() {
  const router = useRouter();

  return (
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
    
  )
}