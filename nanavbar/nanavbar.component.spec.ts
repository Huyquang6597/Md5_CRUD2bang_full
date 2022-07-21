import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanavbarComponent } from './nanavbar.component';

describe('NanavbarComponent', () => {
  let component: NanavbarComponent;
  let fixture: ComponentFixture<NanavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NanavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NanavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
