import React from 'react';
import Header from '../components/Header';
import ImageGallery from './components/ImageGallery';
import ListingDetails from './components/ListingDetails';

function ListingPage() {
    return (
        <div>
            <Header />
            <div className="flex space-x-6 p-4">
                <div className="w-1/2">
                    <ImageGallery />
                </div>
                <div className="w-1/2">
                    <ListingDetails />
                </div>
            </div>
        </div>
    );
}

export default ListingPage;
