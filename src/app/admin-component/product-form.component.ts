import {ActivatedRoute} from '@angular/router';
import {ProducerService} from '../service/product.service';
import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormType} from '../constant/form-type.model';
import {LoadingState} from '../constant/loading-state.model';
import {FormHelper} from "../common/form-helper";
import {MessageResponse} from "../model/message-response.model";
import {numberOnlyValidator} from "../common/form-validator";

@Component({
    selector: 'product-list',
    templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
    formType: FormType;
    productForm: FormGroup;
    loading: LoadingState = LoadingState.NOT_LOADED;
    formHelper = FormHelper;
    messageResponse: MessageResponse = null;
    @ViewChildren("formFields") formFields: QueryList<ElementRef>;

    constructor(
        private productService: ProducerService,
        private route: ActivatedRoute
    ) {
        this.productForm = new FormGroup({
            id: new FormControl('0', {
                validators: [Validators.required],
            }),
            title: new FormControl('', {
                validators: [Validators.required],
            }),
            price: new FormControl('', {
                validators: [Validators.required, numberOnlyValidator()],
            }),
            description: new FormControl('', {
                validators: [Validators.required],
            }),
            category: new FormControl('', {
                validators: [Validators.required],
            }),
            image: new FormControl('', {
                validators: [Validators.required],
            }),
        });
    }

    ngOnInit() {
        this.formType = this.route.snapshot.routeConfig.path.includes('create')
            ? FormType.CREATE
            : FormType.UPDATE;
        if (this.formType === FormType.UPDATE) {
            let productId = this.route.snapshot.paramMap.get('id');
            this.setFormValue(productId);
        }
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.formHelper.focusOnInvalidField(this.formFields, this.productForm);
            this.productForm.markAllAsTouched();
            return;
        }
        this.loading = LoadingState.LOADING;
        let observable =
            this.formType === FormType.CREATE
                ? this.productService.createProduct(this.productForm.value)
                : this.productService.updateProduct(this.productForm.value);
        observable.subscribe({
            next: (data) => {
                this.loading = LoadingState.LOADED;
                this.messageResponse = data;
            },
            error: (err) => {
                this.loading = LoadingState.LOADED;
                this.messageResponse = err;
            },
        });
    }

    setFormValue(id: string) {
        this.productService.getProductById(parseInt(id)).subscribe((data) => {
            this.productForm.setValue(data);
        });
    }
}
