import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {FormType} from '../../../../shared/constant/form.type';
import {LoadingStateType} from '../../../../shared/constant/loading-state.type';
import {FormHelper} from "../../../../shared/utils/form-helper";
import {MessageResponse} from "../../../../core/models/message-response.model";
import {imageUrlValidator, priceValidator} from "../../../../shared/validators/form-validator";
import {CanComponentDeactivate} from "../../../../core/guards/can-component-deactivate";
import {
    productFormTitles,
    productFormValidator,
    userFormTitles,
    userFormValidators
} from "../../../../shared/constant/form-constants";
import {ControlValidator} from "../../../../core/models/control-validator.model";

@Component({
    selector: 'admin-product-form',
    templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
    formType: FormType;
    form = FormType;
    productForm: FormGroup;
    loading: LoadingStateType = LoadingStateType.NOT_LOADED;
    formHelper = FormHelper;
    messageResponse: MessageResponse = null;
    categories: string[] = [];
    controlValidators: ControlValidator[] = [];

    @ViewChildren("formFields") formFields: QueryList<ElementRef>;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.productForm = new FormGroup({
            id: new FormControl('0', {
                validators: [Validators.required],
            }),
            title: new FormControl('', {
                validators: [Validators.required],
            }),
            price: new FormControl('', {
                validators: [Validators.required, priceValidator()],
            }),
            description: new FormControl('', {
                validators: [Validators.required],
            }),
            category: new FormControl('', {
                validators: [Validators.required],
            }),
            image: new FormControl('', {
                validators: [Validators.required, imageUrlValidator()],
            }),
        });
        this.categories = productService.getProductCategories();
    }

    ngOnInit() {
        this.formType = this.route.snapshot.routeConfig.path.includes('create')
            ? FormType.CREATE
            : FormType.UPDATE;
        this.setFormValue();
        this.setControlValidators();
    }

    setControlValidators() {
        Object.keys(this.productForm.controls).forEach((controlName) => {
            const controlValidator: ControlValidator = {
                title: productFormTitles[controlName],
                controlName: controlName,
                validatorNames: productFormValidator[controlName],
            }
            this.controlValidators.push(controlValidator);
        })
        console.log(this.controlValidators)
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.formHelper.focusOnInvalidField(this.formFields, this.productForm);
            this.productForm.markAllAsTouched();
            return;
        }
        this.loading = LoadingStateType.LOADING;
        let observable =
            this.formType === FormType.CREATE
                ? this.productService.createProduct(this.productForm.value)
                : this.productService.updateProduct(this.productForm.value);
        observable.subscribe({
            next: (data) => {
                if (this.formType === FormType.CREATE) {
                    this.formHelper.clearFormValue(this.productForm);
                }
                this.router.navigate(['/admin/products'], {
                    state: data
                });
            },
            error: (err) => {
                this.loading = LoadingStateType.LOADED;
                this.messageResponse = err;
            },
        });
    }

    setFormValue() {
        if (this.formType !== FormType.UPDATE) {
            return;
        }
        const productId = this.route.snapshot.paramMap.get('id');
        const product = this.productService.getProductById(parseInt(productId));
        if (!product) {
            this.router.navigate(['/not-found']);
        }
        this.productForm.patchValue(product);
        this.formHelper.clearFormErrors(this.productForm);
    }

    onReset() {
        if (this.formType === FormType.UPDATE) {
            this.setFormValue();
            return;
        }
        this.formHelper.clearFormValue(this.productForm);
    }

    canDeactivate(): boolean {
        if (this.productForm.dirty) {
            return confirm("Are you sure you want to out before submitting form?");
        }
        return true;
    }
}
