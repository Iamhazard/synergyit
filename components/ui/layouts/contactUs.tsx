import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button, FormLabel, Input, List, Textarea } from '@chakra-ui/react';

const ContactUs = () => {
    return (
        <MaxWidthWrapper>
            <section className="mb-32">
                <div id="map" className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418.4697780026198!2d85.34071417393655!3d27.687705387764083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1993e83bcdfd%3A0xf4de3d1d0e95b3c2!2sAll%20In%20One%20Mart!5e0!3m2!1sen!2snp!4v1722320176967!5m2!1sen!2snp"
                        width="100%" height="480" style={{ border: '0' }} loading="lazy"></iframe>
                </div>
                <div className="container px-6 md:px-12">
                    <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
                        <div className="flex flex-wrap">
                            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                                <form>
                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <Input
                                            type="text"
                                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                            id="name" />
                                        <FormLabel
                                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                            htmlFor="name">Name</FormLabel>
                                    </div>
                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <Input
                                            type="email"
                                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                            id="email" />
                                        <FormLabel
                                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                            htmlFor="email">Email address</FormLabel>
                                    </div>
                                    <div className="relative mb-6" data-te-input-wrapper-init>
                                        <Textarea
                                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                                            id="message" rows={3}></Textarea>
                                        <FormLabel
                                            htmlFor="message"
                                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">Message</FormLabel>
                                    </div>
                                    <div className="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
                                        <input
                                            className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]"
                                            type="checkbox" id="exampleCheck96" />
                                        <label
                                            className="ml-[0.5rem] mb-0 inline-block select-none text-neutral-800"
                                            htmlFor="exampleCheck96">Send me a copy of this message</label>
                                    </div>
                                    <Button
                                        type="submit"
                                        _hover={{ color: 'blue.600' }}
                                        color='blue.400'
                                        className="inline-block w-full rounded bg-fuchsia-500 px-6 pb-2.5 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:ring-0 active:bg-primary-700"
                                        data-te-ripple-init data-te-ripple-color="light">Send</Button>
                                </form>
                            </div>
                            <div className="w-full grow-0 basis-auto md:px-3 lg:w-7/12 lg:px-6">
                                <div className="mb-12">
                                    <p className="text-xl font-bold mb-4">Contact Information</p>
                                    <ul className="list-unstyled">
                                        <List className="mb-2 flex items-center">
                                            <span className="mr-2 inline-block h-4 w-4">
                                                <svg className="h-full w-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h2v10H3zM21 10h-2v10h2zM9 10h6v10H9zM6 3h12v2H6z" />
                                                </svg>
                                            </span>
                                            <p className="mb-0 text-base">New Baneshwor</p>
                                        </List>
                                        <li className="mb-2 flex items-center">
                                            <span className="mr-2 inline-block h-4 w-4">
                                                <svg className="h-full w-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7V4a1 1 0 011-1h14a1 1 0 011 1v3M5 12h14M5 12v9m14-9v9" />
                                                </svg>
                                            </span>
                                            <p className="mb-0 text-base">+977 </p>
                                        </li>
                                        <li className="mb-2 flex items-center">
                                            <span className="mr-2 inline-block h-4 w-4">
                                                <svg className="h-full w-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7V4a1 1 0 011-1h14a1 1 0 011 1v3M5 12h14M5 12v9m14-9v9" />
                                                </svg>
                                            </span>
                                            <p className="mb-0 text-base">synergyIt@example.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>

    );
};

export default ContactUs;
