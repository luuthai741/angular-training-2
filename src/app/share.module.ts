import {NgModule} from '@angular/core';
import {TruncatePipe} from "./pipe/truncate.pipe";
import {MessageResponseComponent} from "./component/message-response.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [TruncatePipe, MessageResponseComponent],
    exports: [TruncatePipe, MessageResponseComponent],
    imports:[CommonModule]
})
export class ShareModule {
}