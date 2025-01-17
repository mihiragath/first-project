'use client';
import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  platform: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fifa 19",
      platform: "PS4",
      price: 44.0,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Glacier White 500GB",
      platform: "PS4",
      price: 249.99,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Platinum Headset",
      platform: "PS4",
      price: 119.99,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
  ]);

  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, increment: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + increment),
            }
          : item
      )
    );
  };

  const removeItem = (id: number): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = (): void => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(0.1 * totalCost);
      alert("Promo code applied successfully!");
    } else {
      alert("Invalid promo code.");
    }
  };

  const shippingCost = totalCost > 100 ? 0 : 5; 

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center text-center">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
        <div className="flex flex-col lg:flex-row">
          {/* Shopping Cart Section */}
          <div className="w-full lg:w-2/3 p-6 m-200  justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty!</p>
            ) : (
              <div>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <p className="text-gray-600">{cartItems.length} Items</p>
                  <a href="#" className="text-purple-500 text-sm hover:underline">
                    Continue Shopping
                  </a>
                </div>
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-gray-800 font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.platform}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-xs hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-8 text-center border rounded"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-800">£{item.price.toFixed(2)}</p>
                      <p className="text-gray-800 font-bold">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-2/3 bg-gray-50 p-6 mt-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Items</p>
            <p className="text-gray-800">{cartItems.length}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">£{shippingCost.toFixed(2)}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Promo Code</label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={applyPromoCode}
                className="bg-red-500 text-white px-4 rounded-r-lg hover:bg-red-600"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold mb-6">
            <p>Total Cost</p>
            <p>£{(totalCost - discount + shippingCost).toFixed(2)}</p>
          </div>
          <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600">
            Checkout
          </button>
        </div>

        {/* Go to Home Button */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-6">
          <Link href="/">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}