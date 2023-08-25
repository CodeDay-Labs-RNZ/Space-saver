import React from 'react';
import '../styles/LandingPage.css';
import {Link} from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat min-h-screen flex flex-col text-white bg-[url(../public/officespace2.jpg)] ">
            <header className="flex justify-between bg-black-100 p-4 text-white">

                <div className="flex justify-start">
                <img width={100} height={100}
                     src="/logoPlaceholderImage.svg"
                     className="items-center"
                     alt="logo image"/>
                </div>

                <div className="flex justify-end items-center">
                    <Link to="/login" className="text-3xl mr-4">Register</Link>
                    <Link to="/login" className="text-3xl mr-4">Login</Link>
                </div>
            </header>



            <div className="flex justify-center">Stuff goes here</div>

            <footer className="bg-black-500 p-4 mt-auto text-white mr-2">
                <p>&copy; {new Date().getFullYear()} Our Business</p>
                <p>
                    <Link to="/Contact" className="underline font-bold mr-2 text-white">Contact Us</Link>
                    <Link to="/About" className="underline font-bold mr-2 text-white">About Us</Link>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;