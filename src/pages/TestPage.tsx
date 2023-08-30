import Timer from "components/Timer";
import ProductsTable from "components/table/ProductsTable";

function TestPage() {
  return (
    <div className="mx-[5.5%] mt-[10%] xl:mt-[6%]">
      <Timer/>
      <div className=" flex justify-center">
      <ProductsTable/>
      </div>
    </div>
  );
}

export default TestPage;
