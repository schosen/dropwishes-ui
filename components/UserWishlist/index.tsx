"use client"
import { Wishlist } from "@/interfaces/interface";
import CopyLink from "./copyLink";
import { useState } from 'react';
import axiosInstance from '../../utils/axios';


function UserWishlists({ wishlistData }: {wishlistData: Wishlist[]}){
  const [selectView, setSelectView] = useState<boolean>(false)
  const [selectedWishlistIds, setSelectedWishlistIds] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);

  async function shareWishlists(wishlistId: string[]): Promise<string> {
    try {
    const response = await axiosInstance.post(`/api/wishlist/wishlists/generate-shared-link/`, wishlistId);
      return response.data.shareLink;
    } catch (error) {
      console.error('Error generating shared link:', error);
      throw error;
    }
  };


  const handleGenerateLink = async () => {
    if (selectedWishlistIds.length > 0) {
      try {
        const result = await shareWishlists(selectedWishlistIds);
        setShareLink(result);
        setSelectView(false);
      } catch (error) {
        console.error('Error generating share link:', error);
      }
    };

  };

  const removeBlock = () => setShareLink(null);

  const handleClick = () => {
		setSelectView(!selectView);

	};

  return(
      <div className='mt-48'>

      {shareLink && (

        <div>
          <h3 className='font-bold text-black dark:text-white'>Your Shareable Link:</h3>
          <p>{shareLink}</p>
          <button onClick={removeBlock} className='font-bold text-black dark:text-white'>  Remove Link </button>
          <CopyLink link={shareLink} />

        </div>

      )}

      <h1 className='font-bold text-black dark:text-white'>Your Wishlists</h1>


      {!selectView && (<button onClick={handleClick} className='text-black dark:text-white font-bold'>Share Wishlist</button>)}

      {selectView && (<button onClick={handleClick} className='text-black dark:text-white font-bold'> Cancel </button>)}


      <form onSubmit={(e) => {
        e.preventDefault();
        handleGenerateLink();
      }}>
        {selectView && (<button type="submit">Generate Share Link</button>)}
        {wishlistData.map((wishlist: any) => (
          <div key={wishlist.id}>
            {selectView && (
            <input
              type="checkbox"
              value={wishlist.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedWishlistIds([...selectedWishlistIds, e.target.value]);
                } else {
                  setSelectedWishlistIds(selectedWishlistIds.filter(id => id !== e.target.value));
                }
              }}
            />
            )}
            <label className='text-black dark:text-white font-bold'>{wishlist.title}</label>
            <p className='text-black dark:text-white font-bold'>Date: {wishlist.occasion_date || 'No date available'}</p>
          </div>
        ))}

      </form>
        {/* <ul>
          {wishlistData.map((wishlist) => (
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
        </ul> */}
    </div>

  );

};
export default UserWishlists;
