import React from "react";
import getCurrentSeller from "../actions/getCurrentSeller";
import EmptyState from "../components/EmptyState";
import ProductForm from "./productForm";
import getCategories from "../actions/getCategories";

const productListingPage =  async () => {
  const currentSeller = await getCurrentSeller();
  const categories = await getCategories();
  

  if (!currentSeller) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  return (
    <>
      <ProductForm 
      categories = {categories}/>
    </>
  );
};

export default productListingPage;
