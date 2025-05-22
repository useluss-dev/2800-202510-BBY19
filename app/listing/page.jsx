
import React from 'react';
import ImageGallery from './components/ImageGallery';
import ListingDetails from './components/ListingDetails';

import { listings, db } from '../api/listings/route'

function ListingPage() {
    


    
    
    
    return (
        <div>
            <div className="flex flex-col space-y-6 p-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                <div className="w-full lg:w-1/2">
                    <ImageGallery />
                </div>
                <div className="w-full lg:w-1/2">
                    <ListingDetails />
                </div>
            </div>
        </div>
    );
}

export default ListingPage;
