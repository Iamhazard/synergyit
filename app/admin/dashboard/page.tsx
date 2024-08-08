'use client'

import ECommerce from "../_components/Dashboard/E-commerce";
import DefaultLayout from "../_components/Layouts/DefaultLayout";
//import withAdmin from "../_components/AdminHighOrderFn";



const DashbaordHome = () => {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}

export default (DashbaordHome)
