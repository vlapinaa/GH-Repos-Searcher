import React from "react";
import SearchRepositories from "./ui/SearchRepositories";
import useSearchRepos from "./store";

function App() {
  const setInputValue = useSearchRepos((state) => state.updateValue);
  const inputValue = useSearchRepos((state) => state.value);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="h-full">
      <h1 className="text-3xl text-fuchsia-400 uppercase font-semibold text-center mb-6">
        GITHUB REPO SEARCH
      </h1>

      <input
        type="text"
        className="w-full px-4 py-3 rounded-full outline-4 focus:outline outline-fuchsia-400 bg-neutral-700 text-white duration-200"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />

      <div className="w-full flex justify-center my-10">
        <div className=" w-40 h-1 bg-neutral-600 rounded-full" />
      </div>

      <SearchRepositories />
    </div>
  );
}

export default App;
