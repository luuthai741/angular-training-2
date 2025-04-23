import {NgModule} from '@angular/core';

import {TruncatePipe} from "./pipes/truncate.pipe";
import {MessageResponseComponent} from "./components/message-response.component";
import {CommonModule} from "@angular/common";
import {NumberInputDirective} from "./directives/only-number-input.directive";
import {LoadingComponent} from "./components/loading.component";
import {RequiredMarkDirective} from "./directives/required-mark.directive";
import {UsernameExistingDirective} from "./directives/username-existing.directive";
import {ConfirmPasswordDirective} from "./directives/confirm-password.directive";
import {AutoFocusDirective} from "./directives/auto-focus.directive";
import {CommonDialogComponent} from "./components/common-dialog.component";
import {FormValidationMessageComponent} from "./components/form-validation-message.component";
import {CommonConfirm} from "./components/common-confirm.component";
import {InvalidPasswordDirective} from "./directives/invalid-password.directive";

@NgModule({
    declarations: [TruncatePipe,
        MessageResponseComponent,
        NumberInputDirective,
        LoadingComponent,
        RequiredMarkDirective,
        UsernameExistingDirective,
        ConfirmPasswordDirective,
        AutoFocusDirective,
        CommonDialogComponent,
        FormValidationMessageComponent,
        CommonConfirm,
        InvalidPasswordDirective
    ],
    exports: [TruncatePipe,
        MessageResponseComponent,
        NumberInputDirective,
        CommonModule,
        LoadingComponent,
        RequiredMarkDirective,
        UsernameExistingDirective,
        ConfirmPasswordDirective,
        AutoFocusDirective,
        CommonDialogComponent,
        FormValidationMessageComponent,
        CommonConfirm,
        InvalidPasswordDirective
    ],
    imports: [CommonModule],
})
export class ShareModule {
}