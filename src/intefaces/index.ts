export type FnType = (param?: object) => void

export interface AnyObject {
  [key: string]: any;
}

export interface LazyImageProps {
  placeHolder: string;
  src: string;
  width: number;
  height: string | number;
  alt: string;
  keepRatio: boolean;
}

export interface UserItem {
  id: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
  login: string;
  type: string;
  score: number;
}

export interface UserListResponse {
  items: UserItem[];
}

export interface TableLoadingProps {
  colSpan: number;
}
