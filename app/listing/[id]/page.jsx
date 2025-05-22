import React from 'react';
import ImageGallery from './components/ImageGallery';
import ListingDetails from './components/ListingDetails';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import PropTypes from 'prop-types';

export default async function ListingPage({ params: { id } }) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    const rawListing = await db
        .collection(process.env.MONGODB_COLLECTIONL)
        .findOne({ _id: ObjectId.createFromHexString(id) });

    if (!rawListing) {
        return <p>Listing not found</p>;
    }

    const rawUser = await db
        .collection('users')
        .findOne({ _id: ObjectId.createFromHexString(rawListing.posterId) });
    const posterName = rawUser.fullname;

    // convert _id to string for the client
    const listing = {
        ...rawListing,
        _id: rawListing._id.toString(),
    };

    console.log(listing);

    return (
        <div>
            <div className="flex flex-col space-y-6 p-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                <div className="w-full lg:w-1/2">
                    <ImageGallery images={listing.images} />
                </div>
                <div className="w-full lg:w-1/2">
                    <ListingDetails listing={listing} posterName={posterName} />
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
