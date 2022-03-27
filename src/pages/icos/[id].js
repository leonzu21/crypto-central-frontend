import { IcoDetails } from "src/components/ico";
import { icoService } from "src/services";
import { DashboardLayout } from "../../components/dashboard-layout";

export default IcoDetails;

export async function getServerSideProps({ params }) {
  const ico = await icoService.getById(params.id);

  return {
    props: { ico },
  };
}
IcoDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
