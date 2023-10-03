import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "components/Timer";
import ProductsManagement from "components/table/productManagement/ProductsManagement";
import ProductsTable from "components/table/dataTable/ProductsTable";

import { registerAtom } from "atoms/registerAtom";
import CategoryTable from "components/table/dataTable/CategoryTable";

export type TableDisplayConfig = {
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
};

function DataManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [register] = useAtom(registerAtom);

  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/data-management") {
      navigate("/data-management/products");
    }
  }, [location, navigate]);

  let table;
  switch (location.pathname) {
    case "/data-management/products":
      table =
        register?.data.role === "user" ? (
          <ProductsTable />
        ) : (
          <ProductsManagement showAll={showAll} setShowAll={setShowAll} />
        );
      break;
    case "/data-management/category":
      table = register?.data.role === "user" ? <CategoryTable /> : null;
      break;
    default:
      table = null;
  }

  return (
    <div className="mx-[5.5%] mt-[10%] xl:mt-[6%]">
      <Timer />
      <div className=" flex justify-center">{table}</div>
    </div>
  );
}

export default DataManagementPage;
