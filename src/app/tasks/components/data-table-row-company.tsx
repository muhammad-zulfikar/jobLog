export function DataTableRowCompany({ row }: any) {
  return (
    <div className="flex">
      <span
        className="truncate max-w-[200px] md:max-w-[300px] font-medium overflow-hidden whitespace-nowrap"
        style={{ textOverflow: "ellipsis" }}
      >
        {row.getValue("company")}
      </span>
    </div>
  );
}
