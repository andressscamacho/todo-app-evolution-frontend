import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-app-evolution-frontend';

  constructor(private sessionService: SessionService,  private router: Router) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.sessionService.isSignedIn()) {
      this.router.navigate(['/tasks']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
