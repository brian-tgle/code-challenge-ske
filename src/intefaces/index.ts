/* eslint-disable camelcase */
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
  avatar_url: string;
  login: string;
  type: string;
  score: number;
}

export interface UserListResponse {
  items: UserItem[];
  total_count: number;
}

export interface TableLoadingProps {
  colSpan: number;
}

export interface UnavailableItems {
  startPx: number;
  endPx: number;
}

export interface AlertProps {
  type: string;
  message: string;
  position?: string;
}
