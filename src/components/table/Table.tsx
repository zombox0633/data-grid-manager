import TableHead from "./TableHead";
import TableStateRow from "./TableStateRow";

export type HeaderType<T> = {
  key: keyof T;
  label: string;
  action?: boolean;
};

export type TablePropsType<T> = {
  headers: HeaderType<T>[];
  data: T[];
  error: string | null;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};

function Table<T>({
  headers,
  data,
  error,
}: TablePropsType<T>) {
  return (
    <table
      className={`${
        !data || data.length === 0 ? "h-[60vh]" : "h-auto"
      } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
    >
      <TableHead headers={headers} />
      <tbody>
        {error && (
          <TableStateRow
            status="error"
            error={error}
            colSpan={headers.length}
          />
        )}
        {!data && !error && (
          <TableStateRow status="loading" colSpan={headers.length} />
        )}
        {data && data.length === 0 && !error && (
          <TableStateRow status="empty" colSpan={headers.length} />
        )}
        {data &&
          data.map((value, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={String(header.key)} className="td__normal_state">
                  {String(value[header.key])}
                </td>
              ))}
              <td className="px-4 py-2 border border-eerieBlack">
                <button
                  className="w-16 m-2  py-2 rounded-lg bg-yellow-300 font-semibold active:translate-y-[1px] disabled:bg-yellow-300/70"
                >
                  Edit
                </button>
                <button
                  className="w-16 m-2 py-2 rounded-lg bg-red-500 font-semibold active:translate-y-[1px] disabled:bg-red-500/70"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
