"use client"
import { Wishlist } from "@/interfaces/wishlist";
import CopyLink from "./copyLink";
import { useState } from 'react';
import axiosInstance from '../../utils/axios';
import Heading from "../Heading/Heading";
import Link from 'next/link'
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import WishlistForm from "./wishlistForm";
import CardCategory4 from '@/components/CardCategories/CardCategory4';


function UserWishlists({ wishlistData }: {wishlistData: Wishlist[]}){
  const [wishlists, setWishlists] = useState(wishlistData)
  const [selectView, setSelectView] = useState<boolean>(false)
  const [selectedWishlistIds, setSelectedWishlistIds] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);
	const [editingWishlist, setEditingWishlist] = useState<Wishlist>({title: "", description: "", occasion_date: null, address: "", products: []});
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [deletingWishlist, setDeletingWishlist] = useState<Wishlist | null>(null);
  let gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"

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


	const handleEditClick = (wishlist: Wishlist) => {
		setIsUpdating(true);
    setIsCreating(false);
		setEditingWishlist(wishlist);
	};

  const handleCreateClick = () => {
		setIsUpdating(false);
		setIsCreating(true);
	};

  const handleCancelClick = () => {
		setIsUpdating(false);
		setIsCreating(false);
    setEditingWishlist({title: "", description: "", occasion_date: null, address: "", products: []})
	};

  const saveList = async (newWishlist: Wishlist) => {
    setWishlists((prevWishlists) => [newWishlist, ...prevWishlists]);
		handleCancelClick()

	}

	const updateList  = async (updateWishlist: Wishlist) => {
		setWishlists((prevWishlists) =>
      prevWishlists.map((wishlist) =>
        wishlist.id === updateWishlist.id ? updateWishlist : wishlist
      )
    );
    setEditingWishlist({title: "", description: "", occasion_date: null, address: "", products: []})
		handleCancelClick()

	}

	async function handleRemoveWishlist(uuid: string) {

    try {
      const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/wishlists/${uuid}/`)

      const updatedWishlist = wishlists.filter((v) => v.uuid !== uuid);
      setWishlists(updatedWishlist);
      setDeletingWishlist(null);

    } catch (error) {
      console.log("error: ", error)

    }


	};

  const renderEditDelete = (wishlist: Wishlist) => {
    return (
      <>
        <button onClick={() => handleEditClick(wishlist)}
          type="button"
          className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
        >
          <span>Edit</span>
        </button>

        <button
          type="button" onClick={() => setDeletingWishlist(wishlist)}
          className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
        >
          <span>Delete</span>
        </button>
      </>
    )
  }

  return(
      <>
        {deletingWishlist && (
          <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-4">
                Confirm deletion of "{deletingWishlist.title}" wishlist.
              </h3>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeletingWishlist(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleRemoveWishlist(deletingWishlist.uuid)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full lg:w-[25%]">

            {!isUpdating && !isCreating &&
              <ButtonPrimary
                className="w-full max-w-[240px]"
                onClick={handleCreateClick}
              >
                Create a wishlist
              </ButtonPrimary>
            }


            {isUpdating && !isCreating &&

              <div className="border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-7 space-y-4 sm:space-y-6 block shadow-xl">
              <WishlistForm
                wishlist={editingWishlist}
                onSave={updateList}
                onCancel={handleCancelClick}
                isUpdate={true}
              />
              </div>
            }

            {isCreating && !isUpdating &&
              <div className="border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-7 space-y-4 sm:space-y-6 block shadow-xl">
              <WishlistForm
                wishlist={editingWishlist}
                onSave={saveList}
                onCancel={handleCancelClick}
                isCreate={true}
              />
              </div>
            }
          </div>

        <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-10 2xl:mx-10 "></div>

        <div className="flex-auto">

          <Heading
            className="lg:mb-14 text-neutral-900 dark:text-neutral-50"
            fontClass="text-xl md:text-2xl 2xl:text-3xl font-semibold "
            // isCenter
            desc=""
          >
            My Wishlists.
          </Heading>


          <div className={`nc-SectionGridMoreExplore relative `}>
          {shareLink && (
          <div>
            <h3 className='font-bold text-black dark:text-white'>Your Shareable Link:</h3>
            <p>{shareLink}</p>
            <button onClick={removeBlock} className='font-bold text-black dark:text-white'>  Remove Link </button>
            <CopyLink link={shareLink} />
          </div>
          )}

          {!selectView && (<button onClick={handleClick} className='text-black dark:text-white font-bold'>Share Wishlist</button>)}

          {selectView && (<button onClick={handleClick} className='text-black dark:text-white font-bold'> Cancel </button>)}


          <form onSubmit={(e) => {
          e.preventDefault();
          handleGenerateLink();
          }}>
          {selectView && (<button type="submit">Generate Share Link</button>)}

          <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
            {wishlists.map((wishlist: any) => (
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

                <CardCategory4
                  // bgSVG={item.svgBg}
                  featuredImage={wishlist.products[0]}
                  key={wishlist.uuid}
                  // review how to have different color for each new wishlist
                  color="bg-indigo-50"
                  editDelete={renderEditDelete(wishlist)}
                  {...wishlist}
                />
              </div>
            ))}
          </div>
          </form>
        </div>
      </div>



    </>

  );

};
export default UserWishlists;
