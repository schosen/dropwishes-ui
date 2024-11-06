"use client";
import axiosInstance from '../../utils/axios';
import { useState } from 'react';

export default function ReserveProduct({productId, isReserved}: {productId: number, isReserved: boolean}) {
  const [reserved, setReserved] = useState(isReserved)


    const reserveProduct = async (productId: number) => {
      await axiosInstance.patch(`/api/wishlist/products/${productId}/reserve/`);
      alert("Product reserved!");
      setReserved(true)
    };

    const unReserveProduct = async (productId: number) => {
      await axiosInstance.patch(`/api/wishlist/products/${productId}/unreserve/`);
      alert("Product unReserved!");
      setReserved(false)
    };

  return (
    <div>
      {!reserved && (
        <button onClick={() => reserveProduct(productId)}>Reserve</button>
      )}
      {reserved && (
        <div>
        <p>item is reserved</p>
        <button onClick={() => unReserveProduct(productId)}>Unreserve</button>
        </div>
      )}

    </div>
)

}
