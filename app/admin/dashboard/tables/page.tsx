import Breadcrumb from "../../_components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../_components/Layouts/DefaultLayout";
import TableOne from "../../_components/Tables/TableOne";
import TableThree from "../../_components/Tables/TableThree";
import TableTwo from "../../_components/Tables/TableTwo";



const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
