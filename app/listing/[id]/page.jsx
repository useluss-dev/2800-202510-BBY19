import React from 'react';
import ImageGallery from './components/ImageGallery';
import ListingDetails from './components/ListingDetails';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import PropTypes from 'prop-types';

export default async function ListingPage({ params }) {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    const rawListing = await db
        .collection(process.env.MONGODB_COLLECTIONL)
        .findOne({ _id: ObjectId.createFromHexString(id) });

    const listingForClient = {
        id: rawListing._id.toString(),
        name: rawListing.name,
        category: rawListing.category,
        price: rawListing.price,
        brand: rawListing.brand,
        stock: rawListing.stock,
        condition: rawListing.condition,
        description: rawListing.description,
        images: rawListing.images,
        posterId: rawListing.posterId.toString(),
        timestamp: rawListing.timestamp,
        rating: rawListing.rating,
        reviews: rawListing.reviews,
    };

    if (!rawListing) {
        return <p>Listing not found</p>;
    }

    const rawUser = await db
        .collection('users')
        .findOne({ _id: ObjectId.createFromHexString(rawListing.posterId) });
    const posterName = rawUser.fullname;

    return (
        <div>
            <div className="flex flex-col space-y-6 p-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                <div className="w-full lg:w-1/2">
                    <ImageGallery images={listingForClient.images} />
                </div>
                <div className="w-full lg:w-1/2">
                    <ListingDetails listing={listingForClient} posterName={posterName} />
                </div>
            </div>
        </div>
    );
}

ListingPage.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};
