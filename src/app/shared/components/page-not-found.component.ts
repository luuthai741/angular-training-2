import { Component } from '@angular/core';

@Component({
    selector: 'app-pages-not-found',
    template: `
    <div style="text-align: center; margin-top: 100px;">
      <h2 style="color: #d9534f;">404 - NOT FOUND</h2>
      <p>We're not found your destination</p>
      <a routerLink="/" style="margin-top: 20px; display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Back to Home
      </a>
    </div>
  `,
})
export class PageNotFoundComponent {}
