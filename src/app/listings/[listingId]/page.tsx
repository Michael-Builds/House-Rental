import React from "react"
import getListingById from "../../actions/getListingById"
import ClientOnly from "../../components/ClientOnly"
import EmptyState from "../../components/EmptyState"
import getCurrentUser from "../../actions/getCurrentUser"
import ListingClient from "./ListingClient"
import getReservations from "../../actions/getReservations"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        currentUser={currentUser}
        reservations={reservations}
        listing={listing}
      />
    </ClientOnly>
  )
}

export default ListingPage
