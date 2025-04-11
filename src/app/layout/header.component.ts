import { Component } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private tokenService: TokenService, private router: Router) {}
}

