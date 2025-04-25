import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';

import {UserService} from '../../../../shared/services/user.service';
import {
    ageValidator,
    fullNameValidator,
    numberOnlyValidator,
    passwordMatchValidator,
    passwordValidator,
    usernameExistsValidator
} from '../../../../shared/validators/form-validator';
import {GenderType, getGenderList} from "../../../../shared/constant/gender.type";
import {FormHelper} from "../../../../shared/utils/form-helper";
import {ActivatedRoute, Router} from "@angular/router";
import {FormType} from "../../../../shared/constant/form.type";
import {MessageResponse} from "../../../../core/models/message-response.model";
import {getRoleByName, getRoleList, RoleType} from "../../../../shared/constant/role.type";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {ControlValidator} from "../../../../core/models/control-validator.model";
import {DialogType} from "../../../../shared/constant/dialog.type";
import {MessageType} from "../../../../shared/constant/message.type";
import {ROUTE} from "../../../../shared/constant/public-url";

@Component({
    selector: 'admin-user-form',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    formHelper = FormHelper;
    formType: FormType = FormType.CREATE;
    form = FormType;
    roles = getRoleList();
    genders = getGenderList();
    messageResponse: MessageResponse = null;
    loggedInUser: User = null;
    controlValidators: ControlValidator[] = [];
    isSubmitted: boolean = false;
    isDialogOpen: boolean = false;
    dialogType: DialogType = DialogType.NOTIFY;
    user: User = null;

    @ViewChildren('formField') formFields: QueryList<ElementRef>;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.loggedInUser = this.authService.getCurrentUser();
        this.userForm = this.formBuilder.group({
            id: new FormControl('', {}),
            username: new FormControl('', {
                validators: [
                    Validators.required,
                    usernameExistsValidator(),
                ],
            }),
            passwordGroup: this.formBuilder.group(
                {
                    password: ['', [Validators.required, passwordValidator()]],
                    confirmPassword: ['', Validators.required],
                },
                {validators: passwordMatchValidator}
            ),
            fullName: new FormControl('', {
                validators: [
                    Validators.required,
                    fullNameValidator(),
                ],
            }),
            age: new FormControl('', {
                validators: [
                    Validators.required,
                    ageValidator(),
                    numberOnlyValidator()
                ],
            }),
            gender: new FormControl('', {
                validators: [Validators.required],
            }),
            role: new FormControl('', {
                validators: [Validators.required],
            }),
        });
        this.userForm.controls.role?.valueChanges.subscribe(role => this.handleDynamicFields(role));
        this.formType = this.activatedRoute.snapshot.routeConfig.path.includes('create')
            ? FormType.CREATE
            : FormType.UPDATE;
        if (this.formType === FormType.UPDATE) {
            let userId = this.activatedRoute.snapshot.paramMap.get('id');
            this.user = this.getUserById(parseInt(userId));
            this.setRoleField(this.user.role);
        }
        this.formHelper.setControlValidators(this.userForm, this.controlValidators, ['passwordGroup.password', 'passwordGroup.confirmPassword'])
    }

    getUserById(id: number): User {
        const user = this.userService.getUserById(id);
        if (!user) {
            this.router.navigate([ROUTE.NOT_FOUND]);
        }
        this.userForm.patchValue({
            id: user.id,
            username: user.username,
            passwordGroup: {
                password: user.password,
                confirmPassword: user.password,
            },
            fullName: user.fullName,
            age: user.age,
            gender: GenderType[user.gender],
            role: RoleType[user.role]
        });
        this.userForm.controls.username.disable();
        this.handleDynamicFields(RoleType[user.role]);
        this.userForm.controls.adminCode?.setValue(user.roleMetadata?.adminCode);
        this.userForm.controls.subscriptionPlan?.setValue(user.roleMetadata?.subscriptionPlan);
        return user;
    }

    setRoleField(userRole: string) {
        if (this.loggedInUser.role != RoleType[RoleType.ADMIN]) {
            this.roles = [];
            this.roles.push(getRoleByName(userRole));
        }
    }

    handleDynamicFields(role: string | number) {
        if (role === '') {
            this.userForm.removeControl('adminCode');
            this.userForm.removeControl('subscriptionPlan');
            return;
        }
        if (role == RoleType.ADMIN) {
            if (!this.userForm.get('adminCode')) {
                this.userForm.addControl(
                    'adminCode',
                    new FormControl('')
                );
            }
        } else {
            this.userForm.removeControl('adminCode');
        }
        if (role == RoleType.USER) {
            if (!this.userForm.get('subscriptionPlan')) {
                this.userForm.addControl(
                    'subscriptionPlan',
                    new FormControl('')
                );
            }
        } else {
            this.userForm.removeControl('subscriptionPlan');
        }
    }

    onSubmit(): void {
        if (this.isDialogOpen) {
            return;
        }
        if (this.userForm.invalid) {
            this.isSubmitted = true;
            this.isDialogOpen = true;
            this.userForm.markAllAsTouched();
            return;
        }
        const passwordGroup = this.userForm.get('passwordGroup') as FormGroup;
        let formValue = {
            id: this.userForm.controls.id.value,
            username: this.userForm.controls.username.value,
            password: passwordGroup.controls.password.value,
            fullName: this.userForm.controls.fullName.value,
            age: this.userForm.controls.age.value,
            gender: this.userForm.controls.gender.value as string,
            role: this.userForm.controls.role.value,
            roleMetadata: {
                adminCode: this.userForm.controls.adminCode?.value,
                subscriptionPlan: this.userForm.controls.subscriptionPlan?.value,
            },
        };
        const observable = this.formType === FormType.UPDATE
            ? this.userService.updateUser(formValue)
            : this.userService.saveUser(formValue);
        observable.subscribe({
            next: data => {
                this.messageResponse = data as MessageResponse;
                this.isDialogOpen = true;
            },
            error: err => {
                this.isDialogOpen = true;
                this.messageResponse = err;
            },
        })
    }

    closeNotificationAndRedirect(isConfirm: boolean = false) {
        this.isDialogOpen = isConfirm;
        if (!isConfirm) {
            return;
        }
        if (this.messageResponse?.messageType == MessageType.ERROR) {
            return;
        }
        this.redirectPage();
    }

    redirectPage() {
        if (this.loggedInUser.role != RoleType[RoleType.ADMIN]) {
            this.router.navigate([ROUTE.HOME]);
        } else {
            // let url = "";
            // if (this.formType == FormType.CREATE) {
            //     url = ROUTE.ADMIN_USERS;
            // } else {
            //     url = `${ROUTE.ADMIN_USERS_DETAILS}/${this.user?.id}`;
            // }
            this.router.navigate([ROUTE.ADMIN_USERS]);
        }
    }

    onReset(): void {
        this.userForm.get('username')?.enable();
        this.isSubmitted = false;
        if (this.formType === FormType.CREATE) {
            this.formHelper.clearFormValue(this.userForm);
            this.handleDynamicFields(this.userForm.controls.role.value);
        } else {
            let userId = this.activatedRoute.snapshot.paramMap.get('id');
            this.formHelper.clearFormErrors(this.userForm);
            this.getUserById(parseInt(userId));
        }
    }

    closeDialog(value: boolean): void {
        this.isDialogOpen = false;
        this.formHelper.focusOnInvalidField(this.formFields, this.userForm);
    }
}
