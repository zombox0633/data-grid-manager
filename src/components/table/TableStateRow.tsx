type TableStateRowType = {
  status: "error" | "loading" | "empty";
  error?: string;
  colSpan: number;
};

function TableStateRow({ status, error, colSpan }: TableStateRowType) {
  let message = "";
  switch (status) {
    case "error":
      message = `Error loading: ${error}`;
      break;
    case "loading":
      message = "Loading data...";
      break;
    case "empty":
      message = "No items available";
      break;
  }
  return (
    <tr>
      <td colSpan={colSpan} className="td__abnormal_state">
        {message}
      </td>
    </tr>
  );
}

export default TableStateRow;
