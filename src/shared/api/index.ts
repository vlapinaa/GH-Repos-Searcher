export interface RepoState {
  id: string;
  name: string;
  owner: {
    avatarUrl: string;
    login: string;
  };
  pushedAt: string;
  stargazers: {
    totalCount: number;
  };
  url: string;
}
