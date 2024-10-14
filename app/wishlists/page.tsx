import useAuthRedirect from '../../hooks/useAuthRedirect';
import { getWishlists } from '@/services/wishlistService';
import { redirect } from 'next/navigation';


export default async function WishlistPage() {
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
    <div className='mt-48'>
      <h1 className='font-bold text-black dark:text-white'>Your Wishlists</h1>
      <ul>
        {wishlists.map((wishlist) => (
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
                        Product Link
                      </a>
                    </p>
                  ) : (
                    <p className='text-black dark:text-white text-sm'>No link available</p>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
