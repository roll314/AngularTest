import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {IUserInterface} from '../../../../core/interfaces';
import {ApiService} from '../../../../core/services';
import {IUsersListInfo} from '../../../../core/interfaces/usersListInfo.interface';
import {finalize, switchMap} from 'rxjs/operators';

const LOADING_SKIP_TIMEOUT_MS = 100;
const CAN_SKIP_LOADING = true;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: IUserInterface[] = [];
  pagesCount: number;
  pageIndex: number;
  pageSize: number;

  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.router.navigate(['./'], {queryParams: {page: 1}});

    this.activatedRoute.queryParams
      .pipe(
        switchMap(({page}) => {
          let timer;
          if (CAN_SKIP_LOADING) {
            timer = setTimeout(() => {
              this.isLoading = true;
            }, LOADING_SKIP_TIMEOUT_MS);
          } else {
            this.isLoading = true;
          }

          return this.apiService.fetchUsers(page)
            .pipe(finalize(() => {
              if (CAN_SKIP_LOADING) {
                clearTimeout(timer);
              }
              this.isLoading = false;
            }));
        })
      )
      .subscribe((listInfo: IUsersListInfo) => {
          this.userList = listInfo.data;
          this.setPaginationInfo(listInfo);
      });
  }

  pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.router.navigate(['./'], {queryParams: {page}});
  }

  userSelected(user: IUserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

  private setPaginationInfo(listInfo: IUsersListInfo) {
    this.pagesCount = listInfo.total_pages;
    this.pageSize = listInfo.per_page;
    this.pageIndex = listInfo.page - 1;
  }
}
