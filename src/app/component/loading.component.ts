import { Component, Input } from '@angular/core';
import { LoadingState } from '../constant/loading-state.model';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-overlay" *ngIf="isLoading === loadingState.LOADING">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class LoadingComponent {
  @Input() isLoading: LoadingState = LoadingState.NOT_LOADED;
  loadingState = LoadingState;
}
