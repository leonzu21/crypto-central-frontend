import IcoAddEdit from "src/components/ico/IcoAddEdit";
import { DashboardLayout } from "../../components/dashboard-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const IcoAdd = ({ userSession }) => {
  return <IcoAddEdit userSession={userSession} />;
};

IcoAdd.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  // Get the user
  const userSession = await getServerSession(context, authOptions);

  return {
    props: {
      userSession,
    },
  };
}

export default IcoAdd;
