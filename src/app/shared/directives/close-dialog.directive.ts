import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";

@Directive({
    selector: "[closeDialog]",
})
export class CloseDialogDirective {
    @Output("enterPressed") enterPressed = new EventEmitter();

    @HostListener('window:keydown.escape', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        this.enterPressed.emit();
    }
}