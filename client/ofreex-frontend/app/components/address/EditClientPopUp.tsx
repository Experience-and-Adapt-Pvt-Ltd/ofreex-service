"use client"
import React, { useState } from 'react'
import EditClient from './EditClient';

const EditClientPopUp = () => {
    const [showEditClient, setShowEditClient] = useState(false);
  return (
    <div>
      <button
      onClick={() => setShowEditClient(true)}
            className="absolute top-0 right-0 p-2 text-xl mt-8">
        Edit
      </button>
      {/* {showEditClient && <EditClient onClose={() => setShowEditClient(false)} />} */}
    </div>
  )
}

export default EditClientPopUp
