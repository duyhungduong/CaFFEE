import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayVNCurrency from "../helper/displayCurrency";
import { toast } from "react-toastify";

const AllOrder = () => {
  const [data, setData] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      setData(responseData.data);
      groupOrdersByMonth(responseData.data);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      //thông báo lỗi cho người dùng
      toast.error("Failed to fetch order details!!!")
    }
  };
  

  // Hàm nhóm đơn hàng theo tháng và tính tổng số tiền của từng tháng
  const groupOrdersByMonth = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      const monthYear = moment(order.createdAt).format("MMMM YYYY"); // Format theo dạng "October 2024"

      if (!grouped[monthYear]) {
        grouped[monthYear] = {
          orders: [],
          totalAmountForMonth: 0, // Tổng số tiền cho tháng
        };
      }

      grouped[monthYear].orders.push(order);
      grouped[monthYear].totalAmountForMonth += order.totalAmount; // Cộng dồn tổng số tiền của từng đơn hàng trong tháng
    });

    setGroupedOrders(grouped);
  };

  const totalPrice = data.reduce((prev, curr) => prev + curr.totalAmount, 0);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 bg-gray-100">
      {/* Display Total Price at the top */}
      <div className="max-w-5xl mx-auto mb-8 p-4 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-coffee-brown">
          Total Orders Value: {displayVNCurrency(totalPrice)}
        </h2>
      </div>

      {/* Orders grouped by month */}
      <div className="max-w-5xl mx-auto p-4 space-y-8">
        {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-center text-gray-600">No Order available</p>
        ) : (
          Object.keys(groupedOrders).map((monthYear) => (
            <div key={monthYear}>
              <h3 className="text-xl font-bold text-coffee-brown mb-4">
                {monthYear}
              </h3>{" "}
              {/* Hiển thị tháng và năm */}
              {/* Tổng số tiền của tháng */}
              <p className="text-lg font-semibold mb-4">
                Total for {monthYear}:{" "}
                {displayVNCurrency(
                  groupedOrders[monthYear].totalAmountForMonth
                )}
              </p>
              {/* Hiển thị các đơn hàng của từng tháng */}
              {groupedOrders[monthYear].orders.map((item, index) => (
                <div
                  key={item.userId + index}
                  className="bg-white p-6 shadow-lg rounded-lg mb-4"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {moment(item.createdAt).format("lll")}
                      </p>
                      <p className="text-gray-500">
                        {item?.userId?.name || "Customer Name"}
                      </p>
                      <p className="text-gray-500">
                        {item?.email || "Customer Email"}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-coffee-brown">
                      Total: {displayVNCurrency(item.totalAmount)}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    {item?.productDetails.map((product, index) => (
                      <div
                        key={product.productId + index}
                        className="flex gap-4 bg-gray-100 p-4 rounded-lg"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-28 h-28 object-contain rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-medium">
                            {product.name}
                          </h4>
                          <div className="mt-2">
                            <span className="text-lg text-red-500">
                              {displayVNCurrency(product.price)}
                            </span>
                            <span className="ml-4">
                              Quantity: {product.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment and Shipping Details */}
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Payment Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">
                        Payment Details:
                      </h4>
                      <p className="mt-2">
                        Payment Method:{" "}
                        {item?.paymentDetails?.payment_method_type?.[0]}
                      </p>
                      <p>
                        Payment Status: {item?.paymentDetails?.payment_status}
                      </p>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold">
                        Shipping Details:
                      </h4>
                      {item?.shipping_options?.length > 0 ? (
                        item.shipping_options.map((shipping, index) => (
                          <div
                            key={shipping?.shipping_rate || index}
                            className="mt-2"
                          >
                            Shipping Amount:{" "}
                            {displayVNCurrency(shipping?.shipping_amount)}
                          </div>
                        ))
                      ) : (
                        <p>No shipping information available.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Display Total Price at the bottom */}
      <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-coffee-brown">
          Total Orders Value: {displayVNCurrency(totalPrice)}
        </h2>
      </div>
    </div>
  );
};

export default AllOrder;
