import React from "react"
import Container from "../Container"
import { TbBeach, TbMountain } from "react-icons/tb"
import { GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
  {
    id: 1,
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    id: 2,
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    id: 3,
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    id: 4,
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item, index) => {
          return (
            <CategoryBox
              key={index}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Categories
