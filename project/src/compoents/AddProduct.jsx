import React, { useEffect, useState } from "react";

const AddProduct = ({ onClose, onSubmit, productToEdit }) => {
  const [product, setProduct] = useState({
    name: productToEdit?.name || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || "",
    thumbnail: productToEdit?.thumbnail || null,
    images: productToEdit?.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "thumbnail") {

      const file = e.target.files[0];
      setProduct({ ...product, thumbnail: file });

    } else if (e.target.name === "images") {

      const files = Array.from(e.target.files);
      setProduct({ ...product, images: files });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);

    formData.append("price", product.price);
    if (product.thumbnail) formData.append("thumbnail", product.thumbnail);
    product.images.forEach((image) => formData.append("images", image));

    onSubmit(formData, productToEdit?._id);
  };

  const handeDeleteImage = async (id) => {
    const response = await fetch(`http://localhost:5000/api/images/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      const updatedImages = product.images.filter((img) => img._id !== id);

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: updatedImages,
      }));
    }
  };


  return (
    <div className="bg-rose-100">
      <div className="fixed inset-0 z-100 flex items-center justify-center opacity-100 bg-[#fbfaf99c]">
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-2xl border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            {!productToEdit ? "Add Product" : "Update Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleFileChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {product?.thumbnail && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:5000/${product?.thumbnail}`}
                    alt="Thumbnail"
                    className="rounded-md w-12 h-12"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleFileChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex gap-2">
                {product?.images.map((img) => (
                  <>
                    {img?.url && (
                      <div
                        key={img._id}
                        className="flex justify-center items-center text-rose-800"
                      >
                        <img
                          src={`http://localhost:5000/${img.url}`}
                          alt="Image"
                          className="rounded-md w-12 h-12 mr-2"
                        />
                        <span
                          onClick={() => handeDeleteImage(img._id)}
                          className="bg-red-100 px-2 rounded-sm cursor-pointer"
                        >
                          x
                        </span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {!productToEdit ? "Add Product" : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
