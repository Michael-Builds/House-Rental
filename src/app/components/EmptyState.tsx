"use client"

import { useRouter } from "next/navigation"
import React from "react"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact match",
  subtitle = "Select a category above",
  showReset,
}) => {
  const router = useRouter()

  return (
    <div className="lg:h-[70vh] xl:h-[80vh] 2xl:h-[90vh] h-[85vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-8">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
