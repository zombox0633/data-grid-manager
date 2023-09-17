import Timer from 'components/Timer'
import ProductsTable from 'components/table/product/ProductsTable'

function DataManagementPage() {
  return (
    <div className="mx-[5.5%] mt-[10%] xl:mt-[6%]">
      <Timer/>
      <div className=" flex justify-center">
      <ProductsTable/>
      </div>
    </div>
  )
}

export default DataManagementPage