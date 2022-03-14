import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFavoriteComponent } from './cart-favorite.component';

describe('CartFavoriteComponent', () => {
  let component: CartFavoriteComponent;
  let fixture: ComponentFixture<CartFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
