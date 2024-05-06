import React from 'react'
import getCurrentSeller from '../actions/getCurrentSeller';
import EmptyState from '../components/EmptyState';
import ProductForm from './productForm';

const productListingPage = () => {
    const currentSeller = getCurrentSeller();
    if(!currentSeller){
        return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
    }
  return (
    <>
    <ProductForm /> 
    </>
  )
}

export default productListingPage;
