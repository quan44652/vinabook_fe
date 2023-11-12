import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocialComponent } from './footer-social.component';

describe('FooterSocialComponent', () => {
  let component: FooterSocialComponent;
  let fixture: ComponentFixture<FooterSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterSocialComponent]
    });
    fixture = TestBed.createComponent(FooterSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
