"use client";
import React, { useState } from "react";

interface Column {
  header: string;
  accessor: string;
}

interface TableWithPaginationProps {
  data: Array<{ [key: string]: any }>;
  columns: Column[];
  itemsPerPage?: number;
}

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  data,
  columns,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>{item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="btn-group mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableWithPagination;
