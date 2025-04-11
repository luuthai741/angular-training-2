import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TruncatePipe} from "./pipe/truncate.pipe"; // Đổi thành pipe của bạn

@NgModule({
    declarations: [TruncatePipe],
    exports: [TruncatePipe],
})
export class ShareModule { }