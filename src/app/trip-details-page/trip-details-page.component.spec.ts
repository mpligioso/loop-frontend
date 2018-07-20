import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsPageComponent } from './trip-details-page.component';

describe('TripDetailsPageComponent', () => {
  let component: TripDetailsPageComponent;
  let fixture: ComponentFixture<TripDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
