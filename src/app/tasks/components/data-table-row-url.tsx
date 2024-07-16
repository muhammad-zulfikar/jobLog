import React from "react";

export function DataTableRowURL({ row }: any) {
  return (
    <div className="flex">
      <a
        href={row.getValue("url")}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate max-w-[200px] md:max-w-[200px] font-medium overflow-hidden whitespace-nowrap hover:underline"
        style={{ textOverflow: "ellipsis" }}
      >
        {row.getValue("url")}
      </a>
    </div>
  );
};

export default DataTableRowURL;