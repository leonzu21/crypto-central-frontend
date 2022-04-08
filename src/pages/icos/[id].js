import IcoDetails from "src/components/ico/IcoDetails";
import { useState, useEffect } from "react";
import { icoService } from "src/services";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../components/dashboard-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const Ico = ({ userSession }) => {
  const router = useRouter();

  const icoId = router.query.id;
  const [ico, setIco] = useState(null);

  if (userSession)
    useEffect(() => {
      icoService
        .getById(icoId, userSession.session.accessToken)
        .then((x) => setIco(x));
    }, []);

  return <IcoDetails ico={ico} />;
};

Ico.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  // Get the user
  const userSession = await getServerSession(context, authOptions);

  return {
    props: {
      userSession,
    },
  };
}

export default Ico;
