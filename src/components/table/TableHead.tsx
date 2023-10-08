import { HeaderType } from "types/Table.type";

type TableHeadType<T> = {
  headers: HeaderType<T>[];
  isManagement: boolean;
};

function TableHead<T>({ headers, isManagement }: TableHeadType<T>) {
  return (
    <thead className="bg-eerieBlack text-white text-left">
      <tr>
        {headers &&
          headers.map((header, index) => (
            <th key={index} className="thead">
              {header.label.charAt(0).toUpperCase() + header.label.slice(1)}
            </th>
          ))}
        {isManagement ? (
          <th className="bg-eerieBlack thead w-60">Management</th>
        ) : (
          <></>
        )}
      </tr>
    </thead>
  );
}

export default TableHead;
