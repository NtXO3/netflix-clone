import React from 'react';
import SavedShows from '../components/SavedShows';

const Account = () => {

    
    return (
        <>
            <div className="w-full text-white">
                <img className='w-full h-[400px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/1614a465-46c8-4c95-9f39-bdbb58ff0adf/NL-nl-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
                <div className="absolute top-[20%] p-4 md:p-8">
                    <h1 className='text-3xl md:text-5xl font-bold'>My Account</h1>
                </div>
            </div>
            <SavedShows />
        </>
    );
}

export default Account;
