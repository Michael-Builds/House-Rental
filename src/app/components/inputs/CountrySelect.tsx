"use client"
import React from "react"
import Select from "react-select"
import useCountries from "../../hooks/useCountries"
import Image from "next/image"

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 ">
            <Image
              src={option.flag}
              alt={`Flag of ${option.label}`}
              width={1}
              height={1}
              className="h-4 w-6"
            />
            <div>
              {option.label},
              {/* text-neutral-800 */}
              <span className=" ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "border-0",
          input: () => "text-lg",
          option: () => "text-lg",
        
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "gray",
            // primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  )
}

export default CountrySelect
