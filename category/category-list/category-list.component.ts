import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];


  constructor(private  categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.categoryService.findAll().subscribe(result => {
      // @ts-ignore
      this.clazz = result;
    }, error => {
      console.log(error);
    });
  }
}
