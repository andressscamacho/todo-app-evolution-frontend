import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.signout();
  }
}
