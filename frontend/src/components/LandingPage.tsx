import React from 'react';
import '../styles/globals.css';

const LandingPage: React.FC = () => {
    return (
        <div>
            <header>
                <h1>
                    Welcome to the landing page
                </h1>
            </header>

            <section>
                <h2>
                    What is AppName?
                </h2>
            </section>

            <section>
                <h2>
                    Our services
                </h2>

                <p>
                    - Service 1
                    <br />
                    - Service 2
                    <br />
                    - Service 3
                    <br />
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>Email: info@example.com</p>
                <p>Phone: +1 123-456-7890</p>
            </section>

            <footer>
                <p>&copy; {new Date().getFullYear()} Our Business</p>
            </footer>
        </div>
    );
};

export default LandingPage;