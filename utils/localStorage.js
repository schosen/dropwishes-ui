import { getSessionId } from "./session";

export const getWishList = () => {
    const sessionId = getSessionId();

    if (typeof window !== "undefined") {
        const wishList = localStorage.getItem(`wishList-${sessionId}`);
        return wishList ? JSON.parse(wishList) : [];
    }
    return [];
};

export const addToWishList = (data) => {
    const sessionId = getSessionId();

    if (typeof window !== "undefined") {
        let wishList = getWishList();
        wishList.push(data);
        localStorage.setItem(`wishList-${sessionId}`, JSON.stringify(wishList));
    }
};

export const clearWishList = () => {
    const sessionId = getSessionId();
    if (typeof window !== "undefined") {
        localStorage.removeItem(`wishList-${sessionId}`);
    }
};
