import utilStyles from "../../styles/utils.module.css";
import wishlistStyles from "../../styles/Wishlist.module.css";

export default function AnonWishlist({
	wishlist,
	setWishlist,
	validForm,
}) {

	function handleTitleChange(e) {
		setWishlist({
			...wishlist,
			title: e.target.value,
		});
	}
	function handleDescriptionChange(e) {
		setWishlist({
			...wishlist,
			description: e.target.value,
		});
	}
	function handleOccasionDateChange(e) {
		setWishlist({
			...wishlist,
			occasion_date: e.target.value,
		});
	}
	function handleAddressChange(e) {
		setWishlist({
			...wishlist,
			address: e.target.value,
		});
	}

	function getError(validator) {
		if (!validator)
			return (
				<span className={utilStyles.error}>
					{validator === undefined
						? "This field is required"
						: "Invalid format"}
				</span>
			);
	}

	// ADD WELCOME HERE AS A JAVASCRIPT TOGGLE

	return (
		<>
			<h1 className={`${utilStyles.title} ${utilStyles.colorText}`}>
				Create a Wishlist
			</h1>
			<fieldset className={utilStyles.noBorder}>
				<legend className={utilStyles.description}>
					Provide a wishlist title and details
				</legend>
				<label
					htmlFor="title"
					className={`${wishlistStyles.label} ${utilStyles.colorText}`}
				>
					{" "}
					<div className={wishlistStyles.labelContainer}>
						<span>Title</span>
						{getError(validForm.hasValidTitle)}
						{console.log(validForm.hasValidTitle)}
					</div>
					<input
						className={`${wishlistStyles.inputOne} ${
							!validForm.hasValidTitle &&
                            utilStyles.containerError
						}`}
						type="text"
						value={wishlist.title}
						onChange={handleTitleChange}
						placeholder="e.g. Birthday Wishlist"
						id="title"
						name="title"
						// required
						maxLength={32}
					/>
				</label>
				<label
					htmlFor="description"
					className={`${wishlistStyles.label} ${utilStyles.colorText}`}
				>
					{" "}
					<div className={wishlistStyles.labelContainer}>
						<span>Description</span>
						{/* {getError(validForm.hasValidEmailAddress)} */}
					</div>
					<input
						className={`${wishlistStyles.inputOne}`}
						type="text"
						value={wishlist.description}
						onChange={handleDescriptionChange}
						placeholder="e.g. what I want for my bday"
						id="description"
						name="description"
					/>
				</label>

				<label
					htmlFor="occasionDate"
					className={`${wishlistStyles.label} ${utilStyles.colorText}`}
				>
					{" "}
					<div className={wishlistStyles.labelContainer}>
						<span>Occasion Date</span>
					</div>
					<input
						className={`${wishlistStyles.inputOne}`}
						type="date"
						value={wishlist.occasion_date}
						onChange={handleOccasionDateChange}
						// placeholder="e.g. Doe"
						id="occasionDate"
						name="occasionDate"
						// maxLength={32}
					/>
				</label>

				<label
					htmlFor="address"
					className={`${wishlistStyles.label} ${utilStyles.colorText}`}
				>
					{" "}
					<div className={wishlistStyles.labelContainer}>
						<span>Address</span>
					</div>
					<input
						className={`${wishlistStyles.inputOne}`}
						type="text"
						value={wishlist.address}
						onChange={handleAddressChange}
						placeholder="e.g. 21 Simple Late, Q78 59T"
						id="address"
						name="address"
						// maxLength={32}
					/>
				</label>



			</fieldset>
		</>
	);
}
