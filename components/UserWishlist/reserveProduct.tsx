"use client";
import axiosInstance from '../../utils/axios';

export default function ReserveProduct({productId, isReserved}: {productId: number, isReserved: boolean}) {

    const reserveProduct = async (productId: number) => {
      await axiosInstance.post(`/api/wishlists/products/${productId}/reserve/`);
      alert("Product reserved!");
    };

    const unReserveProduct = async (productId: number) => {
      await axiosInstance.post(`/api/wishlists/products/${productId}/unreserve/`);
      alert("Product unReserved!");
    };

  return (
    <div>
      {!isReserved && (
        <button onClick={() => reserveProduct(productId)}>Reserve</button>
      )}
      {isReserved && (
        <div>
        <p>item is reserved</p>
        <button onClick={() => unReserveProduct(productId)}>Reserve</button>
        </div>
      )}

    </div>
)

}
