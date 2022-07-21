import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    categoryId: new FormControl(''),
  });


  // @ts-ignore
  id: any;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              // ActivatedRoute lấy dữ liệu trên đường dẫn)
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit() {
  }

  private getProduct(id: number){
    return this.productService.getById(id).subscribe(data =>{
      this.form = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        categoryId: new FormControl(data.category.id),
      });
    });

  }

  delete(id: number){
    this.productService.delete(id).subscribe(() =>{
      alert('Xoá thành công');
      this.router.navigate(['home'])
    }, error => {
      console.log(error);
    });
  }

}
