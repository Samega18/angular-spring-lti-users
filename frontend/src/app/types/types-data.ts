export type Role = {
  id: number,
  name: string,
}

export type User = {
  id?: number | null;
  name: string,
  username: string,
  password?: string | null,
  roles: Role[] | null,
};

export type UserPage = {
    content: User[],
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean,
};
