import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexArbitroComponent } from './index-arbitro.component';

describe('IndexArbitroComponent', () => {
  let component: IndexArbitroComponent;
  let fixture: ComponentFixture<IndexArbitroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexArbitroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
