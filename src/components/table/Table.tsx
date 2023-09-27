import { useEffect } from "react";
import { useAtom } from "jotai";

import TableHead from "./TableHead";
import TableStateRow from "./TableStateRow";

import { loadingAtom } from "atoms/loadingAtom";

export type HeaderType<T> = {
  key: keyof T;
  label: string;
  editable: boolean;
};

export type TablePropsType<T> = {
  nameTable: string;
  headers: HeaderType<T>[];
  data: T[];
  error: string | null;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};

function Table<T>({ nameTable, headers, data, error }: TablePropsType<T>) {
  const itemLength = data?.length;

  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);
    if (data) {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
    return () => {
      setIsOpen(false);
    };
  }, [data, setIsOpen]);

  return (
    <div>
      <div className=" flex flex-row items-end m-4">
        <h4 className="mr-2">{nameTable}</h4>
        <span className=" font-semibold">
          Total item available {itemLength}
        </span>
      </div>
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
                  <td key={String(header.key)} className="td__normal_state">
                    {String(value[header.key])}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
