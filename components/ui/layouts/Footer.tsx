'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'

//import Link from 'next/link'
import Image from 'next/image'
import { Link } from '@chakra-ui/react'
import { ExternalLink } from 'lucide-react'
const Footer = () => {
    const pathname = usePathname()
    const pathsToMinimize = [
        '/verify-email',
        '/sign-up',
        '/sign-in',
    ]

    return (
        <footer className='bg-white flex-grow-0'>
            <MaxWidthWrapper>
                <div className='border-t border-gray-200'>
                    {pathsToMinimize.includes(pathname) ? null : (
                        <div className='pb-8 pt-16'>
                            <div className='flex justify-center'>
                                <Image alt="logo" src='/images/synergy-Logo.png' width={150} height={180} />

                            </div>
                        </div>
                    )}

                    {pathsToMinimize.includes(pathname) ? null : (
                        <div>
                            <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                                <div className='absolute inset-0 overflow-hidden rounded-lg'>
                                    <div
                                        aria-hidden='true'
                                        className='absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90'
                                    />
                                </div>

                                <div className='text-center relative mx-auto max-w-sm'>
                                    <h3 className='font-semibold text-gray-900'>
                                        Company
                                    </h3>
                                    <div className='mt-2 text-sm text-muted-foreground'>
                                        <div className="flex flex-col space-y-2">
                                            <div>
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    About us
                                                </Link>
                                            </div>
                                            <div className="mt-2">
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline  hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    Team
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center relative mx-auto max-w-sm'>
                                    <h3 className='font-semibold text-gray-900'>
                                        Resources
                                    </h3>
                                    <div className='mt-2 text-sm text-muted-foreground'>
                                        <div className="flex flex-col space-y-2">
                                            <div>
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline  hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    Blog

                                                </Link>
                                            </div>
                                            <div className="mt-2">
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline  hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    Case studies
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center relative mx-auto max-w-sm'>
                                    <h3 className='font-semibold text-gray-900'>
                                        Join us
                                    </h3>
                                    <div className='mt-2 text-sm text-muted-foreground'>
                                        <div className="flex flex-col space-y-2">
                                            <div>
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline text-sky-700  hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    Careers

                                                </Link>
                                            </div>
                                            <div className="mt-2">
                                                <Link href='https://chakra-ui.com' color='blue.600' _hover={{ color: 'blue.500' }} className="hover:underline  hover:text-fuchsia-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                                                    Open Positions
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='py-10 md:flex md:items-center md:justify-between'>
                    <div className='text-center md:text-left'>
                        <p className='text-sm text-muted-foreground'>
                            &copy; {new Date().getFullYear()} All Rights
                            Reserved to Synergy IT
                        </p>
                    </div>

                    <div className='mt-4 flex items-center justify-center md:mt-0'>
                        <div className='flex space-x-8'>
                            <Link
                                href='#'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Terms
                            </Link>
                            <Link
                                href='#'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Privacy Policy
                            </Link>
                            <Link
                                href='#'
                                className='text-sm text-muted-foreground hover:text-gray-600'>
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}

export default Footer