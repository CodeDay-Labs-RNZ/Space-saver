import React from "react";

function AboutUs() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Meet the Team</h1>
            <p className="text-gray-600 mb-6">
                Click our names to be taken to our LinkedIns
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">
                        <a
                            href={"https://www.linkedin.com/in/ziniwang/"}
                            className="text-blue-600 hover:underline"
                        >
                            Zini Wang
                        </a>
                    </h2>
                    <p className="text-gray-700">Hi, I'm Zini</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">
                        <a
                            href={"https://www.linkedin.com/in/robelhailu/"}
                            className="text-blue-600 hover:underline"
                        >
                            Robel Hailu
                        </a>
                    </h2>
                    <p className="text-gray-700">
                        Highly driven student and aspiring software developer
                        eager to learn and gain insight into the tech industry. I
                        have experience in Java, Python, HTML/CSS, JavaScript,
                        MySQL, and Linux. I am interested in opportunities where
                        I can collaborate to utilize my programming skills and
                        further work towards personal and professional
                        development.
                    </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">
                        <a
                            href={"https://www.linkedin.com/in/nicklasdipietro/"}
                            className="text-blue-600 hover:underline"
                        >
                            Nicklas Di Pietro
                        </a>
                    </h2>
                    <p className="text-gray-700">
                        I am a highly focused and persistent learner with
                        experience in IT and Software Development. My primary
                        languages are Java and Typescript, with a foundation in
                        Javascript, MySQL, and Linux. I believe in the
                        importance of teamwork and effective communication to
                        achieve success.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;