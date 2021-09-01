import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectRolePage } from './select-role.page';

describe('SelectRolePage', () => {
  let component: SelectRolePage;
  let fixture: ComponentFixture<SelectRolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRolePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectRolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
