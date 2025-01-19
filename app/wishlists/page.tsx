import useAuthRedirect from '../../hooks/useAuthRedirect';
import { getWishlists } from '@/services/wishlistService';
import { redirect } from 'next/navigation';
import UserWishlists from "../../components/UserWishlist";

export default async function WishlistsPage() {
  // useAuthRedirect('/auth/login', false);
  let wishlists;

  try {
    // Use the reusable API function to fetch wishlists
    wishlists = await getWishlists();
  } catch (error) {
    console.error(error.message);

    // Redirect to login if token is missing or an error occurs
    if (error.message === 'No authentication token found') {
      redirect('/auth/login'); // Handle redirect here
    }
    return <p>Failed to load wishlists. Please try again later.</p>;
  }

  if (!wishlists) {
    return (
      <div>
        <p>Failed to load your wishlists. Please try again later.</p>
      </div>
    );
  }

  if (wishlists.length === 0) {
    return <div>No wishlists found.</div>;
  }


  return (
    <>
      <UserWishlists wishlistData={wishlists} />
    </>
  );
}
