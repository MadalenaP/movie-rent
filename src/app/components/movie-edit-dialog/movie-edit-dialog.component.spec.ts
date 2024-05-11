import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEditDialogComponent } from './movie-edit-dialog.component';

describe('MovieEditDialogComponent', () => {
  let component: MovieEditDialogComponent;
  let fixture: ComponentFixture<MovieEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
