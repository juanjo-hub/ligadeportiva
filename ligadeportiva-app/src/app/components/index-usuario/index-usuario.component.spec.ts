import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndexUsuarioComponent } from './index-usuario.component';

describe('IndexUsuarioComponent', () => {
  let component: IndexUsuarioComponent;
  let fixture: ComponentFixture<IndexUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexUsuarioComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
