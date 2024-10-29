import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommentComponent } from './addcomment.component';

describe('AddcommentComponent', () => {
  let component: AddcommentComponent;
  let fixture: ComponentFixture<AddcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
