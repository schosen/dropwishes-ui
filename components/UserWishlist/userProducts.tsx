"use client"
import { ChangeEvent, MouseEvent, useState } from "react";
import { linkRegex } from "../../contains/regexConstants";
import { uploadImage } from "../../utils/imageStorage";
import { Product } from "@/interfaces/wishlist";
import Image from 'next/image'
import axiosInstance from "@/utils/axios";
import Prices from "@/components/shared/Prices";
import ProductStatus from "@/components/shared/product/ProductStatus";
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import ButtonSecondary from "../shared/button/ButtonSecondary";
import ProductForm from "@/components/UserWishlist/productForm";
import Label from "../shared/Label";
import Input from "../shared/Input";
import Select from "../shared/Select";

export default function UserProduct({
	WishlistProducts,
	uuid

}: {WishlistProducts: Product[], setProducts: Product[], uuid: string}) {

	// const [isProductSelected, setIsProductSelected] = useState(false)
	// const [product, setProduct] = useState({name: "", link: null, priority: "", price: "", image: null , notes: ""});
	// const [errMessage, setErrMessage] = useState("")
  const [products, setProducts] = useState(WishlistProducts)
	const [isList, setIsList] = useState(true)
	const [isCreating, setIsCreating] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const [editingProduct, setEditingProduct] = useState<Product>({name: "", link: null, priority: "", price: "", image: null , notes: ""});



	// const handleClick = () => {
	// 	setIsProductSelected(!isProductSelected);

	// };

	const handleEditClick = (product: Product) => {
		setIsList(false);
		setIsUpdating(true);
		setIsCreating(false);
		console.log("IsUpdating: ", isUpdating)
		console.log("IsList: ", isList)
		setEditingProduct(product)
	};

	const handleCancelClick = () => {
		setIsList(true);
		setIsUpdating(false);
		setIsCreating(false);
		console.log("IsCreating: ", isCreating)
		console.log("IsList: ", isList)
	};

	const handleCreateClick = () => {
		setIsList(false);
		setIsUpdating(false);
		setIsCreating(true);
		console.log("IsCreating: ", isCreating)
		console.log("IsList: ", isList)
	};

	const saveList = async (updatedProducts: any) => {
		// let responseProducts = response.data.products

		// finding the most recent product and adding to setProduct array
		const recentProduct = updatedProducts.reduce(
			(max, product) =>  product.id > max.id ? product : max,
			updatedProducts[0]
		);

		console.log("MAX ID PRODUCT: ", recentProduct)

		setProducts([...products, recentProduct]);
		handleCancelClick()

	}

	const updateList  = async (updatedProduct: Product) => {
		setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
		handleCancelClick()

	}



	async function handleRemoveProduct(id) {
		// creates new array without the item to remove (using index to remove)

    try {
      const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/products/${id}/`)

      const updatedProducts = products.filter((v) => v.id !== id);
      console.log("UPDATED PRODUCTS: ", updatedProducts)
      setProducts(updatedProducts);

    } catch (error) {
      console.log("error: ", error)

    }


	};



	const renderProductList  = () => {
		return (
			<>
				<ButtonPrimary
					className="w-full max-w-[240px]"
					onClick={handleCreateClick}
        >
          Add New Product +

        </ButtonPrimary>
          <div className="overflow-y-auto h-96">
          	<div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {products.map((p, index) => (
							<div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
								<div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
									{p.image && <Image
										src={`${process.env.NEXT_PUBLIC_API_URL}/static/media/${p.image}`}
										fill
										alt={p.name}
										className="h-full w-full object-contain object-center"
										sizes="150px"
									/>}
									{p.priority == "HIGH" && <ProductStatus status={p.priority} />}
									<a href={p.link} target="_blank" className="absolute inset-0"></a>
								</div>

                <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between ">

                      <div className="flex-[1.5] ">
                        <a href={p.link} target="_blank">
                          <h3 className="text-base font-semibold">
                            {p.name}
                          </h3>

                          <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                            <div className="flex items-center space-x-1.5 italic">
                              {p.notes && <span>{p.notes}</span>}
                            </div>
                          </div>
                        </a>

                      </div>

                      <div className="hidden flex-1 sm:flex justify-end">
                        <Prices price={p.price} className="mt-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-auto pt-4 items-end justify-end text-sm">
                    <button onClick={() => handleEditClick(p)}
                      type="button"
                      className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
                    >
                      <span>Edit</span>
                    </button>

                    <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>

                    <button
                      type="button" onClick={() => handleRemoveProduct(p.id)}
                      className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
                    >
                      <span>Delete</span>
                    </button>

                  </div>

                </div>
						  </div>

              ))}
            </div>
          </div>
				</>
		)

	}

	return (
		<>
			<fieldset>
				<div className="border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-7 space-y-4 sm:space-y-6 block shadow-xl">
					{isUpdating &&
						<ProductForm
							product={editingProduct}
							uuid={uuid}
							onSave={updateList}
							onCancel={handleCancelClick}
							method="UPDATE"
						/>
					}

					{isCreating &&
						<ProductForm
							product={editingProduct}
							uuid={uuid}
							onSave={saveList}
							onCancel={handleCancelClick}
							method="CREATE"
						/>
					}

					{isList &&
						<>
							{renderProductList()}
						</>
					}
			</div>
		</fieldset>
		</>
	);
}
