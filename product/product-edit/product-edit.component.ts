import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from "../../model/category";
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    categoryId: new FormControl(''),
  });

  // @ts-ignore
  id: number;
  obj: any;
  listCategory: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              // ActivatedRoute lấy dữ liệu trên đường dẫn) { }
              private categoryService: CategoryService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe((data) => {
      this.listCategory = data;
    });
  }

  private getProduct(id: number) {
    return this.productService.getById(id).subscribe(data => {
      this.form = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        categoryId: new FormControl(data.category.id),
      });
    });

  }
  edit(id:number){
    this.obj={
      name: this.form.value.name,
      price: this.form.value.price,
      category: {
        id:this.form.value.categoryId
      }
    };
    this.productService.edit(id, this.obj).subscribe(() => {
      this.router.navigate(['']);
      alert('Cập nhật thành công');
    }, error => {
      console.log(error);
    });
  }
}
