import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productForm: FormGroup= new FormGroup({
    name: new FormControl('')
  })


  listProduct:any;
  listCategory: Category[] = [];

  constructor(private httpCline: HttpClient,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getCategory()

  }
  getCategory(){
    this.categoryService.findAll().subscribe((data) => {
      this.listCategory = data;
    });
  }

  getAll(){
    this.productService.findAll().subscribe((data) => {
      console.log(data)
      this.listProduct=data;
    },error=>{
      console.log(error)
    })
  }
  searchByName() {
    const name = this.productForm.value.name;
    this.productService.searchByName(name).subscribe((data) => {
      console.log(data)
      this.listProduct=data;
    },error=>{
      console.log(error)
    })

  }

}
