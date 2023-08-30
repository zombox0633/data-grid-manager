export type HeaderType<T> = {
  key: keyof T;
  label: string;
  action?: boolean;
};

export type TablePropsType<T> = {
  headers: HeaderType<T>[];
  data: T[];
  error: string | null;
};

function Table<T>({ headers, data, error }: TablePropsType<T>) {
  return (
    <table
      className={`${
        !data || data.length === 0 ? "h-[60vh]" : "h-auto"
      } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
    >
      <thead className="bg-eerieBlack text-white text-left">
        <tr>
          {headers &&
            headers.map((header, index) => (
              <th key={index} className="thead">
                {header.label.charAt(0).toUpperCase() + header.label.slice(1)}
              </th>
            ))}
          <th>Management</th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr className="">
            <td colSpan={headers.length} className="td__abnormal_state">
              Error loading : {error}
            </td>
          </tr>
        )}
        {!data && !error && (
          <tr>
            <td colSpan={headers.length} className="td__abnormal_state">
              Loading data...
            </td>
          </tr>
        )}
        {data && data.length === 0 && (
          <tr>
            <td colSpan={headers.length} className="td__abnormal_state">
              No items available
            </td>
          </tr>
        )}
        {data &&
          data.map((value, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={String(header.key)} className="td__normal_state">{String(value[header.key])}</td>
              ))}
              <td className="px-4 py-2 border border-eerieBlack">
                <button className="w-16 m-2  py-2 rounded-lg bg-yellow-300 font-semibold active:translate-y-[1px] disabled:bg-yellow-300/70">Edit</button>
                <button className="w-16 m-2 py-2 rounded-lg bg-red-500 font-semibold active:translate-y-[1px] disabled:bg-red-500/70">Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
