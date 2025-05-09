import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';
import ListingDetails from '../components/ListingDetails';

function ListingPage() {
    return (
        <div>
            <Header />
            <div className="w-1/2">
                <ImageGallery />
            </div>
        </div>
    );
}

export default ListingPage;
