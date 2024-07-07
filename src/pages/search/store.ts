import { create } from "zustand";
import { RepoState } from "../../shared/api";

interface SearchRepo {
  currentUserRepo: RepoState[];
  value: string;
  perPage: number;
  currentPage: number;
  pagination: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  updateState: (newState: RepoState[]) => void;
  updatePage: (newPage: number) => void;
  updateValue: (newValue: string) => void;
  updatePagination: (newValue: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }) => void;
}

export const useSearchRepo = create<SearchRepo>()((set) => ({
  currentUserRepo: [],
  value: "",
  perPage: 10,
  currentPage: 1,
  pagination: {
    startCursor: "",
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
  },
  updateState: (newState) => set({ currentUserRepo: newState }),
  updatePage: (newPage) => set({ currentPage: newPage }),
  updateValue: (newValue) => set({ value: newValue }),
  updatePagination: (newValue) => set({ pagination: newValue }),
}));

export default useSearchRepo;
