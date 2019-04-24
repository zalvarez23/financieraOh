import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponenteComponent } from './home-componente.component';

describe('HomeComponenteComponent', () => {
  let component: HomeComponenteComponent;
  let fixture: ComponentFixture<HomeComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
