import React from "react";

function AboutUs() {
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat min-h-screen flex flex-col text-white bg-[url(../public/officespace2.jpg)]">
            <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>
            <div className="flex items-center justify-center h-full">

                {/*<div className="flex justify-start">*/}
                {/*    <img width={100} height={100}*/}
                {/*         src="/logoPlaceholderImage.svg"*/}
                {/*         className="items-center"*/}
                {/*         alt="logo"/>*/}
                {/*</div>*/}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Meet the Team</h1>
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Zini Wang</h1>
                        <h1 className="text-xl font-semibold">Robel Hailu</h1>
                        <h1 className="text-xl font-semibold">Nicklas Di Pietro</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
