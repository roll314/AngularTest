import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserInterface } from '../../../../core/interfaces';
import { ApiService } from '../../../../core/services';

const LOADING_SKIP_TIMEOUT_MS = 100;
const CAN_SKIP_LOADING = true;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: IUserInterface;

  isLoading = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const userId: number = this.activatedRoute.snapshot.params['id'];

    let timer;
    if (CAN_SKIP_LOADING) {
      timer = setTimeout(() => this.isLoading = true, LOADING_SKIP_TIMEOUT_MS);
    } else {
      this.isLoading = true;
    }
    this.apiService.fetchUserById(userId).subscribe((user: IUserInterface) => {
      if (CAN_SKIP_LOADING) {
        clearTimeout(timer);
      }
      this.user = user;
      this.isLoading = false;
    });
  }

  back(): void {
    this.router.navigate(['./users']);
  }
}
