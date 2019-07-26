import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUserInterface} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {IUsersListInfo} from '../interfaces/usersListInfo.interface';


const API_URL = 'https://reqres.in/api';

@Injectable()
export class ApiService {


  constructor(
    private http: HttpClient
  ) {}

  fetchUsers(page): Observable<IUsersListInfo> {
    return this.http.get<IUsersListInfo>(`${API_URL}/users`, {params: {page}});
  }

  fetchUserById(id: number): Observable<IUserInterface> {
    return this.http.get(`${API_URL}/users/${id}`).pipe(map((response: any): IUserInterface => response.data));
  }

}
