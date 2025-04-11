import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-list-errors',
  template: `
    <div *ngIf="error !== ''">
      <div class="text-danger m-2" >{{error | titlecase}}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  error: string = '';
  @Input('errors') set errors(err: string) {
    if (err !== null) {
      this.error = err;
    }
  }
}
