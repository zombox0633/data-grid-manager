import { HeaderType } from "./Table";
import { formatNumber, localFormattedDate } from "helpers/index";
import useGetCategory from "hook/useDataTable/category/useGetCategory";
import useGetUsers from "hook/useDataTable/user/useGetUsers";

type TdItemType<T> = {
  header: HeaderType<T>;
  data: T;
};

function TdItem<T>({ header, data }: TdItemType<T>) {
  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();
  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();

  const renderTdItem = (header: HeaderType<T>) => {
    switch (header.key) {
      case "category_id":
        return (
          categoryData?.find((cat) => cat.id === data[header.key])?.name ||
          data[header.key]
        );
      case "price":
      case "quantity":
        return formatNumber(Number(data[header.key]));
      case "last_op_id":
        return (
          usersData?.find((user) => user.id === data[header.key])?.name ||
          data[header.key]
        );
      case "created_timestamp":
      case "lastupdate_timestamp":
        return localFormattedDate(data[header.key] as Date);
      default:
        return String(data[header.key]);
    }
  };

  return (
    <td key={String(data[header.key])} className="td__normal_state">
      {String(renderTdItem(header))}
    </td>
  );
}

export default TdItem;
