import IcoAddEdit from "src/components/ico/IcoAddEdit";
import { DashboardLayout } from "../../components/dashboard-layout";

const IcoAdd = () => {
  return <IcoAddEdit/>;
};

IcoAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default IcoAdd;
