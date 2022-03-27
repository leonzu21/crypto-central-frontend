import IcoAddEdit from "src/components/ico/IcoAddEdit";
import { useState, useEffect } from "react";
import { icoService } from "src/services";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../../components/dashboard-layout";

const IcoEdit = () => {
  const router = useRouter();

  const icoId = router.query.id;
  const [ico, setIco] = useState(null);

  useEffect(() => {
    icoService.getById(icoId).then((x) => setIco(x));
  }, []);

  let icoAddEdit = null;

  if (ico) icoAddEdit = <IcoAddEdit ico={ico} />;

  return icoAddEdit;
};

IcoEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default IcoEdit;
