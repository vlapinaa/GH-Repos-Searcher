import { gql } from "@apollo/client";

export const GET_CURRENT_USER_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 100, orderBy: { field: NAME, direction: ASC }) {
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          name
          stargazers {
            totalCount
          }
          pushedAt
          url
          owner {
            login
          }
          id
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($owner: String!, $repository: String!) {
    repository(owner: $owner, name: $repository) {
      name
      stargazerCount
      pushedAt
      owner {
        login
        avatarUrl
      }
      languages(last: 100) {
        nodes {
          name
        }
      }
      description
      url
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories(
    $repository: String!
    $last: Int
    $first: Int
    $after: String
    $before: String
  ) {
    search(
      query: $repository
      type: REPOSITORY
      last: $last
      first: $first
      after: $after
      before: $before
    ) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            stargazers {
              totalCount
            }
            pushedAt
            url
            owner {
              login
            }
            id
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
