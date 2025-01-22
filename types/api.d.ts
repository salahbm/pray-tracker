export interface IResponseArray<T> {
  code: number;
  description: string;
  data: T[];
  msg: string;
}

export interface IResponse<T> {
  code: number;
  description: string;
  data: T;
  msg: string;
}

export interface PageAble {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface IResponsePaged<T> {
  code: number;
  data: {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: PageAble;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  };
}

export interface ErrorData {
  status: number;
  code: number;
  message: string;
  description: string;
}
