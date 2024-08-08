"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { ComponentType, useEffect } from 'react';
import Loader from './Loader';
import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper';


const withAdmin = (Component: ComponentType<any>) => {
    const AdminComponent = (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();
        const loading = status === 'loading';

        useEffect(() => {

            if (typeof window !== 'undefined') {
                if (!loading && (!session || session.user.role !== 'ADMIN')) {
                    router.push('/');
                }
            }
        }, [loading, session, router]);

        if (loading || !session || session.user.role !== 'ADMIN') {
            return <MaxWidthWrapper>
                <div className='py-12 flex justify-self-center'>
                    {loading ? <Loader /> : 'Not Authorized'}
                </div>

            </MaxWidthWrapper>;
        }

        return <Component {...props} />;
    };

    return AdminComponent;
};

export default withAdmin;