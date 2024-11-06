"use client"
import utilStyles from "../../styles/utils.module.css";
import productStyles from "../../styles/Product.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";
import { linkRegex } from "../../constants/regexConstants";
import { uploadImage } from "../../utils/imageStorage";
import { Product } from "@/interfaces/interface";
import Image from 'next/image'
import axiosInstance from "@/utils/axios";


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
				<span className={utilStyles.error}>
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
				<span className={utilStyles.error}>
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

	return (
		<>
			<fieldset className={utilStyles.noBorder}>
				<legend className={utilStyles.description}>
					Provide a product details
				</legend>

				{isProductSelected ?

				<>
					<label
						htmlFor="ProductName"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Name</span>
							{getError(validForm.hasValidName)}
							{console.log(validForm.hasValidName)}
						</div>
						<input
							className={`${productStyles.inputOne} ${
								!validForm.hasValidName && utilStyles.containerError
							}`}
							type="text"
							value={product.name}
							onChange={handleProductNameChange}
							placeholder="e.g. Shoes"
							id="productName"
							name="productName"
							// maxLength={32}
						/>
					</label>

					<label
						htmlFor="link"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Link</span>
							{getError(validForm.hasValidLink)}
							{console.log(validForm.hasValidLink)}
						</div>
						<input
							className={`${productStyles.inputOne}  ${
								!validForm.hasValidLink && utilStyles.containerError
							}`}
							type="url"
							value={product.link}
							onChange={handleLinkChange}
							placeholder="e.g. https://google.com"
							id="link"
							name="link"
							// maxLength={32}
						/>
					</label>

					<label
						htmlFor="price"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Price</span>
							{getError(validForm.hasValidPrice)}
						</div>
						<input
							className={`${productStyles.inputOne} ${
								!validForm.hasValidPrice &&
								utilStyles.containerError
							}`}
							type="number"
							value={product.price}
							onChange={handlePriceChange}
							placeholder="25.99"
							id="price"
							name="price"
						/>
					</label>

					<label
						htmlFor="priority"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Priority</span>
						</div>
						<select className={`${productStyles.inputOne}`}
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

						</select>
					</label>

					<label
						htmlFor="image"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Image</span>
							{getImageError(validForm.hasValidImage, errMessage)}
							{console.log(validForm.hasValidImage)}
						</div>
						<input
							className={`${productStyles.inputOne}`}
							type="file"
							accept=".jpeg,.png"
							// value={product.image}
							onChange={handleImageUpload}
							// placeholder="e.g. Doe"
							id="image"
							name="image"
							// maxLength={32}
						/>
						{product.image && <Image src={product.image} alt={product.name} width="60" height="60"/>}
					</label>

					<label
						htmlFor="notes"
						className={`${productStyles.label} ${utilStyles.colorText}`}
					>
						{" "}
						<div className={productStyles.labelContainer}>
							<span>Notes</span>
						</div>
						<input
							className={`${productStyles.inputOne}`}
							type="text"
							value={product.notes}
							onChange={handleNotesChange}
							placeholder="e.g. Please buy blue one"
							id="notes"
							name="notes"
							// maxLength={32}
						/>
					</label>
					<button
					type='button'
					className={`${productStyles.longButton}`}
					onClick={handleAddNewProduct}> Add product </button>
					<button className={`${productStyles.cancelButton}`}onClick={handleClick}> Cancel </button>
				</>
				:
				<>
					<button className={`${productStyles.longButton}`} onClick={handleClick}> Add New Product +</button>
                    <div className="overflow-y-auto h-96 my-4">
                        <ul>
                            {products.map((p, index) => (
                            <li key={index} id={index}>
                                <div className="flex gap-4 bg-white px-4 py-6 my-2 mx-4 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                                    <div className="flex gap-4">
                                        {/* image */}
                                        <div className="w-20 h-20 max-sm:w-18 max-sm:h-18 shrink-0">
                                            {p.image && <Image src={p.image} className="w-full h-full object-contain" alt="Preview" width="20" height="20"/>}
                                        </div>

                                        {/* product details */}
                                        <div className="flex flex-col gap-4 ">
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800">{p.id}{" "}{p.name}</h3>
                                                <a href={p.link} target="_blank" className="text-xs text-gray-500 mt-2 flex items-center gap-2 break-all">{p.link}</a>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex flex-col">

                                            <div className="flex items-start gap-4 justify-end">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 cursor-pointer fill-gray-400 inline-block" viewBox="0 0 64 64">
                                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                                </svg> */}
                                                <button type="button" onClick={() => handleRemoveProduct(p.id)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 cursor-pointer fill-gray-400 inline-block" viewBox="0 0 24 24">
                                                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#f31111"></path>

                                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#df1d1d"></path>
                                                    </svg>
                                                </button>
                                            </div>

                                            <h3 className="text-base font-bold text-gray-800 mt-auto">${p.price}</h3>
                                        </div>
                                    </div>
                                </div>

                            </li>
                            ))}
                        </ul>
                    </div>
   				</>
			}
		</fieldset>

		</>
	);
}
