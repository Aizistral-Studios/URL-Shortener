import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkLoadingComponent } from './link-loading.component';

describe('LinkLoadingComponent', () => {
  let component: LinkLoadingComponent;
  let fixture: ComponentFixture<LinkLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
