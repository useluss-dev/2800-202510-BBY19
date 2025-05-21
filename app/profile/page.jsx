'use client';
import Profile from "../components/Profile"


export default function home(request) {
    return (
        <div className="h-screen flex">
            <Profile />
        </div>
    )
}