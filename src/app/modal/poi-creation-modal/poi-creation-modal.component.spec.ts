import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiCreationModalComponent } from './poi-creation-modal.component';

describe('PoiCreationModalComponent', () => {
  let component: PoiCreationModalComponent;
  let fixture: ComponentFixture<PoiCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoiCreationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
