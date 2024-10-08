import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import PropertiesClient from "./PropertiesClient"
import getListings from "../actions/getListings"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const properties = await getListings({
    userId: currentUser.id,
  })

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you have no properties available"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient properties={properties} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
