import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId)

    }, [currentUser, listingId])


    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request
            let successMessage;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
                successMessage = "Item removed from favorites";
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
                successMessage = "Item added to favorites";
            }
            await request()
            router.refresh()
            toast.success(successMessage);
        } catch (error) {
            toast.error("Oops, something went wrong")
        }
    }, [currentUser, hasFavorited, loginModal, listingId, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite