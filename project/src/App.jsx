import { useEffect, useState } from "react";
import ProductList from "./pages/ProductList";
import AddProduct from "./compoents/AddProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleShowModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setProductToEdit(null);
  };

  const handleAddProduct = async (formData, productId) => {
    const method = productId ? "PUT" : "POST";
    const url = productId
      ? `http://localhost:5000/api/products/${productId}`
      : "http://localhost:5000/api/products";

    const response = await fetch(url, {
      method: method,
      body: formData, // FormData object is sent directly in the body
    });
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      if (productId) {
        setProducts(
          products.map((product) => (product._id == productId ? data : product))
        );
      } else {
        setProducts([data, ...products]);
      }
      setShow(false);
    }
  };

  const handeEditProduct = async (id) => {
    const product = products.find((product) => product._id === id);
    setProductToEdit(product);
    setShow(true);
  };

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      setProducts([...products.filter((pro) => pro._id != id)]);
    }
  };

  return (
    <>
      <div className="container mx-auto py-20">
        <button
          onClick={handleShowModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
        >
          Add Product
        </button>

        {show && (
          <AddProduct
            onClose={handleCloseModal}
            onSubmit={handleAddProduct}
            productToEdit={productToEdit}
          />
        )}

        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={handeEditProduct}
          onShow={handleShowModal}
        />
      </div>
      <div></div>
    </>
  );
}

export default App;
