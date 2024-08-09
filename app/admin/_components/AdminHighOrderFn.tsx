"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { ComponentType, useEffect, useState } from 'react';
import Loader from './Loader';
import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper';


const withAdmin = (Component: ComponentType<any>) => {
    const AdminComponent = (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();
        const loading = status === 'loading';
        const [clientSide, setClientSide] = useState(false);

        useEffect(() => {
            setClientSide(true);

            if (!clientSide) return;

            if (status === 'loading') return;

            if (!session || session.user.role !== 'ADMIN') {
                router.push('/');
            }
        }, [clientSide, status, session, router]);

        if (!clientSide || status === 'loading' || !session || session.user.role !== 'ADMIN') {
            return <MaxWidthWrapper>
                <div className='py-12 flex justify-self-center'>
                    {status === 'loading' ? loading : 'Not Authorized'}
                </div>
            </MaxWidthWrapper>;
        }

        return <Component {...props} />;
    };

    return AdminComponent;
};

export default withAdmin;