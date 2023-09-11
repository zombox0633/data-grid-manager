import { HeaderType } from "./Table";

type TableHeadType<T> = {
  headers: HeaderType<T>[];
};

function TableHead<T>({ headers }: TableHeadType<T>) {
  return (
    <thead className="bg-eerieBlack text-white text-left">
      <tr>
        {headers &&
          headers.map((header, index) => (
            <th key={index} className="thead">
              {header.label.charAt(0).toUpperCase() + header.label.slice(1)}
            </th>
          ))}
        <th className="thead w-60">Management</th>
      </tr>
    </thead>
  );
}

export default TableHead;
