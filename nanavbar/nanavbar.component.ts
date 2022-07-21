import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {CategoryService} from "../service/category.service";
import {Category} from "../model/category";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-nanavbar',
  templateUrl: './nanavbar.component.html',
  styleUrls: ['./nanavbar.component.css']
})
export class NanavbarComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl('')
  })

  form = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(''),
  })

  constructor(private httpClient: HttpClient,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  listProduct: any;
  listCategory: Category[] = [];

  ngOnInit(): void {
    this.getAll();
    this.getCategory();
  }

  getCategory() {
    this.categoryService.findAll().subscribe((data) => {
      this.listCategory = data;
    })
  }

  getAll() {
    this.productService.findAll().subscribe((data) => {
      console.log(data)
      this.listProduct = data;
    }, error => {
      console.log(error)
    })
  }

  searchByName() {
    const name = this.productForm.value.name;
    this.productService.searchByName(name).subscribe((data) => {
      console.log(data)
      this.listProduct = data;
    }, error => {
      console.log(error)
    })
  }

  searchByCategoryId(id: any) {
    // const id = this.productForm.value.categoryId;
    this.productService.getByCategoryId(id).subscribe(data => {
      this.listProduct = data;
      console.log(data);
    });
  }

  obj:any;
  add() {
    console.log(this.form.value)
    this.obj = {
      name: this.form.value.name,
      price: this.form.value.price,
      category: {
        id: this.form.value.category
      }
    }
    console.log(this.obj)
    this.productService.save(this.obj).subscribe((data) => {
      alert("Them thanh cong");
      this.obj=data;
      // this.router.navigate(['product-be'])
    },error=>{
      alert('Loi')
    })
  }

  searchByPrice() {
    const from = this.productForm.value.from;
    const to = this.productForm.value.to;
    this.productService.getByPriceBetween(from, to).subscribe((data) => {
      console.log(data)
      this.listProduct=data;
    },error=>{
      console.log(error)
    })
  }



}
