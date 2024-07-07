import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import useSearchRepos from "../store";

function Pagination({ elementsQnt }: { elementsQnt: number }) {
  const [pagesQnt, setPagesQnt] = useState(0);
  const [pagination, setPagination] = useState<(string | number)[]>([]);
  const [searchParams] = useSearchParams();

  const searchText = useSearchRepos((state) => state.value);
  const currentPage = useSearchRepos((state) => state.currentPage);
  const setCurrentPage = useSearchRepos((state) => state.updatePage);

  function calculatePagination(
    curPage: number,
    total: number,
    onSides: number = 1,
  ) {
    const pages = [];

    for (let i = 1; i <= total; i += 1) {
      const offset = i === 1 || total ? onSides + 1 : onSides;

      if (
        i === 1 ||
        (curPage - offset <= i && curPage + offset >= i) ||
        i === curPage ||
        i === total
      ) {
        pages.push(i);
      } else if (i === curPage - (offset + 1) || i === curPage + (offset + 1)) {
        pages.push("...");
      }
    }
    return pages;
  }
  useEffect(() => {
    const searchParamsPage = searchParams.get("page");
    if (!searchParamsPage) {
      return;
    }
    setCurrentPage(Number(searchParamsPage));
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    setPagesQnt(Math.round(elementsQnt / 10));
  }, [elementsQnt]);

  useEffect(() => {
    const calculatedPagination = calculatePagination(currentPage, pagesQnt);
    setPagination(calculatedPagination);
  }, [currentPage, pagesQnt]);

  return (
    <div className="flex justify-center space-x-3 my-6">
      {pagination.map((page, index) => {
        return typeof page === "string" ? (
          <div
            key={`${index}-${page}`}
            className="flex items-end text-white px-4"
          >
            <BsThreeDots />
          </div>
        ) : (
          <Link
            to={{ pathname: "/", search: `input=${searchText}&page=${page}` }}
            className={` text-white rounded-2xl px-4 py-2  ${currentPage === page ? "bg-fuchsia-400" : "bg-neutral-700 hover:bg-neutral-900"}`}
            key={page}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}

export default Pagination;
