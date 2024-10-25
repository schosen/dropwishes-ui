// import { WishlistIds } from '@/interfaces/interface';
import { viewWishlists } from '@/services/wishlistService';
import { Wishlist } from '@/interfaces/interface';
import ReserveProduct from '@/components/UserWishlist/reserveProduct';


export default async function WishlistViewPage({ params }: {params:{ uuid: string, wishlistIds: string }}) {
  let wishlists;
  console.log("params: ", params.uuid, params.wishlistIds)
  try {
    wishlists = await viewWishlists(params.uuid, params.wishlistIds);

  } catch (error) {
    console.error(error.message);

    return <p>Failed to load wishlists. Please try again later.</p>;
  }

  return (
    <div>
      <ul>
          {wishlists.map((wishlist: Wishlist) => (
            <li key={wishlist.id}>
              <h3 className='text-black dark:text-white font-bold'>{wishlist.title}</h3>
              <p className='text-black dark:text-white font-bold'>Date: {wishlist.occasion_date || 'No date available'}</p>


              <ul>
                {wishlist.products.map((product) => (
                  <li key={product.id}>
                    <h4 className='text-black dark:text-white text-sm'>{product.name}</h4>
                    <p className='text-black dark:text-white text-sm'>Priority: {product.priority || 'No priority'}</p>
                    <p className='text-black dark:text-white text-sm'>Price: ${product.price}</p>
                    <p className='text-black dark:text-white text-sm'>Notes: {product.notes || 'No notes'}</p>
                    {product.link ? (
                      <p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className='text-black dark:text-white text-sm'>
                          {product.link}
                        </a>
                      </p>
                    ) : (
                      <p className='text-black dark:text-white text-sm'>No link available</p>
                    )}
                    <ReserveProduct productId={product.id} isReserved={product.is_reserved}/>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
    </div>
  );


}
