import React from "react";

const ProductList = ({ products, onShow, onDelete, onEdit }) => {
  const handleEdit = (id) => {
    onEdit(id);
    onShow(true);
  };
  return (
    <div className="container mx-auto md:px-5">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Thumbnail</th>
              <th className="py-3 px-6 text-left">Images</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((item, i) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-6">{i + 1}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6">
                  <img
                    src={`http://localhost:5000/${item.thumbnail}`}
                    alt="Thumbnail"
                    className="rounded-md w-12 h-12"
                  />
                </td>
                <td className="py-3 px-6 flex">
                  {item.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${img.url}`}
                      alt="Image"
                      className="rounded-md w-12 h-12 mr-2"
                    />
                  ))}
                </td>
                <td className="py-3 px-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Card View */}
      <div className="md:hidden">
        {products.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
            <div className="flex items-center mb-4">
              <img
                src={`http://localhost:5000/${item.thumbnail}`}
                alt="Thumbnail"
                className="rounded-md w-16 h-16"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-700 font-bold">{item.price}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">Images:</h4>
              <div className="flex space-x-2">
                {item.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${img.url}`}
                    alt="Image"
                    className="rounded-md w-12 h-12"
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
                Edit
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
