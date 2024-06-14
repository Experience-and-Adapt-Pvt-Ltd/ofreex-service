'use client'
import React, { useState } from 'react'
import AddressClient from './AddressClient';

const AddAddressClientPopUp = () => {
  const [showAddressClient, setShowAddressClient] = useState(false);
  return (
    <>
      <div className="container mx-auto p-4">
            <div className="bg-white text-blue-500 p-6 rounded shadow flex justify-center items-center cursor-pointer"
            onClick={() => setShowAddressClient(true)}
            >
                Add New Address
            </div>
        </div>
        {showAddressClient && <AddressClient onClose={() => setShowAddressClient(false)}/>}
    </>
  )
}

export default AddAddressClientPopUp
