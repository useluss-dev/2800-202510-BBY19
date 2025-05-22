'use client';
import React from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaMapPin } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ContactUs() {
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_jsdnsdp', 'template_wayhy3l', e.target, 'tIPwJvxbCFPQqe9GD').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            },
        );
        e.target.reset();
        toast.success('Your Message Has Been Sent');
    };

    return (
        <div className="relative mx-auto flex h-screen min-h-[calc(100vh-92px-263px)] max-w-7xl flex-col items-center justify-evenly px-10 text-center md:flex-row md:text-left lg:min-h-[calc(100vh-140px-263px)]">
            <h3 className="absolute top-20 text-xl tracking-[20px] text-gray-500 uppercase md:text-2xl">
                Contact
            </h3>
            <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
                <h4 className="text-center text-xl font-semibold md:text-2xl lg:text-3xl 2xl:text-4xl">
                    I have got just what you need.{' '}
                    <span className="decoration-darkGreen/50 underline">Lets talk.</span>
                </h4>

                <div className="space-y-1 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5">
                    <div className="flex items-center justify-center space-x-5">
                        <FaEnvelope className="h-7 w-7 animate-pulse text-[#F55266]" />
                        <p className="text-lg md:text-2xl lg:text-2xl">inquiry@recompute.com</p>
                    </div>
                    <div className="flex items-center justify-center space-x-5">
                        <FaMapPin className="h-7 w-7 animate-pulse text-[#F55266]" />
                        <p className="text-lg md:text-2xl lg:text-2xl">British Columbia, Canada</p>
                    </div>
                </div>
                <form
                    onSubmit={sendEmail}
                    className="mx-auto flex w-80 flex-col space-y-2 md:w-fit"
                >
                    <div className="space-y-2 md:flex md:space-y-0 md:space-x-2">
                        <input
                            name="name"
                            placeholder="Name"
                            className="w-80 rounded-sm border-b border-[#242424] bg-slate-400/10 px-6 py-4 text-gray-300 placeholder-gray-500 transition-all outline-none hover:border-[#F55266]/40 focus:border-[#F55266]/40 md:w-auto"
                            type="text"
                            required
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            className="w-80 rounded-sm border-b border-[#242424] bg-slate-400/10 px-6 py-4 text-gray-300 placeholder-gray-500 transition-all outline-none hover:border-[#F55266]/40 focus:border-[#F55266]/40 md:w-auto"
                            type="email"
                            required
                        />
                    </div>
                    <input
                        name="subject"
                        placeholder="Subject"
                        className="w-80 rounded-sm border-b border-[#242424] bg-slate-400/10 px-6 py-4 text-gray-300 placeholder-gray-500 transition-all outline-none hover:border-[#F55266]/40 focus:border-[#F55266]/40 md:w-auto"
                        type="text"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        className="w-80 rounded-sm border-b border-[#242424] bg-slate-400/10 px-6 py-4 text-gray-300 placeholder-gray-500 transition-all outline-none hover:border-[#F55266]/40 focus:border-[#F55266]/40 md:w-auto"
                        required
                    />
                    <button className="animate-pulse rounded-lg bg-[#F55266] px-10 py-3 text-lg font-bold text-white md:py-5">
                        {' '}
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
