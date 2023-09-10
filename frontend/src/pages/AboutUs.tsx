import React from "react";

function AboutUs() {
    return (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Meet the Team (Click our names to be taken to our LinkedIns)</h1>
                    <div className="space-y-2 grid grid-cols-3 gap-3">
                        <div>
                            <h1 className="text-xl font-semibold"><a href={"https://www.linkedin.com/in/ziniwang/"}>Zini Wang</a></h1>

                            <h2>hi I am zini</h2>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold"><a href={"https://www.linkedin.com/in/robelhailu/"}>Robel Hailu</a></h1>

                            <h2 className="">Highly driven student and aspiring software developer eager to learn and gain
                                insight into the environment of the tech industry. I have experience in Java and Python, and
                                some familiarity with HTML/CSS, JavaScript, MySQL, and Linux. I am interested in opportunities
                                where I can collaborate to utilize my programming skills and further work towards personal
                                and professional development. I am always learning and willing to learn to strengthen my
                                understanding in programming concepts.</h2>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold"><a href={"https://www.linkedin.com/in/nicklasdipietro/"}>Nicklas Di Pietro</a></h1>

                            <h2 className="">I am a highly focused and persistent learner. I have gained experience in various
                            foundations of both IT and Software Development as I have worked across different industries. My primary
                            language(s) are Java, and as of late Typescript. I have a foundation in Javascript, and MySQL, with some foundations
                            in Linux environments. I believe in no person left behind, and always strive to make sure everyone's voice is heard,
                            and know that a ship runs better when everyone is on the same page.</h2>
                        </div>
                    </div>
                </div>
    );
}

export default AboutUs;
