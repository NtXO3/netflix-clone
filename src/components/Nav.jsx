import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/netflix-logo2.svg'
import { UserAuth } from '../context/AuthContext';

const Nav = () => {
    const { user, logOut } = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/')
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <nav className='flex items-center justify-between p-4 z-[100] w-full absolute'>
            <Link to='/'>
                <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
                <img src={Logo} alt="" />
            </Link>
            {
                user?.email ?
                (
                    <>
                        <div>
                            <Link to="/account">
                                <button className='text-white pr-4'>Account</button>
                            </Link>
                            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white' onClick={handleLogout}>Log Out</button>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div>
                            <Link to="/login">
                                <button className='text-white pr-4'>Sign In</button>
                            </Link>
                            <Link to="/signup">
                                <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
                            </Link>
                        </div>
                    </>
                )
            }
            
        </nav>
    );
}

export default Nav;
