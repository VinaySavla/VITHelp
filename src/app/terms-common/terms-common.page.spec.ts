import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsCommonPage } from './terms-common.page';

describe('TermsCommonPage', () => {
  let component: TermsCommonPage;
  let fixture: ComponentFixture<TermsCommonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsCommonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsCommonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
