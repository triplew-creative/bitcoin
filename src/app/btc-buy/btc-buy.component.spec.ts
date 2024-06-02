import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcBuyComponent } from './btc-buy.component';

describe('BtcBuyComponent', () => {
  let component: BtcBuyComponent;
  let fixture: ComponentFixture<BtcBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtcBuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtcBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
