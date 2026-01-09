import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrosComponent } from './arbitros.component';

describe('ArbitrosComponent', () => {
  let component: ArbitrosComponent;
  let fixture: ComponentFixture<ArbitrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
