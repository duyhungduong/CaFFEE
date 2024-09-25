import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayVNCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToProductView.url, {
      method: SummaryApi.addToProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    setLoading(false);
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {data.length === 0 && !loading && (
        <p className="bg-slate-600 py-7 text-center text-white text-lg">
          No items in your cart
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-7 lg:justify-between">
        {/* Sản phẩm trong giỏ hàng */}
        <div className="w-full lg:w-3/4">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-300 h-40 my-3 border border-black rounded bg-skeleton-loading"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="w-full bg-white rounded-lg shadow-lg p-4 flex gap-4 mb-6 transition-all hover:shadow-xl"
                >
                  <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-gray-500 capitalize">
                        {product?.productId?.category}
                      </p>
                      <p className="font-semibold text-coffee-green">
                        {displayVNCurrency(product?.productId?.sellingPrice)}
                      </p>
                    </div>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                        className="w-9 h-9 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{product?.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="w-9 h-9 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete size={24} />
                  </div>
                </div>
              ))}
        </div>

        {/* Tổng kết giỏ hàng */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Total Quantity</p>
            <p className="font-semibold text-gray-800">{totalQty}</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Total Price</p>
            <p className="font-semibold text-coffee-green">
              {displayVNCurrency(totalPrice)}
            </p>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
