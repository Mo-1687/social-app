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
        <div className="card-enhanced p-6 rounded-2xl animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            {/* Previous Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground interactive-hover"
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isLoading}
            >
              <FaChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
              {/* Show first page if not in visible range */}
              {getPaginationNumbers()[0] > 1 && (
                <>
                  <button
                    className="w-10 h-10 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground interactive-hover"
                    onClick={() => handlePageClick(1)}
                    disabled={isLoading}
                  >
                    1
                  </button>
                  {getPaginationNumbers()[0] > 2 && (
                    <span className="text-muted-foreground px-2">•••</span>
                  )}
                </>
              )}

              {/* Show pagination numbers */}
              {getPaginationNumbers().map((pageNumber) => {
                return (
                  <button
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed interactive-hover ${
                      pageNumber === currentPage
                        ? "gradient-primary text-primary-foreground shadow-elegant"
                        : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
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
                    <span className="text-muted-foreground px-2">•••</span>
                  )}
                  <button
                    className="w-10 h-10 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground interactive-hover"
                    onClick={() => handlePageClick(totalPages)}
                    disabled={isLoading}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground interactive-hover"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
            >
              <span>Next</span>
              <FaChevronRight size={16} />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} • {totalPosts} total posts
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
