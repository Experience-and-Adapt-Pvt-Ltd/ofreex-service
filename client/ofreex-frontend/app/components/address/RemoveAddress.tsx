"use client";
import React from 'react'
import { deleteAddresses } from '@/app/actions/address.operations';

interface RemoveAddressProp {
  addressId: string
}

const RemoveAddress:React.FC<RemoveAddressProp> = ({addressId}) => {
  
  async function handleDelete() {
    // await deleteAddresses(addressId)
}
  return (
    <>
     <button 
            onClick={(e:any) => handleDelete}
            className="absolute top-0 right-0 p-2 text-xl">
        Delete
      </button>
    </>
  )
}

export default RemoveAddress
