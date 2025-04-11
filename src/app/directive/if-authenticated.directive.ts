import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../service/token.service';

@Directive({
  selector: '[ifAuthenticated]',
})
export class IfAuthenticatedDirective<T> {
  constructor(
    private tokenService: TokenService,
    private templateRef: TemplateRef<T>,
    private viewContainer: ViewContainerRef
  ) {}
  condition: boolean = false;
  @Input() set ifAuthenticated(condition: boolean) {
    this.condition = condition;
  }
  ngOnInit() {
    if (this.tokenService.getCurrentUser() !== null && this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (this.tokenService.getCurrentUser() === null && !this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
