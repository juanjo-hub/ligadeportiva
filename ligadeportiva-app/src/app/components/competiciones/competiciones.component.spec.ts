import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompeticionesComponent } from './competiciones.component';

describe('CompeticionesComponent', () => {
  let component: CompeticionesComponent;
  let fixture: ComponentFixture<CompeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompeticionesComponent,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
