import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFamilyComponent } from './join-family.component';

describe('JoinFamilyComponent', () => {
  let component: JoinFamilyComponent;
  let fixture: ComponentFixture<JoinFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
