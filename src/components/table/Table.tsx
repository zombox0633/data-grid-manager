import TableHead from "./TableHead";
import TableStateRow from "./TableStateRow";
import TdItem from "./TdItem";
import useLoadingDefault from "hook/useLoadingDefault";

import { HeaderType } from "types/Table.type";

export type TablePropsType<T> = {
  headers: HeaderType<T>[];
  data: T[];
  error: string | null;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};

function Table<T>({ headers, data, error }: TablePropsType<T>) {
  useLoadingDefault();

  return (
    <div>
      <table
        className={`${
          !data || data.length === 0 ? "h-[60vh]" : "h-auto"
        } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
      >
        <TableHead headers={headers} isManagement={false} />
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
                  <TdItem<T>
                    key={String(value[header.key])}
                    header={header}
                    item={value}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
