// app/components/address/EditClient.tsx
'use client'
import { updateAddress } from '@/app/actions/address.operations';
import React, { useState } from 'react';

const EditClient = ({ address, onClose }: { address: any, onClose: () => void }) => {
    const [updatedAddress, setUpdatedAddress] = useState({
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        defaultAddress: address.defaultAddress
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedAddress({
            ...updatedAddress,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // await updateAddress(address.id, updatedAddress);
            alert('Address updated successfully!');
            onClose(); // Close the modal after update
        } catch (error:any) {
            alert(`Failed to update the address: ${error.message}`);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" value={updatedAddress.street} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={updatedAddress.city} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={updatedAddress.state} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" id="pincode" name="pincode" value={updatedAddress.pincode} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="defaultAddress">Default Address</label>
                    <input type="checkbox" id="defaultAddress" name="defaultAddress" checked={updatedAddress.defaultAddress} onChange={handleChange} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" onClick={onClose} className="btn btn-secondary ml-2">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditClient;
