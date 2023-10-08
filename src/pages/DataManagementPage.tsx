import { useEffect } from "react";
import { useAtom } from "jotai";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Timer from "components/Timer";
import ProductsManagement from "components/table/management/ProductsManagement";
import ProductsTable from "components/table/dataTable/ProductsTable";

import { registerAtom } from "atoms/registerAtom";
import CategoryTable from "components/table/dataTable/CategoryTable";
import UsersTable from "components/table/dataTable/UsersTable";

function DataManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [register] = useAtom(registerAtom);

  useEffect(() => {
    if (location.pathname === "/data-management") {
      navigate("/data-management/products");
    }
  }, [location, navigate]);

  let table;
  switch (location.pathname) {
    case "/data-management/products":
      table =
        register?.data.role === "admin" ? (
          <ProductsManagement />
        ) : (
          <ProductsTable />
        );
      break;
    case "/data-management/category":
      table =
        register?.data.role === "admin" ? <CategoryTable /> : <CategoryTable />;
      break;
    case "/data-management/users":
      if (register?.data.role === "admin") {
        table = <UsersTable />;
      } else if (register?.data.role === "dev") {
        table = <UsersTable />;
      } else {
        <Navigate to={"/"} replace />;
      }
      break;
    default:
      table = null;
  }

  return (
    <div className="mx-[5.5%] mt-[10%] xl:mt-[6%]">
      <Timer />
      <div className="flex justify-center">{table}</div>
    </div>
  );
}

export default DataManagementPage;
