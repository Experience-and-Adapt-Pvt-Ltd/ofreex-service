import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const ProductForm = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Product Details
        </h2>
        <form>
          <div className="space-y-4">
            {/* <!-- Username --> */}
            <div>
              <label className="text-gray-900 font-medium block mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="ex: Phone"
                className="form-input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* <!-- About --> */}
            <div>
              <label className="text-gray-900 font-medium block mb-2">
                Details of Product
              </label>
              <textarea
                rows={3}
                placeholder="Write a few sentences about yourself."
                className="form-textarea w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            {/* <!-- Photo Upload --> */}
            <div>
              <label className="text-gray-900 font-medium block mb-2">
                Photo
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-7 12V10m0 12v-5m0 5H9m3 0h3"
                      />
                    </svg>
                    <p className="text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider">
                      Upload a file
                    </p>
                  </div>
                  <input type="file" className="opacity-0" />
                </label>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-gray-900 font-medium block mt-4 mb-2">
              Price
            </label>
            <input
              type="text"
              placeholder="ex: Phone"
              className="form-input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="text-gray-900 font-medium block mt-4 mb-2">
              Discount
            </label>
            <input
              type="text"
              placeholder="ex: Phone"
              className="form-input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-gray-900 font-medium block mt-4 mb-2">
              Quantity
            </label>
            <input
              type="text"
              placeholder="ex: Phone"
              className="form-input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
          <label className="text-gray-900 font-medium block mt-4 mb-2">Category</label>
          <select className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select Category</option>
            <option value="usa">Sports</option>
            <option value="canada">Furniture</option>
            <option value="uk">Others</option>
          </select>
        </div>

        {/* Delivery */}
        <div>
          <label className="text-gray-900 font-medium block mt-4 mb-2">Delivery</label>
          <select className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select Delivery</option>
            <option value="usa">Self Delivery</option>
            <option value="canada">Ofreex Delivery</option>
          </select>
        </div>

          {/* <!-- Buttons --> */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-900 rounded px-4 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
