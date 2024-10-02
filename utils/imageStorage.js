export const uploadImage = (file, onSuccess, onError) => {
  // Allowed image types
  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 1024 * 1024; // 1MB size limit

  // Validate the file type
  if (!allowedTypes.includes(file.type)) {
    onError("Only JPEG and PNG files are allowed.");
    return;
  }

  // Validate the file size
  if (file.size > maxSize) {
    onError("Image size should be less than 1MB.");
    return;
  }

  // Convert the image to Base64
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result;
    try {
      onSuccess(base64String); // Pass the Base64 string to the success callback
    } catch (error) {
      onError("Error processing the image.");
    }
  };

  reader.onerror = () => {
    onError("Error reading the file.");
  };

  reader.readAsDataURL(file); // Convert image to Base64 string
};
