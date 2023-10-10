import { formatNumber, localFormattedDate } from "helpers/index";
import useGetCategory from "hook/useDataTable/category/useGetCategory";
import useGetUsers from "hook/useDataTable/user/useGetUsers";

import { GenericItemType, HeaderType } from "types/Table.type";

function TdItem<T>({ header, item}: GenericItemType<T>) {
  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();
  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();

  const renderTdItem = (header: HeaderType<T>) => {
    switch (header.key) {
      case "category_id":
        return (
          categoryData?.find((cat) => cat.id === item[header.key])?.name ||
          item[header.key]
        );
      case "price":
      case "quantity":
        return formatNumber(Number(item[header.key]));
      case "last_op_id":
        return (
          usersData?.find((user) => user.id === item[header.key])?.name ||
          item[header.key]
        );
      case "created_timestamp":
      case "lastupdate_timestamp":
        return localFormattedDate(item[header.key] as Date);
      default:
        return String(item[header.key]);
    }
  };

  return (
    <td key={String(item[header.key])} className="td__normal_state">
      {String(renderTdItem(header))}
    </td>
  );
}

export default TdItem;
