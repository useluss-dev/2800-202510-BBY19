'use client';
import React, { useState } from 'react';

function CreateListing() {
    const [form, setForm] = useState({
        title: '',
        price: '',
        condition: '',
        description: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted listing: ', form);
    };

    return (
        <div className="mx-auto max-w-3xl p-8">
            <h1 className="mb-6 text-3xl font-bold">Create New Listing</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full rounded border px-4 py-2"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Price (CAD)</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full rounded border px-4 py-2"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Condition */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Condition</label>
                    <select
                        name="condition"
                        className="w-full rounded border px-4 py-2"
                        value={form.condition}
                        onChange={handleChange}
                    >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="parts">For parts or not working</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        rows="5"
                        className="w-full rounded border px-4 py-2"
                        value={form.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-pink-600"
                        onChange={handleImageUpload}
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full rounded-full bg-pink-500 py-3 font-semibold text-white transition hover:bg-pink-600"
                >
                    Create Listing
                </button>
            </form>
        </div>
    );
}

export default CreateListing;
