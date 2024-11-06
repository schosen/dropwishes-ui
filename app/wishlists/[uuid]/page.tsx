// import axiosInstance from "@/utils/axios"
import { getWishlist } from "@/services/wishlistService";
import UserProduct from "@/components/UserWishlist/userProducts";


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
    <>
    <div className='mt-48'>
      <h1>{wishlist.title}</h1>
      <p>{wishlist.description}</p>
      <h2>Products</h2>
      {/* <ul>
        {wishlist.products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.link}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul> */}

      < UserProduct
        WishlistProducts={wishlist.products}
        setProducts={null}
        uuid={params.uuid}
      />
    </div>
    </>
  )

}
