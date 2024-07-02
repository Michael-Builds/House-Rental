"use client"
import React from "react"
import { SafeListings, SafeUser } from "../types"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"

interface FavoritesClientProps {
  favorites: SafeListings[]
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of Favorites" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            currentUser={currentUser}
            data={favorite}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
