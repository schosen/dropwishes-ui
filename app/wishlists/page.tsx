import useAuthRedirect from '../../hooks/useAuthRedirect';
import { getWishlists } from '@/services/wishlistService';
import { redirect } from 'next/navigation';
import UserWishlists from "@/components/UserWishlist";
import BackgroundSection from '@/components/shared/BackgroundSection';
import Heading from '@/components/Heading/Heading';

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
    <main className="container py-16 lg:pb-28 lg:pt-20 ">
    <div className="relative py-24 lg:py-16">
      <BackgroundSection />
      <Heading
        className="mb-12 lg:mb-20 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold md:px-16 sm:px-16 px-16"
        isCenter
        desc=""
      >
        My Wishlists.
      </Heading>

      <div className="flex flex-col lg:flex-row">
        <UserWishlists wishlistData={wishlists} />
      </div>

    </div>
    </main>
    </>
  );
}
