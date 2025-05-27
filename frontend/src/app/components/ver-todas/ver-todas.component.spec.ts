import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodasComponent } from './ver-todas.component';

describe('VerTodasComponent', () => {
  let component: VerTodasComponent;
  let fixture: ComponentFixture<VerTodasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerTodasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
