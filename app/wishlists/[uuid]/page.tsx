// import axiosInstance from "@/utils/axios"
import { getWishlist } from "@/services/wishlistService";
import UserProduct from "@/components/UserWishlist/userProducts";
import Link from "next/link";
import GiftExplorer from "@/components/AffiliateProducts/GiftExplorer";


export default async function WishlistPage({ params }: { params: { uuid: string } }) {
	// const { uuid } = params

  let wishlist;
  // console.log("params: ", params.uuid, params.wishlistIds)
  try {
    wishlist = await getWishlist(params.uuid)

  } catch (error) {
    console.error(error.message);

    return <p>Failed to load wishlist. Please try again later.</p>;
  }



	console.log("ID: ", params.uuid)


  return(
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">

        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            {wishlist.title}
          </h2>

          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Wishlists
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">{wishlist.title}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[36%]">

              < UserProduct
                WishlistProducts={wishlist.products}
                uuid={params.uuid}
              />
          </div>

          {/*  <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div> */}
          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-10 2xl:mx-10 "></div>

          {/* <div className="flex-1"> */}
          <div className="flex-auto">
            <h3 className="text-lg font-semibold">Use Gift Explorer</h3>

            {/* AFFILIATE MARKETING PRODUCTS */}
            < GiftExplorer />

          </div>
        </div>
      </main>
    </div>
  )

}
