import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs/internal/observable/of';
import { TestService } from '../../services/test.service';

import { Home2Page } from '../home2/home2.page';

describe('Home2Page', () => {
  let component: Home2Page;
  let fixture: ComponentFixture<Home2Page>;

  const mockedTestService = jasmine.createSpyObj('TestService', ['sumar']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Home2Page],
      imports: [IonicModule.forRoot()],
      providers: [{
        provide: TestService,
        useValue: mockedTestService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Home2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doSumar() OK', () => {
    mockedTestService.sumar.and.returnValue(9);
    component.entrada.numero1=4;
    component.entrada.numero2=5;
    component.doSumar();
    expect(component.mensaje).toBe("La suma es: 9");
  });
});
