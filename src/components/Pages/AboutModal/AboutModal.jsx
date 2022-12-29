import React from 'react';

const AboutModal = ({handleInputFeilds , handleUpdate , aboutInfo}) => {
    return (
        <>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                   {

                     <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-primary text-xl mb-2 btn-circle absolute right-2 top-2">✕</label>
                            <form className="space-y-6" autoComplete='on' onSubmit={handleUpdate}>
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text"  onChange={handleInputFeilds}  defaultValue={aboutInfo?.name} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your name please"  />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email"  onChange={handleInputFeilds} defaultValue={aboutInfo?.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email please"  />
                                </div>
                                <div>
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="address" onChange={handleInputFeilds} defaultValue={aboutInfo?.address} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your address please"  />
                                </div>
                                <div>
                                    <label for="university"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">University</label>
                                    <input type="university" onChange={handleInputFeilds} defaultValue={aboutInfo?.university} name="university" id="university" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your university please"  />
                                </div>
                                <div>
                                    <label for="profession"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profession</label>
                                    <input type="text" onChange={handleInputFeilds} name="profession" defaultValue={aboutInfo?.profession} id="profession" placeholder="Enter your profession please" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                                </div>
                                <div>
                                    <label for="profile"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile url</label>
                                    <input type="text" onChange={handleInputFeilds} name="profile" defaultValue={aboutInfo?.profile} id="profile" placeholder="Enter your profile image url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                                </div>
                                <button type="submit" className="w-full  btn btn-info  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>

                            </form>
                        </div>
                    </div>
                    }
        </>
    );
};

export default AboutModal;