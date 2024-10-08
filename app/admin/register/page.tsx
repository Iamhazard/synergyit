import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image'
import AdminRegistration from '../_components/AdminRegistration'

const Adminpage = () => {
    return (
        <div className='min-h-screen bg-gray-200 text-gray-900 flex justify-center'>
            <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow-sm sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div>
                        <Image src={"https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"} className=' mx-auto' width={32} height={32} alt='image' />
                    </div>
                    <div>

                        <AdminRegistration />
                    </div>

                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')` }}
                    >
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Adminpage