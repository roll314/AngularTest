import { Component, Input, OnInit, Optional } from '@angular/core';
import { IUserInterface } from '../../../../core/interfaces';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  @Input() user: IUserInterface;
}
