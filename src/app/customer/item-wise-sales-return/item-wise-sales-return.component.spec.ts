import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemWiseSalesReturnComponent } from './item-wise-sales-return.component';

describe('ItemWiseSalesReturnComponent', () => {
  let component: ItemWiseSalesReturnComponent;
  let fixture: ComponentFixture<ItemWiseSalesReturnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWiseSalesReturnComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemWiseSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
