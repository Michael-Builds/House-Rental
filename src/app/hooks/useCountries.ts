import countries from "world-countries";

const farmattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`,
    latlng: country.latlng,
    region: country.region
}))


const useCountries = () => {
    const getAll = () => farmattedCountries;

    const getByValue = (value: string) => {
        return farmattedCountries.find((item) => item.value === value
        )}
    return {
        getAll,
        getByValue
    }
}

export default useCountries