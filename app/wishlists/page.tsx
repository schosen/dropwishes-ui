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
    <div className="relative py-24 lg:py-32">
      <BackgroundSection />
      <div className="flex flex-col lg:flex-row">

        {/* <div className="w-full lg:w-[25%]">

        </div> */}


         {/* <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-10 2xl:mx-10 "></div> */}

         {/* <div className="flex-auto">
          <Heading
            className="lg:mb-14 text-neutral-900 dark:text-neutral-50"
            fontClass="text-xl md:text-2xl 2xl:text-3xl font-semibold md:px-16 sm:px-16 px-16"
            // isCenter
            desc=""
          >
            My Wishlists.
          </Heading>

          <div className={`nc-SectionGridMoreExplore relative lg:pr-[10%] md:px-16 sm:px-16 px-16`}> */}
            <UserWishlists wishlistData={wishlists} />
          {/* </div>
        </div> */}

      </div>

    </div>
    </main>
    </>
  );
}
