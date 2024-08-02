
import { Metadata } from "next";
import ECommerce from "../_components/Dashboard/E-commerce";
import DefaultLayout from "../_components/Layouts/DefaultLayout";



export const metadata: Metadata = {
  title:
    "Synergy It dashboard",
  description: "dashbaoard",
};

export default function Home() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
