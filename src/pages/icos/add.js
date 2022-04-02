import IcoAddEdit from "src/components/ico/IcoAddEdit";
import { DashboardLayout } from "../../components/dashboard-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const IcoAdd = () => {
  return <IcoAddEdit />;
};

IcoAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  // Get the user
  const { res } = context;
  res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
  const userSession = await getServerSession(context, authOptions);

  return {
    props: {
      userSession,
    },
  };
}

export default IcoAdd;
