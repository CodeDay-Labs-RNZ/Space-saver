import React from 'react';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <header className="bg-blue-500 p-4 text-white">
                <h1 className="text-3xl">Welcome to the Landing Page</h1>
            </header>

            <section className="p-4">
                <h2 className="text-2xl">What is AppName?</h2>
            </section>

            <section className="p-4">
                <h2 className="text-2xl">Our services</h2>

                <p>
                    - Service 1
                    <br />
                    - Service 2
                    <br />
                    - Service 3
                </p>
            </section>

            <section className="p-4">
                <h2 className="text-2xl">Contact Us</h2>
                <p>Email: info@example.com</p>
                <p>Phone: +1 123-456-7890</p>
            </section>

            <footer className="bg-blue-500 p-4 mt-auto text-white">
                <p>&copy; {new Date().getFullYear()} Our Business</p>
                {/* TODO: link out to another route /contact*/}
                <p>Contact Us</p>
            </footer>
        </div>
    );
};

export default LandingPage;