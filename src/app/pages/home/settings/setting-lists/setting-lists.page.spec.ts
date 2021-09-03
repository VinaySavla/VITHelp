import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingListsPage } from './setting-lists.page';

describe('SettingListsPage', () => {
  let component: SettingListsPage;
  let fixture: ComponentFixture<SettingListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
