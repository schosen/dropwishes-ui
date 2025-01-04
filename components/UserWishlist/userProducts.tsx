"use client"
import { ChangeEvent, MouseEvent, useState } from "react";
import { linkRegex } from "../../contains/regexConstants";
import { uploadImage } from "../../utils/imageStorage";
import { Product } from "@/interfaces/wishlist";
import Image from 'next/image'
import axiosInstance from "@/utils/axios";
import Prices from "../shared/Prices";
import ProductStatus from "../shared/product/ProductStatus";
import ButtonPrimary from "../shared/button/ButtonPrimary";
import ButtonSecondary from "../shared/button/ButtonSecondary";
import Label from "../shared/Label";
import Input from "../shared/Input";
import Select from "../shared/Select";

export default function AnonProduct({
	WishlistProducts,
	uuid

}: {WishlistProducts: Product[], setProducts: Product[], uuid: string}) {
	const [validForm, setValidForm] = useState({
		hasValidName: true,
		hasValidPrice: true,
		hasValidLink: true,
	});
	const [isProductSelected, setIsProductSelected] = useState(false)
	const [product, setProduct] = useState({name: "", link: null, priority: "", price: "", image: null , notes: ""});
	const [errMessage, setErrMessage] = useState("")
  const [products, setProducts] = useState(WishlistProducts)

  const priorityOptions = ["HIGH", "MEDIUM", "LOW"];

	function handleProductNameChange(e: ChangeEvent<HTMLInputElement>) {
		setProduct({
			...product,
			name: e.target.value,
		});
	}

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
		setProduct({
			...product,
			link: e.target.value,
		});
	}

	function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
		setProduct({
			...product,
			price: e.target.value,
		});
	}

	function handlePriorityChange(e: ChangeEvent<HTMLInputElement>) {
		setProduct({
			...product,
			priority: e.target.value,
		});
	}

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];
		if (file) {
		uploadImage(
			file,
			(base64Image) => {
				setErrMessage('');
				setValidForm({...validForm, hasValidLink: true})
				setProduct({...product,
					image: base64Image}); // Store the Base64 string of the image
			},
			(errorMessage) => {
				console.log(errorMessage)
				setErrMessage(errorMessage)
				setValidForm({...validForm, hasValidLink: false})
			}
		);
		}
	};

  function handleNotesChange(e: ChangeEvent<HTMLInputElement>) {
		setProduct({
			...product,
			notes: e.target.value,
		});
	}


	function getImageError(validator: boolean, message: string) {
		if (!validator)
			return (
				<span className="">
					{message}
				</span>
			);
	}

	const handleClick = () => {
		setIsProductSelected(!isProductSelected);

	};

	function getError(validator: boolean) {
		if (!validator)
			return (
				<span className="">
					{validator === undefined
						? "This field is required"
						: "Invalid format"}
				</span>
			);
	}

	const handleAddProduct = () => {

		let hasValidName;
		let hasValidPrice;
		let hasValidLink;

		product.name == "" ? hasValidName = undefined : hasValidName = true;
		product.price == "" ? hasValidPrice = undefined : hasValidPrice = true;

		if (product.link == undefined || product.link == null)  {
			hasValidLink = true
		} else {
			hasValidLink = linkRegex.test(product.link);
		}

		setValidForm({...validForm, hasValidName, hasValidPrice, hasValidLink})
		if (hasValidName == true && hasValidPrice == true && hasValidLink == true) {
      return true
		}
  };

	async function handleAddNewProduct(e: MouseEvent<HTMLButtonElement>) {
			// validation above
    let formValidation = handleAddProduct()

    if (formValidation) {
      try {
        const response = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/wishlists/${uuid}/`, {
        products: [product]
      });

        let responseProducts = response.data.products

        const recentProduct = responseProducts.reduce(
          (max, product) =>  product.id > max.id ? product : max,
          responseProducts[0]
        );

        console.log("MAX ID PRODUCT: ", recentProduct)

        setProducts([...products, recentProduct]);
        setProduct([{name: "", link: null, priority: "", price: "", image: null, notes: ""}]);
        setIsProductSelected(false);
      } catch (error) {
        console.log("error: ", error)
      }

    }

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

	async function handleEditProduct(id: number) {

	}

	return (
		<>
			<fieldset>
				{/* shadow-xl is the shadow border-slate-200 is default*/}
				<div className="border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-7 space-y-4 sm:space-y-6 block shadow-xl">
				{isProductSelected ?

				<>
					{/* ADD NEW FIELD "auto populate fields with link" */}
					{/* OR manually populate */}

					{/* ============ */}
					<div className="max-w-lg">
						<Label
							htmlFor="ProductName"
							className="text-sm"
						>
							Name
						</Label>

						{/* display error here */}
						<div className="">
							{getError(validForm.hasValidName)}
						</div>

						<Input
							className="mt-1.5"
							type="text"
							value={product.name}
							onChange={handleProductNameChange}
							placeholder="e.g. Shoes"
							id="productName"
							name="productName"
							// maxLength={32}
						/>

					</div>

				{/* =========== */}

				<div className="max-w-lg">

					<Label
						htmlFor="link"
						className="text-sm"
					>
						Link
					</Label>

						<div className="">
							{getError(validForm.hasValidLink)}
						</div>

						<Input
							className="mt-1.5"
							type="url"
							value={product.link}
							onChange={handleLinkChange}
							placeholder="e.g. https://google.com"
							id="link"
							name="link"
							// maxLength={32}
						/>

				</div>

				{/* =========== */}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">

					<div>
						<Label
							htmlFor="price"
							className="text-sm"
						>
							Price
						</Label>

						<div className="">
							{getError(validForm.hasValidPrice)}
						</div>

							<Input
								className="mt-1.5"
								type="number"
								value={product.price}
								onChange={handlePriceChange}
								placeholder="25.99"
								id="price"
								name="price"
							/>

					</div>

				<div>
					<Label
						htmlFor="priority"
						className="text-sm"
					>
						Priority
					</Label>

						<Select className="mt-1.5"
							id="priority"
							name="priority"
							value={product.priority}
							onChange={handlePriorityChange}>

								<option value="" disabled>Select your option</option>
								{priorityOptions.map((priority, index) => (
									<>
									<option value={priority}>
										{priority}
									</option>
									</>
								))};

						</Select>
				  </div>
				</div>

				{/* ============== */}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">

					<div>
						<label
							htmlFor="image"
							className="text-sm"
						>
							Image
						</label>

						<div className="">
							{getImageError(validForm.hasValidImage, errMessage)}
						</div>

						<Input
							className=""
							type="file"
							accept=".jpeg,.png"
							// value={product.image}
							onChange={handleImageUpload}
							id="image"
							name="image"
							// maxLength={32}
						/>
						{product.image && <Image src={product.image} alt={product.name} width="60" height="60"/>}

					</div>

				  <div>
						<label
							htmlFor="notes"
							className="text-sm"
						>
							Notes
						</label>

						<Input
							className="mt-1.5"
							type="text"
							value={product.notes}
							onChange={handleNotesChange}
							placeholder="e.g. Please buy blue one"
							id="notes"
							name="notes"
							// maxLength={32}
						/>

				  </div>
				</div>

				{/* ============= */}

				<div className="flex flex-col sm:flex-row pt-6">
					<ButtonPrimary
						type='button'
						className="sm:!px-7 shadow-none"
						onClick={handleAddNewProduct}>
						Add product
					</ButtonPrimary>

					<ButtonSecondary
						className="mt-3 sm:mt-0 sm:ml-3"
						onClick={handleClick}
          >
            Cancel
          </ButtonSecondary>

				</div>
				{/* ============= */}

				</>
				:
				<>

					<ButtonPrimary
						className="w-full max-w-[240px]"
						onClick={handleClick}
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
                    <button
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
			}
			</div>
		</fieldset>
		</>
	);
}
