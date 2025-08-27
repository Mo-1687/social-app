import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({
  setCurrentPage,
  totalPosts,
  currentPage,
  isLoading,
  postsPerPage,
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo(0, 0);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Generate pagination numbers with smart truncation
  const getPaginationNumbers = () => {
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      {/* Pagination - Only show if we have multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            className="btn border-gray-600 bg-[#09090B] hover:custom-bg flex items-center space-x-1 disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
          >
            <FaChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-1">
            {/* Show first page if not in visible range */}
            {getPaginationNumbers()[0] > 1 && (
              <>
                <button
                  className=" bg-[#27272A] btn outline border-none outline-none hover:custom-bg disabled:opacity-50"
                  onClick={() => handlePageClick(1)}
                  disabled={isLoading}
                >
                  1
                </button>
                {getPaginationNumbers()[0] > 2 && (
                  <span className="text-gray-400 px-2">...</span>
                )}
              </>
            )}

            {/* Show pagination numbers */}
            {getPaginationNumbers().map((pageNumber) => {
              return (
                <button
                  className={`btn ${
                    pageNumber === currentPage
                      ? "custom-bg"
                      : "bg-[#27272A] btn outline"
                  } border-none outline-none hover:bg-primary disabled:opacity-50`}
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  disabled={isLoading}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Show last page if not in visible range */}
            {getPaginationNumbers()[getPaginationNumbers().length - 1] <
              totalPages && (
              <>
                {getPaginationNumbers()[getPaginationNumbers().length - 1] <
                  totalPages - 1 && (
                  <span className="text-gray-400 px-2">...</span>
                )}
                <button
                  className="btn bg-[#27272A]  outline border-none outline-none hover:bg-primary disabled:opacity-50"
                  onClick={() => handlePageClick(totalPages)}
                  disabled={isLoading}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            className="btn bg-[#09090B] hover:bg-primary border-gray-600 flex items-center space-x-1 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
          >
            <span>Next</span>
            <FaChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
