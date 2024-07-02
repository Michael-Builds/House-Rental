import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListing from "../actions/getFavorites"
import FavoritesClient from "./FavoritesClient"

const FavoritePage = async () => {
  const currentUser = await getCurrentUser()
  const favorites = await getFavoriteListing()

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites listings"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritePage
