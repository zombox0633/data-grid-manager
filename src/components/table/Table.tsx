import { useEffect } from "react";
import { useAtom } from "jotai";

import TableHead from "./TableHead";
import TableStateRow from "./TableStateRow";

import { loadingAtom } from "atoms/loadingAtom";
import TdItem from "./TdItem";

export type HeaderType<T> = {
  key: keyof T;
  label: string;
  editable: boolean;
};

export type TablePropsType<T> = {
  headers: HeaderType<T>[];
  data: T[];
  error: string | null;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};

function Table<T>({ headers, data, error }: TablePropsType<T>) {
  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [setIsOpen]);

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
                    data={value}
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
