// import axios from 'axios';
import axiosInstance from '../utils/axios';  // Use the configured axios instance
import { cookies } from 'next/headers'; // To get cookies in server components
import { Wishlist } from '@/interfaces/interface'


// interface Wishlist {
//   id: number;
//   title: string;
//   occasion_date: string,
//   products: any[]

// }

// Utility function to get the auth token from cookies and redirect if not found
const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('auth_token')?.value || null; // Return null if no token found
};


// GET all wishlists
export async function getWishlists(): Promise<Wishlist[] | null> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axiosInstance.get<Wishlist[]>(`/api/wishlist/wishlists/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data; // Return the fetched wishlists data
  } catch (error) {
    console.error('Error fetching wishlists:', error);
    return null;
  }
}

// POST a new wishlist
export async function postWishlist(newWishlistData: Wishlist[]): Promise<void> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axiosInstance.post('/api/wishlists/wishlist/', newWishlistData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating wishlist:', error);
    throw error;
  }
}

// PUT (update) an existing wishlist
export async function updateWishlist(id: number, updatedWishlistData: Wishlist[]) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axiosInstance.put(`https://your-backend-api.com/api/wishlists/${id}/`, updatedWishlistData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating wishlist:', error);
    throw error;
  }
}

// PATCH (partial update) an existing wishlist
export async function patchWishlist(id: string, partialWishlistData: Wishlist[]) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axiosInstance.patch(`https://your-backend-api.com/api/wishlists/${id}/`, partialWishlistData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error partially updating wishlist:', error);
    throw error;
  }
}

// POST: Share a wishlist/s
// export async function shareWishlists(wishlistId: string[]): Promise<string> {

//   const token = getAuthToken();

//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   try {
//   const response = await axiosInstance.post(`/api/wishlist/wishlists/generate-shared-link/`, wishlistId, {
//       headers: {
//         Authorization: `Token ${token}`,
//       }});
//     return response.data.share_url;
//    } catch (error) {
//     console.error('Error generating shared link:', error);
//     throw error;
//   }
// };

export async function viewWishlists(uuid: string, wishlidIds: string): Promise<string> {

  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }
   try {
    const response = await axiosInstance.get(`/api/wishlist/wishlists/view/${uuid}/${wishlidIds}`,  {
      headers: {
        Authorization: `Token ${token}`,
      }});
    return response.data

   } catch (error) {
    console.error('Error getting wishlist data:', error);
    throw error;
   }
}
