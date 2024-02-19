import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiInfoModalComponent } from './poi-info-modal.component';

describe('PoiInfoModalComponent', () => {
  let component: PoiInfoModalComponent;
  let fixture: ComponentFixture<PoiInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoiInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
