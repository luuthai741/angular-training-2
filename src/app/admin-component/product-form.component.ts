import {ActivatedRoute} from '@angular/router';
import {ProducerService} from '../service/product.service';
import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormType} from '../constant/form-type.model';
import {LoadingState} from '../constant/loading-state.model';
import {FormHelper} from "../common/form-helper";

@Component({
    selector: 'product-list',
    templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
    formType: FormType;
    productForm: FormGroup;
    loading: LoadingState = LoadingState.NOT_LOADED;
    formHelper = FormHelper;

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
                validators: [Validators.required],
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
            this.productForm.markAllAsTouched();
            return;
        }
        this.loading = LoadingState.LOADING;
        let observable =
            this.formType === FormType.CREATE
                ? this.productService.createProduct(this.productForm.controls.title.value)
                : this.productService.updateProduct(this.productForm.value);
        observable.subscribe({
            next: (data) => {
                console.log('Product  ' + data);
            },
            error: (err) => {
                console.log(`error ${err.name}`);
            },
        });
    }

    setFormValue(id: string) {
        this.productService.getProductById(parseInt(id)).subscribe((data) => {
            this.productForm.setValue(data);
        });
    }
}
