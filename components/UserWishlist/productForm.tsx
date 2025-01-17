import React, { useState , ChangeEvent, MouseEvent, Dispatch, SetStateAction} from 'react';
import Label from '@/components/shared/Label';
import Input from '@/components/shared/Input';
import Image from 'next/image';
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import ButtonSecondary from "@/components/shared/button/ButtonSecondary";
import Select from '@/components/shared/Select';
import { uploadImage } from '@/utils/imageStorage';
import { Product } from '@/interfaces/wishlist';
import { linkRegex, base64Regex } from "@/contains/regexConstants";
import axiosInstance from '@/utils/axios';

interface ProductFormProps {
  product: Product;
  uuid: string;
  onCancel: () => void;
  onSave: (product: Product) => void
  isCreate?: bool
  isUpdate?: bool
}


const ProductForm: React.FC<ProductFormProps> = ({
  product,
  uuid,
  onCancel,
  onSave,
  isCreate = false,
  isUpdate = false,
}) => {
  const [validForm, setValidForm] = useState({
		hasValidName: true,
		hasValidPrice: true,
		hasValidLink: true,
	});
  const [formData, setFormData] = useState(product);
  const [errMessage, setErrMessage] = useState("")

  const priorityOptions = ["HIGH", "MEDIUM", "LOW"];

  function handleProductNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  }

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      link: e.target.value,
    });
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      price: e.target.value,
    });
  }

  function handlePriorityChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
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
        setFormData({...formData,
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
    setFormData({
      ...formData,
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

		let hasValidName;
		let hasValidPrice;
		let hasValidLink;

		formData.name == "" ? hasValidName = undefined : hasValidName = true;
		formData.price == "" ? hasValidPrice = undefined : hasValidPrice = true;

		if (formData.link == undefined || formData.link == null)  {
			hasValidLink = true
		} else {
			hasValidLink = linkRegex.test(formData.link);
		}

		setValidForm({...validForm, hasValidName, hasValidPrice, hasValidLink})
		if (hasValidName == true && hasValidPrice == true && hasValidLink == true) {
      return true
		}
  };

  const handleCreateProduct = async (e: MouseEvent<HTMLButtonElement>) => {
			// validation above
    let isFormValid = formValidation()

    if (isFormValid) {
      try {
        const response = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/wishlists/${uuid}/`, {
        products: [formData]
      });

        // let responseProducts = response.data.products

        // const recentProduct = responseProducts.reduce(
        //   (max, product) =>  product.id > max.id ? product : max,
        //   responseProducts[0]
        // );

        // console.log("MAX ID PRODUCT: ", recentProduct)

        // setProducts([...products, recentProduct]);
        setFormData([{name: "", link: null, priority: "", price: "", image: null, notes: ""}]);

        onSave(response.data.products)
				// handleCancelClick()
        // setIsProductSelected(false);
      } catch (error) {
        console.log("error: ", error)
      }

    }

	}

  const handleUpdateProduct = async (product: Product) => {

		let isFormValid = formValidation()

		if (isFormValid) {
			try {
				const response = await axiosInstance.patch<Product>(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/products/${product.id}/`, formData);
				// onSave(response.data);
				setFormData([{name: "", link: null, priority: "", price: "", image: null, notes: ""}]);
        onSave(response.data)
				// handleCancelClick();
			} catch (error) {
				console.error('Failed to update product', error);
				alert('There was an error updating the product.');
			}

		}
  };

  return (
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
            value={formData.name}
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
            value={formData.link}
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
              value={formData.price}
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
            value={formData.priority}
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
          {formData.image && base64Regex.test(formData.image) && <Image src={formData.image} alt={formData.name} width="60" height="60"/>}

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
            value={formData.notes}
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

        {isCreate &&
          <ButtonPrimary
            type='button'
            className="sm:!px-7 shadow-none"
            onClick={handleCreateProduct}>
            Save
          </ButtonPrimary>
        }

        { isUpdate &&
          <ButtonPrimary
            type='button'
            className="sm:!px-7 shadow-none"
            onClick={() => handleUpdateProduct(product)}>
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
    </>
  )
}

export default ProductForm;
