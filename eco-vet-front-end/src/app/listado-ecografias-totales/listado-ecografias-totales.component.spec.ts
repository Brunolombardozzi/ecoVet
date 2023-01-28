import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEcografiasTotalesComponent } from './listado-ecografias-totales.component';

describe('ListadoEcografiasTotalesComponent', () => {
  let component: ListadoEcografiasTotalesComponent;
  let fixture: ComponentFixture<ListadoEcografiasTotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEcografiasTotalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoEcografiasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
