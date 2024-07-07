import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "shared/api/querry";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

function PageRepo() {
  const location = useLocation();
  const variables = location.pathname.slice(1).split("/");

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: {
      owner: variables[0],
      repository: variables[1],
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="bg-neutral-700 rounded-2xl p-10">
      <div className="flex justify-between items-start mb-5">
        <div className="">
          <h4 className=" text-fuchsia-400 text-3xl font-medium mb-2 poppins-semibold  hover:text-fuchsia-600">
            {data.repository.name}
          </h4>
          <p className="poppins-regular text-sm text-neutral-400 mt-1">
            Updated on {dayjs(data.repository.pushedAt).format("D MMMM")}
          </p>
        </div>
        <div className="flex text-white items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <p className="card-star-container__count">
            {data.repository.stargazerCount}
          </p>
        </div>
      </div>
      <div className="flex mb-5">
        <img
          src={data.repository.owner.avatarUrl}
          alt=""
          className="rounded-full w-16 h-16 mr-4"
        />
        <a
          href={data.repository.url}
          className="text-white poppins-regular text-lg hover:text-fuchsia-600"
          target="_blank"
          rel="noreferrer"
        >
          {data.repository.owner.login}
        </a>
      </div>
      <div>
        <p className="text-neutral-400 poppins-regular text-lg">
          Description repository:
        </p>
        <p className="text-neutral-400 poppins-light text-sm">
          {data.repository.description}
        </p>
      </div>
      <div className="flex flex-wrap">
        {data.repository.languages.nodes.map(({ name }: any) => (
          <div className="text-white rounded-3xl bg-neutral-600 py-2 px-4 mr-4 mt-4">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageRepo;
