import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private sessionService: SessionService, private dialogManager: MatDialog) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | boolean;

  login() {
    this.sessionService
      .signin(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((_) => {});
  }

  openRegisterDialog() {
    this.dialogManager.open(DialogSignupComponent, {
      width: '400px'
    });
  }

  ngOnInit(): void {}
}
