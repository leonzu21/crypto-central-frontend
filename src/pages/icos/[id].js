import IcoDetails from "src/components/ico/IcoDetails";
import { useState, useEffect } from "react";
import { icoService } from "src/services";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../components/dashboard-layout";

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
export default Ico;
