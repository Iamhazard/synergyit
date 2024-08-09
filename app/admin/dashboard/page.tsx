'use client'

import dynamic from 'next/dynamic'

const ECommerce = dynamic(() => import("../_components/Dashboard/E-commerce"), { ssr: false })
const DefaultLayout = dynamic(() => import("../_components/Layouts/DefaultLayout"), { ssr: false })

const DashboardHome = () => {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}

export default DashboardHome