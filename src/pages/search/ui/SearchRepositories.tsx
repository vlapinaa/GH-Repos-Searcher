import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_CURRENT_USER_REPOSITORIES,
  SEARCH_REPOSITORIES,
} from "shared/api/querry";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import useSearchRepos from "../store";
import RepositoryCard from "./RepositoryCard";
import { RepoState } from "../../../shared/api";
import Pagination from "./Pagination";

function SearchRepositories() {
  const currentUserRepositories = useSearchRepos(
    (state) => state.currentUserRepo,
  );

  const searchText = useSearchRepos((state) => state.value);
  const perPage = useSearchRepos((state) => state.perPage);
  const updateSearchText = useSearchRepos((state) => state.updateValue);
  const setCurrentUserRepositories = useSearchRepos(
    (state) => state.updateState,
  );

  const paginationState = useSearchRepos((state) => state.pagination);
  const setPagination = useSearchRepos((state) => state.updatePagination);

  const currentPage = useSearchRepos((state) => state.currentPage);
  const updatePage = useSearchRepos((state) => state.updatePage);

  const [repositories, setStateRepositories] = useState<RepoState[]>([]);

  const [
    seacrhRepositories,
    { loading: searchLoading, error: searchError, data: searchData },
  ] = useLazyQuery(SEARCH_REPOSITORIES);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seacrhRepositoriesDebounced = useCallback(
    debounce(seacrhRepositories, 500),
    [],
  );

  const [
    fetchCurrentUserRepositories,
    {
      loading: userRepositoriesLoading,
      error: userRepositoriesError,
      data: userRepositoriesData,
    },
  ] = useLazyQuery(GET_CURRENT_USER_REPOSITORIES);

  const [searchParams, setSearchParams] = useSearchParams();

  const parseSearchRepositories = (data: any) => {
    return data.search.edges.map(({ node }: { node: RepoState }) => node);
  };

  const convertPageToCursor = (page: number, pageQnt: number) => {
    const startCursor = `cursor:${pageQnt * (page - 1) + 1}`;
    return btoa(String(startCursor));
  };

  useEffect(() => {
    const searchParamsInput = searchParams.get("input");
    const searchParamsPage = searchParams.get("page");
    const startCursorParams = convertPageToCursor(
      Number(searchParamsPage),
      perPage,
    );

    if (
      searchParamsInput &&
      searchParamsPage &&
      !searchText &&
      !paginationState.startCursor &&
      !paginationState.endCursor
    ) {
      updateSearchText(searchParamsInput);
      updatePage(Number(searchParamsPage));

      setPagination({
        ...paginationState,
        startCursor: startCursorParams,
      });
    }
  }, [
    searchText,
    paginationState,
    searchParams,
    setPagination,
    updateSearchText,
    perPage,
    setSearchParams,
    currentPage,
    updatePage,
  ]);

  useEffect(() => {
    if (!searchText) {
      setSearchParams();
      return;
    }

    const searchParamsPage = searchParams.get("page");

    if (searchParamsPage) {
      setSearchParams({
        input: searchText,
        page: searchParamsPage,
      });
    }
  }, [searchText, setSearchParams, searchParams, currentPage]);

  useEffect(() => {
    fetchCurrentUserRepositories();

    if (userRepositoriesData) {
      setCurrentUserRepositories(
        userRepositoriesData.viewer.repositories.nodes,
      );
    }
  }, [
    fetchCurrentUserRepositories,
    userRepositoriesData,
    setCurrentUserRepositories,
  ]);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    const startCursor = convertPageToCursor(
      Number(searchParams.get("page")),
      perPage,
    );

    seacrhRepositoriesDebounced({
      variables: {
        repository: `${searchText} in:name`,
        after: startCursor,
        first: perPage,
      },
    });
  }, [searchText, seacrhRepositoriesDebounced, searchParams, perPage]);

  useEffect(() => {
    if (!searchData || !searchText) {
      return;
    }

    setPagination(searchData.search.pageInfo);
  }, [searchData, searchParams, searchText, setPagination]);

  useEffect(() => {
    if (searchText && searchData) {
      setStateRepositories(parseSearchRepositories(searchData));
    } else {
      setStateRepositories(currentUserRepositories);
    }
  }, [searchData, searchText, currentUserRepositories]);

  if ((searchLoading && searchText) || userRepositoriesLoading)
    return (
      <div className="w-full flex justify-center">
        <p className="text-white text-2xl poppins-bold">Loading...</p>
      </div>
    );

  if (searchError || userRepositoriesError)
    return (
      <div className="w-full flex justify-center">
        <p className="text-white text-2xl poppins-bold">
          Error : {searchError?.message || userRepositoriesError?.message}
        </p>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {repositories.map(({ owner, name, id, url, pushedAt, stargazers }) => (
          <RepositoryCard
            key={id}
            login={owner.login}
            name={name}
            url={url}
            pushedAt={pushedAt}
            stargazers={stargazers.totalCount}
          />
        ))}
      </div>

      {searchData && (
        <Pagination elementsQnt={Number(searchData.search.repositoryCount)} />
      )}
    </>
  );
}

export default SearchRepositories;
