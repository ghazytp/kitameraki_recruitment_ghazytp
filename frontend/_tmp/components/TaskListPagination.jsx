import { Icon } from "@fluentui/react/lib/Icon";

export default function TaskListPagination({
  totalPageNum,
  fetchTasksData,
  pageNum,
}) {
  const maxVisiblePages = 5;
  const showPrevButton = pageNum > 1;
  const showNextButton = pageNum < totalPageNum.length;

  // Calculate the start and end of the visible page numbers
  let startIdx = Math.max(pageNum - Math.floor(maxVisiblePages / 2), 1);
  let endIdx = Math.min(startIdx + maxVisiblePages - 1, totalPageNum.length);

  if (endIdx - startIdx < maxVisiblePages - 1) {
    // Adjust the start index to keep the maximum number of visible pages
    startIdx = Math.max(endIdx - maxVisiblePages + 1, 1);
  }

  return (
    <div className="flex items-center justify-center mx-auto w-full mt-4">
      {showPrevButton && (
        <div
          onClick={(e) => {
            e.preventDefault();
            fetchTasksData(pageNum - 1);
          }}
          className="w-6 h-6 rounded-sm flex items-center justify-center mx-0.5 cursor-pointer"
        >
          <Icon iconName="ChevronLeftSmall" />
        </div>
      )}

      {totalPageNum.slice(startIdx - 1, endIdx).map((page) => {
        // Show different page numbers if page is more than 5
        // const displayPage = pageNum > maxVisiblePages ? pageNum + (page - maxVisiblePages) : page;
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchTasksData(page);
            }}
            key={page}
            className={
              page === pageNum
                ? "border-2 border-black w-6 h-6 rounded-sm flex items-center justify-center mx-0.5 bg-yellow-200 "
                : "border-2 border-black w-6 h-6 rounded-sm flex items-center justify-center mx-0.5 hover:bg-yellow-200"
            }
          >
            <p className="text-sm font-semibold transition-all duration-200">
              {page}
            </p>
          </button>
        );
      })}

      {showNextButton && (
        <div
          onClick={(e) => {
            e.preventDefault();
            fetchTasksData(pageNum + 1);
          }}
          className="w-6 h-6 rounded-sm flex items-center justify-center mx-0.5 cursor-pointer"
        >
          <Icon iconName="ChevronRightSmall" />
        </div>
      )}
    </div>
  );
}
