import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndexAdmiComponent } from './index-admi.component';

describe('IndexAdmiComponent', () => {
  let component: IndexAdmiComponent;
  let fixture: ComponentFixture<IndexAdmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAdmiComponent,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
