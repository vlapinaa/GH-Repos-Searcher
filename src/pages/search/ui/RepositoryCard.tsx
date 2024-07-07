import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { AiFillGithub } from "react-icons/ai";

interface RepositoryCardProps {
  login: string;
  name: string;
  url: string;
  pushedAt: string;
  stargazers: number;
}

function RepositoryCard({
  login,
  name,
  url,
  pushedAt,
  stargazers,
}: RepositoryCardProps) {
  return (
    <div className="flex justify-between bg-neutral-600 shadow-md rounded-xl px-6 py-4 ">
      <div>
        <Link to={`/${login}/${name}`}>
          <h4 className=" text-white text-2xl font-medium mb-2 poppins-semibold  hover:text-fuchsia-400">
            {login} / {name}
          </h4>
        </Link>
        <p className="flex items-center space-x-2 poppins-regular text-sm  text-neutral-300 hover:text-fuchsia-400">
          <AiFillGithub className="w-6 h-6" />
          <a href={url}>{url}</a>
        </p>

        <p className="poppins-regular text-sm text-neutral-400 mt-4">
          Updated on {dayjs(pushedAt).format("D MMMM")}
        </p>
      </div>

      <div className=" text-white flex justify-center">
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
        <p className="star-container__count">{stargazers}</p>
      </div>
    </div>
  );
}

export default RepositoryCard;
