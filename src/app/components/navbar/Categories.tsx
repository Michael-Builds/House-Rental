
"use client"
import React from "react"
import Container from "../Container"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"

export const categories = [
  {
    id: 1,
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    id: 2,
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    id: 3,
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    id: 4,
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    id: 5,
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    id: 6,
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    id: 7,
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    id: 8,
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    id: 8,
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    id: 9,
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    id: 10,
    label: "Arctic",
    icon: BsSnow,
    description: "This property is on an arctic land!",
  },
  {
    id: 11,
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    id: 12,
    label: "Desert",
    icon: GiCactus,
    description: "This property is on a desert!",
  },
  {
    id: 13,
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    id: 14,
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurius!",
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
