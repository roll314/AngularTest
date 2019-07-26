import {IUserInterface} from './userInterface';

export interface IUsersListInfo {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUserInterface[];
}
