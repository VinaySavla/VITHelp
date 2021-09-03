import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuarantinedPage } from './quarantined.page';

describe('QuarantinedPage', () => {
  let component: QuarantinedPage;
  let fixture: ComponentFixture<QuarantinedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarantinedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuarantinedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
