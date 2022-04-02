import IcoDetails from "src/components/ico/IcoDetails";
import { useState, useEffect } from "react";
import { icoService } from "src/services";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../components/dashboard-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const Ico = () => {
  const router = useRouter();

  const icoId = router.query.id;
  const [ico, setIco] = useState(null);

  useEffect(() => {
    icoService.getById(icoId).then((x) => setIco(x));
  }, []);

  return <IcoDetails ico={ico} />;
};

Ico.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

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

export default Ico;
