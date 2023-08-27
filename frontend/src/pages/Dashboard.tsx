import React from 'react';

const Dashboard: React.FC = () => {

    /* add buttons that will route to a new page creating a booking for user */


    return (
        <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-6">
                <div className="border-b border-gray-300 pb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-4 space-y-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                workcation.com/
              </span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="janesmith"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-300 pb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-4">
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default Dashboard;