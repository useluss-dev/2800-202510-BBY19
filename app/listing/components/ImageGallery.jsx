'use client';
import React, { useState } from 'react';
import Image from 'next/image';

function ImageGallery() {
    const images = ['/gpu.png', '/headphones.png', '/rasp.png'];
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex items-start">
            {/* Thumbnails */}
            <div className="flex w-20 flex-col space-y-2">
                {images.map((img, idx) => (
                    <Image
                        key={idx}
                        src={img}
                        width={64}
                        height={64}
                        onClick={() => setSelectedImage(img)}
                        className={`cursor-pointer rounded-md transition-all ${selectedImage === img ? 'border-2 border-white' : ''}`}
                        alt={`Thumbnail ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Full image */}
            <div className="relative h-[500px] w-full rounded-md">
                <Image src={selectedImage} fill className="rounded-md object-contain" alt="Main" />
            </div>
        </div>
    );
}

export default ImageGallery;
