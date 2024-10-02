export const getWishList = () => {
  if (typeof window !== "undefined") {
    const wishList = localStorage.getItem("wishList");
    return wishList ? JSON.parse(wishList) : [];
  }
  return [];
};

export const addToWishList = (data) => {
  if (typeof window !== "undefined") {
    // TODO if email and name are the same then need to append as a new wishlist.
    // If email and name are not the same completely override what's there, we want to avoid having multiple user objects. There should only be one.
    let wishList = getWishList();
    wishList.push(data);
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }
};

export const clearWishList = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("wishList");
  }
};
