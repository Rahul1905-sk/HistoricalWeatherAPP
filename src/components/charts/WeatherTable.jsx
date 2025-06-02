import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export const WeatherTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dailyData = data?.daily;
  const totalRows = dailyData?.time?.length || 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2) return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
  }, [currentPage, totalPages]);

  if (!dailyData || !dailyData.time) {
    return <div className="text-center py-6 text-gray-500">No data available to display</div>;
  }

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {endIndex} of {totalRows} days
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 20, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                'Date',
                'Max Temp (°C)',
                'Min Temp (°C)',
                'Mean Temp (°C)',
                'Max Apparent (°C)',
                'Min Apparent (°C)',
                'Mean Apparent (°C)',
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dailyData.time.slice(startIndex, endIndex).map((time, index) => {
              const i = startIndex + index;

              const renderCell = (value, color) => {
                console.log('123',{value,color})
                const isValid = typeof value === 'number' && !isNaN(value);
                console.log('123',{isValid})
                return (
                  <td className={`px-6 py-4 text-sm ${isValid ? `text-${color}-600` : 'text-black'}`}>
                    {isValid ? value.toFixed(1) : 'N/A'}
                  </td>
                );
              };

              return (
                <tr key={time} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatDate(time)}
                  </td>
                  {renderCell(dailyData.temperature_2m_max[i], 'red')}
                  {renderCell(dailyData.temperature_2m_min[i], 'blue')}
                  {renderCell(dailyData.temperature_2m_mean[i], 'green')}
                  {renderCell(dailyData.apparent_temperature_max[i], 'red')}
                  {renderCell(dailyData.apparent_temperature_min[i], 'blue')}
                  {renderCell(dailyData.apparent_temperature_mean[i], 'green')}
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="sm:flex sm:items-center sm:justify-between w-full">
          <p className="text-sm text-gray-700 mb-2 sm:mb-0">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronsLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center px-2 py-2 border bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === pageNum
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-2 py-2 border bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronsRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
