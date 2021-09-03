import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DodPage } from './dod.page';

describe('DodPage', () => {
  let component: DodPage;
  let fixture: ComponentFixture<DodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
