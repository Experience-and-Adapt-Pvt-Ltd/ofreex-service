'use client'
import React, { useState } from 'react'
import EditAddress from './EditAddress';

const Edit = (addressId:any) => {
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const handleEditClick = (addressId: string) => {
    setEditAddressId(addressId);
  };
  return (
    <>
      <button onClick={() => handleEditClick} className="absolute top-0 right-0 m-8">
            Edit
          </button>
          {editAddressId && <EditAddress addressId={editAddressId} onClose={() => setEditAddressId(null)} />}
    </>
  )
}

export default Edit
