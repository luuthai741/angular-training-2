import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';

import {UserService} from '../../../../shared/services/user.service';
import {numberOnlyValidator, usernameExistsValidator} from '../../../../shared/validators/form-validator';
import {GenderType, getGenderList} from "../../../../shared/constant/gender.type";
import {FormHelper} from "../../../../shared/utils/form-helper";
import {ActivatedRoute, Router} from "@angular/router";
import {FormType} from "../../../../shared/constant/form.type";
import {MessageResponse} from "../../../../core/models/message-response.model";
import {CanComponentDeactivate} from "../../../../core/guards/can-component-deactivate";
import {getRoleByName, getRoleList, RoleType} from "../../../../shared/constant/role.type";
import {User} from "../../../../core/models/user.model";

@Component({
    selector: 'admin-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
    userForm: FormGroup;
    formHelper = FormHelper;
    formType: FormType = FormType.CREATE;
    form = FormType;
    roles = getRoleList();
    genders = getGenderList();
    messageResponse: MessageResponse = null;
    currentUser: User = null;
    @ViewChildren('formField') formFields: QueryList<ElementRef>;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    getCurrentUser(id: number): User {
        const user = this.userService.getUserById(id);
        if (!user) {
            return null;
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

    ngOnInit() {
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
                    password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{9,}$")]],
                    confirmPassword: ['', Validators.required],
                },
                {validators: this.passwordMatchValidator}
            ),
            fullName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-zA-Z\s]*$/),
                ],
            }),
            age: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99),
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
            this.currentUser =  this.getCurrentUser(parseInt(userId));
            if (this.currentUser.role == RoleType[RoleType.GUEST] || this.currentUser.role == RoleType[RoleType.USER]) {
                this.roles = [];
                this.roles.push(getRoleByName(this.currentUser.role));
            }
        }
    }

    passwordMatchValidator(group: FormGroup) {
        const password = group.controls.password?.value;
        const confirmPassword = group.controls.confirmPassword?.value;
        return password === confirmPassword ? null : {mismatch: true};
    }

    isMismatchPassword(): boolean {
        const confirmPassword = this.userForm.get('passwordGroup.confirmPassword');
        return this.userForm.controls.passwordGroup?.errors?.mismatch && confirmPassword?.touched;
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
        if (this.userForm.invalid) {
            this.formHelper.focusOnInvalidField(this.formFields, this.userForm);
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
        const observable = this.formType === FormType.UPDATE ? this.userService.updateUser(formValue) : this.userService.saveUser(formValue);
        observable.subscribe({
            next: data => {
                if (this.formType === FormType.CREATE) {
                    this.formHelper.clearFormValue(this.userForm);
                }
                this.router.navigate(['/admin/users'], {
                    state: data
                });
            },
            error: err => this.messageResponse = err,
        })
        if (this.formType === FormType.CREATE) {
            this.onReset();
        }
    }

    onReset(): void {
        this.userForm.get('username')?.enable();
        if (this.formType === FormType.CREATE) {
            this.formHelper.clearFormValue(this.userForm);
            this.handleDynamicFields(this.userForm.controls.role.value);
        } else {
            let userId = this.activatedRoute.snapshot.paramMap.get('id');
            this.formHelper.clearFormErrors(this.userForm);
            this.getCurrentUser(parseInt(userId));
        }
    }

    canDeactivate(): boolean {
        if (this.userForm.dirty) {
            return confirm("Are you sure you want to out before submitting form?");
        }
        return true;
    }
}
