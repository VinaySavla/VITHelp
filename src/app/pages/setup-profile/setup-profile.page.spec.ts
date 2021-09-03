import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetupProfilePage } from './setup-profile.page';

describe('SetupProfilePage', () => {
  let component: SetupProfilePage;
  let fixture: ComponentFixture<SetupProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
