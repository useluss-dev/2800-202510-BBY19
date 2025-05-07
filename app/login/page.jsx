"use client";
import React from 'react';

export default function LoginPage() {

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-5.5 rounded-4xl shadow-2xl w-full max-w-sm space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-300">
                        Email
                    </label>
                    <input
                        id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                        className="mt-2 w-full p-2 bg-gray-700 text-white border border-gray-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-800"
                        placeholder="email123@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm text-gray-300">
                        Password
                    </label>
                    <input
                        id="password" name="password" type="password" value={formData.password} onChange={handleChange}
                        className="mt-2 w-full p-2 bg-gray-700 text-white border border-gray-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-800"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}