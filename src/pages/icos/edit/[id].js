import { AddEdit } from "src/components/ico";
import { icoService } from "src/services";
import { DashboardLayout } from "../../components/dashboard-layout";

export default AddEdit;

export async function getServerSideProps({ params }) {
  const ico = await icoService.getById(params.id);

  return {
    props: { ico },
  };
}
AddEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
