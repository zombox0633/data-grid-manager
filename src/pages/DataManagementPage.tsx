import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";
import ProductsManagement from "components/table/product/ProductsManagement";
import ProductsTable from "components/table/product/ProductsTable";
import CategoryManagement from "components/table/category/CategoryManagement";
import CategoryTable from "components/table/category/CategoryTable";
import UsersManagement from "components/table/user/UsersManagement";
import UsersTable from "components/table/user/UsersTable";
import Timer from "components/Timer";

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
      if (register?.data.role === "admin" || register?.data.role === "dev") {
        table = <ProductsManagement />;
      } else if (register?.data.role === "user") {
        table = <ProductsTable />;
      } else {
        table = <Navigate to={"/"} replace />;
      }
      break;
    case "/data-management/category":
      if (register?.data.role === "admin" || register?.data.role === "dev") {
        table = <CategoryManagement />;
      } else if (register?.data.role === "user") {
        table = <CategoryTable />;
      } else {
        table = <Navigate to={"/"} replace />;
      }
      break;
    case "/data-management/users":
      if (register?.data.role === "admin") {
        table = <UsersManagement />;
      } else if (register?.data.role === "dev") {
        table = <UsersTable />;
      } else {
        table = <Navigate to={"/"} replace />;
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
