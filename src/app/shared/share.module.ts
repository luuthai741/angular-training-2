import {NgModule} from '@angular/core';

import {TruncatePipe} from "./pipes/truncate.pipe";
import {MessageResponseComponent} from "./components/message-response.component";
import {CommonModule} from "@angular/common";
import {NumberInputDirective} from "./directives/only-number-input.directive";
import {LoadingComponent} from "./components/loading.component";

@NgModule({
    declarations: [TruncatePipe, MessageResponseComponent, NumberInputDirective, LoadingComponent],
    exports: [TruncatePipe, MessageResponseComponent, NumberInputDirective, CommonModule, LoadingComponent],
    imports: [CommonModule],
})
export class ShareModule {
}