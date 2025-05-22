'use client';
import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function CreateListing() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [form, setForm] = useState({
        name: '',
        category: '',
        price: 0,
        brand: '',
        stock: 1,
        condition: '',
        description: '',
        images: [],
        posterId: '',
    });

    // Populate posterId from the logged‑in user
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }

        if (status === 'authenticated') {
            setForm((prev) => ({ ...prev, posterId: session.user.id }));
        }
    }, [session, status, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'stock' || name === 'price' ? Number(value) : value,
        }));
    };

    //this function uploads the img then converts it to base64 and sets it to the form
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const base64Promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });
        });
        const base64Images = await Promise.all(base64Promises);
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...base64Images],
        }));
    };

    //this function handles the delete of an image
    const handleDeleteImage = (index) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const sellerId = session?.user?.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...form, sellerId }),
            });
            const data = await res.json();
            if (res.ok && data.success && status === 'authenticated') {
                toast.success('Listing created successfully!');

                //reset form
                setForm({
                    name: '',
                    category: '',
                    price: '',
                    brand: '',
                    stock: 1,
                    condition: '',
                    description: '',
                    images: [],
                    posterId: session.user.id,
                });
            } else {
                toast.error(`Failed to create listing: ${data.error}`);
            }
        } catch (err) {
            console.log(err);
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <div className="mx-auto p-8">
            <h1 className="mb-6 text-3xl font-bold lg:mb-12">Create New Listing</h1>

            <div className="md:flex md:justify-center">
                <div className="rounded-lg bg-[#232933] p-12 shadow-md md:w-2/3 lg:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Title:</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full rounded border px-4 py-2"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                className="w-full rounded border px-4 py-2"
                                value={form.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Price (CAD):</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full rounded border px-4 py-2"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                min={1}
                                className="w-full rounded border px-4 py-2"
                                value={form.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Category:</label>
                            <select
                                name="category"
                                className="w-full rounded border px-4 py-2"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option>Select Category</option>
                                <option value="Smartphones">Smartphones</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Tablets">Tablets</option>
                                <option value="Wearable Electronics">Wearable Electronics</option>
                                <option value="Computers & Laptops">Computers & Laptops</option>
                                <option value="Cameras, Photo & Video">
                                    Cameras, Photo & Video
                                </option>
                                <option value="Headphones">Headphones</option>
                                <option value="Motherboard">Motherboard</option>
                                <option value="Graphics Card">Graphics Card</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Single Board Computer">Single Board Computer</option>
                                <option value="Mouse">Mouse</option>
                                <option value="Streaming">Streaming</option>
                                <option value="Memory">Memory</option>
                                <option value="Power">Power</option>
                            </select>
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Condition:</label>
                            <select
                                name="condition"
                                className="w-full rounded border px-4 py-2"
                                value={form.condition}
                                onChange={handleChange}
                            >
                                <option>Select Condition</option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Parts">For parts or not working</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-xl font-bold">Description:</label>
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
                            <label className="mb-1 block text-xl font-bold">Upload Images:</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-[#F55266] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#f55265c8]"
                                onChange={handleImageUpload}
                                required
                            />
                        </div>

                        {/* Image Previews */}
                        {form.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {form.images.map((img, index) => (
                                    <div key={index} className="relative rounded border p-2">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(index)}
                                            className="bg-opacity-60 hover:bg-opacity-90 absolute top-2 left-2 rounded-full bg-[#F55266] px-[2px] py-[2px] hover:cursor-pointer hover:bg-[#f55265c8]"
                                        >
                                            <IoMdClose />
                                        </button>
                                        <Image
                                            src={img}
                                            alt={`Preview ${index}`}
                                            className="h-32 w-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-full bg-[#F55266] py-3 text-xl font-bold hover:bg-[#f55265c8]"
                        >
                            Create Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateListing;
