import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-signup',
  templateUrl: './dialog-signup.component.html',
  styleUrls: ['./dialog-signup.component.sass'],
})
export class DialogSignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<DialogSignupComponent>
  ) {}

  ngOnInit(): void {}

  register() {
    this.sessionService
      .signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      ).subscribe(_ => {
        this.dialogRef.close();
      });
  }
}
