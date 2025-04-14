import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {numberOnlyValidator, usernameExistsValidator} from '../validator/form-validator';
import {GenderType} from "../constant/gender-type";
import {FormHelper} from "../common/form-helper";
import {ActivatedRoute} from "@angular/router";
import {FormType} from "../constant/form-type.model";
import {MessageResponse} from "../model/message-response.model";

@Component({
    selector: 'reactive-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    roles: string[] = ['Admin', 'User', 'Guest'];
    formHelper = FormHelper;
    formType: FormType = FormType.CREATE;
    messageResponse: MessageResponse = null;

    @ViewChildren('formField') formFields: QueryList<ElementRef>;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    getCurrentUser(id: number) {
        const user = this.userService.getUserById(id);
        if (!user) {
            return;
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
        });
        this.userForm.get('username')?.disable();
        const rolesFormArray = this.userForm.get('roles') as FormArray;
        rolesFormArray.clear();
        this.roles.forEach((role) => {
            const isChecked = user.roles.includes(role);
            rolesFormArray.push(this.formBuilder.control(isChecked));
        });
        this.handleDynamicFields(rolesFormArray.value);
        this.userForm.get('adminCode')?.setValue(user.roleMetadata.adminCode);
        this.userForm
            .get('subscriptionPlan')
            ?.setValue(user.roleMetadata.subscriptionPlan);
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
                    password: ['', Validators.required],
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
            roles: this.formBuilder.array([], Validators.required),
        });
        const rolesControls = this.roles.map(() => this.formBuilder.control(false));
        this.userForm.setControl('roles', this.formBuilder.array(rolesControls));
        this.userForm.get('roles')!.valueChanges.subscribe((roles) => {
            this.handleDynamicFields(roles);
        });
        this.formType = this.activatedRoute.snapshot.routeConfig.path.includes('create')
            ? FormType.CREATE
            : FormType.UPDATE;
        if (this.formType === FormType.UPDATE) {
            let userId = this.activatedRoute.snapshot.paramMap.get('id');
            this.getCurrentUser(parseInt(userId));
        }
    }

    passwordMatchValidator(group: FormGroup) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : {mismatch: true};
    }

    handleDynamicFields(roles: boolean[]) {
        const selectedRoles = this.roles.filter((_, i) => roles[i]);
        if (selectedRoles.includes('Admin')) {
            if (!this.userForm.get('adminCode')) {
                this.userForm.addControl(
                    'adminCode',
                    new FormControl('', Validators.required)
                );
            }
        } else {
            this.userForm.removeControl('adminCode');
        }

        if (selectedRoles.includes('User')) {
            if (!this.userForm.get('subscriptionPlan')) {
                this.userForm.addControl(
                    'subscriptionPlan',
                    new FormControl('', Validators.required)
                );
            }
        } else {
            this.userForm.removeControl('subscriptionPlan');
        }
    }

    get genderList() {
        return Object.keys(GenderType)
            .filter(key => !isNaN(Number(key)))
            .map(key => ({
                value: Number(key),
                label: GenderType[key]
            }));
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.formHelper.focusOnInvalidField(this.formFields, this.userForm);
            this.userForm.markAllAsTouched();
            return;
        }
        const selectedRoles = (this.userForm.get('roles') as FormArray).value
            .map((checked: boolean, i) => (checked ? this.roles[i] : null))
            .filter((role: string) => role !== null);
        const passwordGroup = this.userForm.get('passwordGroup') as FormGroup;
        let formValue = {
            id: this.userForm.controls.id.value,
            username: this.userForm.controls.username.value,
            password: passwordGroup.controls.password.value,
            fullName: this.userForm.controls.fullName.value,
            age: this.userForm.controls.age.value,
            gender: this.userForm.controls.gender.value as string,
            roles: selectedRoles,
            roleMetadata: {
                adminCode: this.userForm.controls.adminCode?.value,
                subscriptionPlan: this.userForm.controls.subscriptionPlan?.value,
            },
        };
        const observable = this.formType === FormType.UPDATE ? this.userService.updateUser(formValue) : this.userService.saveUser(formValue);
        observable.subscribe({
            next: data => this.messageResponse = data,
            error: err => this.messageResponse = err,
        })
        if (this.formType === FormType.CREATE) {
            this.onReset();
        }
    }

    onReset(): void {
        this.userForm.get('username')?.enable();
        this.userForm.reset();
        const rolesFormArray = this.userForm.get('roles') as FormArray;
        rolesFormArray.controls.forEach((control) => control.setValue(false));
        Object.keys(this.userForm.controls).forEach((key) => {
            const control = this.userForm.get(key);
            control?.setErrors(null);
            control?.markAsPristine();
            control?.markAsUntouched();
        });
    }
}
