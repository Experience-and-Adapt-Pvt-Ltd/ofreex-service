"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../components/inputs/Input";
import ImageUpload from "../components/inputs/ImageUpload";
import { SafeCategory } from "../types";
import { useEdit } from "../hooks/useEdit";
import Image from "next/image";

interface ProductListModal {
  categories: SafeCategory;
}

const ProductForm: React.FC<ProductListModal> = ({ categories }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categoryId: "",
      imageSrc: "",
      price: "",
      title: "",
      description: "",
      discount: "",
      delivery: "",
      quantity: "",
      customCategory: "",
      // for subCategory
      subCategoryId: "",
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const category = watch("category");
  const editHook = useEdit();
  const showCustomCategory = category === "others";
  const [subCategories, setSubCategories] = useState([]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      ...data,
      discount: parseFloat(data.discount),
      images: images,
      categoryId: category === "others" ? "others" : data.categoryId,
      categoryLabel: data.categoryId,
      subCategoryId:
        category === "others" ? data.customCategory : data.subCategoryId,
    };

    axios
      .post("/api/listings", formData)
      .then(() => {
        toast.success("Product Listed!");
        reset({
          categoryId: "",
          imageSrc: "",
          price: "",
          title: "",
          description: "",
          discount: "",
          delivery: "",
          quantity: "",
          customCategory: "",
          subCategoryId: "",
        });
        setImages([]);
        router.push("/properties");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          toast.error("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          toast.error("Error sending data");
        }
      });
  };

  // to get SubCategory
  useEffect(() => {
    if (category && category !== "others") {
      axios
        .get(
          `http://localhost:4002/listings/category/${encodeURIComponent(
            category
          )}/subcategories`
        )
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((error) => {
          console.error(`Error in fetching subcategory: ${error}`);
          setSubCategories([]);
        });
    } else {
      setSubCategories([]);
    }
  }, [category]);

  const removeImage = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setImages((currentImages) => currentImages.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Product Details
        </h2>
        <form>
          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="text-gray-900 font-medium block mt-4 mb-2">
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId")}
                onChange={(e) => setCustomValue("category", e.target.value)}
                className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((item: any, index: any) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              {showCustomCategory && (
                <>
                  <Input
                    label="Custom Category"
                    id="customCategory"
                    type="text"
                    className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Specify category"
                    register={register}
                    required
                  />
                </>
              )}
            </div>

            <div>
              <label className="text-gray-900 font-medium block mt-4 mb-2">
                Category
              </label>
              <select
                id="subCategoryId"
                {...register("subCategoryId")}
                className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory.id}>
                    {subCategory.label}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Product Name --> */}
            <div>
              <Input
                id="title"
                label="Product Name"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* <!-- About --> */}
            <div>
              {/* <textarea
                rows={3}
                placeholder="Write a few sentences about yourself."
                className="form-textarea w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea> */}
              <Input
                id="description"
                label="Details of Product"
                type="text"
                register={register}
                placeholder="Enter data of product"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Price */}
            <div>
              <Input
                id="price"
                label="Price"
                type="number"
                placeholder="ex: ₹500"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
              />
            </div>

            {/* Quantity */}
            <div>
              <Input
                id="quantity"
                label="Quantity"
                type="number"
                placeholder="ex: 10"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
              />
            </div>

            {/* Discount */}
            <div>
              <Input
                id="discount"
                label="Discount"
                type="number"
                placeholder="ex: 10%"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
              />
            </div>

            {/* Delivery */}
            <div>
              <label className="text-gray-900 font-medium block mt-4 mb-2">
                Delivery
              </label>
              <select
                id="delivery"
                {...register("delivery")}
                className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setCustomValue("delivery", e.target.value)}
              >
                <option value="own">Self Delivery</option>
                <option value="ofreex">Ofreex Delivery</option>
              </select>
            </div>

            {/* <!-- Photo Upload --> */}
            <div>
              <label className="text-gray-900 font-medium block mb-2">
                Photo
              </label>
              <div className="flex items-center justify-center w-full rounded-sm border">
                <ImageUpload
                  onChange={(value) => setImages(value)}
                  value={images}
                />
              </div>
            </div>

            {/* Image Display Section */}
            <div>
              <label className="text-gray-900 font-medium block mb-2">
                Uploaded Images
              </label>
              {images.length > 0 && (
                <div className="mt-4 flex overflow-x-auto">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex-none items-center justify-center w-40 h-40 m-2 relative"
                    >
                      <Image
                        src={image}
                        alt={`Uploaded Image ${index}`}
                        height={10}
                        width={100}
                        className="object-cover w-full h-full"
                      />
                      <button
                        onClick={(e) => removeImage(index, e)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        style={{ zIndex: 10 }}
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              onClick={handleSubmit(onSubmit)}
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
