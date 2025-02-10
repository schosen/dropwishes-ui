import { Wishlist } from "@/interfaces/wishlist";
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import axiosInstance from "@/utils/axios";
import { nameRegex } from "@/contains/regexConstants";
import ButtonSecondary from "../shared/button/ButtonSecondary";
import ButtonPrimary from "../shared/button/ButtonPrimary";
import Label from "../shared/Label";
import Input from "../shared/Input";

interface WishlistFormProps {
  wishlist: Wishlist;
  onCancel: () => void;
  onSave: (wishlist: Wishlist) => void
  isCreate?: boolean
  isUpdate?: boolean
}

const WishlistForm: React.FC<WishlistFormProps> = ({
	wishlist,
	onCancel,
	onSave,
	isCreate = false,
	isUpdate = false,

}) => {
  const [validForm, setValidForm] = useState({ hasValidTitle: true });
	const [formData, setFormData] = useState(wishlist);

		function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			title: e.target.value,
		});
	}
	function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			description: e.target.value,
		});
	}
	function handleOccasionDateChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			occasion_date: e.target.value,
		});
	}
	function handleAddressChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			address: e.target.value,
		});
	}

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

  const formValidation = () => {

		let hasValidTitle;

		formData.title == "" ? hasValidTitle = undefined : hasValidTitle = true;

		if (formData.title == undefined)  {
			hasValidTitle = true
		} else {
			hasValidTitle = nameRegex.test(formData.title);
		}

		setValidForm({...validForm, hasValidTitle})
		if (hasValidTitle) {
      return true
		}
  };

  const handleCreateWishlist = async (e: MouseEvent<HTMLButtonElement>) => {

		let isFormValid = formValidation()

    if (isFormValid) {
      try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/wishlists/`,
       formData
      );
        setFormData({title: "", description: "", occasion_date: null, address: "", products: []});
        onSave(response.data)
      } catch (error) {
        console.log("error: ", error)
      }

    }

	}

  const handleUpdateWishlist = async (wishlist: Wishlist) => {

		let isFormValid = formValidation()

		if (isFormValid) {
			try {
				const response = await axiosInstance.patch<Wishlist>(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/wishlists/${wishlist.uuid}/`, formData);
				setFormData({title: "", description: "", occasion_date: null, address: "", products: []});
        onSave(response.data)
			} catch (error) {
				console.error('Failed to update product', error);
				alert('There was an error updating the product.');
			}

		}
  };


	return (
		<>
			<fieldset className="">
				{/* <legend className="">
					Provide a wishlist title and details
				</legend> */}

			<div className="max-w-lg">
				<Label
					htmlFor="title"
					className="text-sm"
				>
					Title
				</Label>

					<div className="">
						{getError(validForm.hasValidTitle)}
					</div>

					<Input
						className="mt-1.5"
						type="text"
						value={formData.title}
						onChange={handleTitleChange}
						placeholder="e.g. Birthday Wishlist"
						id="title"
						name="title"
						// required
						maxLength={32}
					/>

				<Label
					htmlFor="description"
					className="text-sm"
				>
					Description
				</Label>

					<div className="">
						{/* {getError(validForm.hasValidEmailAddress)} */}
					</div>

					<Input
						className="mt-1.5"
						type="text"
						value={formData.description}
						onChange={handleDescriptionChange}
						placeholder="e.g. what I want for my bday"
						id="description"
						name="description"
					/>


				<Label
					htmlFor="occasionDate"
					className="text-sm"
				>
					Occasion Date
				</Label>

					<div className="">
						{/* <span>Occasion Date</span> */}
					</div>

					<Input
						className="mt-1.5"
						type="date"
						value={formData.occasion_date}
						onChange={handleOccasionDateChange}
						// placeholder="e.g. Doe"
						id="occasionDate"
						name="occasionDate"
						// maxLength={32}
					/>


				<Label
					htmlFor="address"
					className="text-sm"
				>
					Address
				</Label>

					<div className="">
						{/* <span>Address</span> */}
					</div>

					<Input
						className="mt-1.5"
						type="text"
						value={formData.address}
						onChange={handleAddressChange}
						placeholder="e.g. 21 Simple Late, Q78 59T"
						id="address"
						name="address"
						// maxLength={32}
					/>
				</div>

				{/* ============= */}

				<div className="flex flex-col sm:flex-row pt-6">

					{isCreate &&
						<ButtonPrimary
							type='button'
							className="sm:!px-7 shadow-none"
							onClick={handleCreateWishlist}>
							Save
						</ButtonPrimary>
					}

					{ isUpdate &&
						<ButtonPrimary
							type='button'
							className="sm:!px-7 shadow-none"
							onClick={() => handleUpdateWishlist(wishlist)}>
							Save
						</ButtonPrimary>
					}

					<ButtonSecondary
						className="mt-3 sm:mt-0 sm:ml-3"
						onClick={onCancel}
					>
						Cancel
					</ButtonSecondary>

				</div>



			</fieldset>
		</>
	);
}

export default WishlistForm;
