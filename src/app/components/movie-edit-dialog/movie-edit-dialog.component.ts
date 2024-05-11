import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ICategory } from '../../interfaces/ICategory';
import { Subject, tap, takeUntil, take } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-movie-edit-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule, 
    StarRatingComponent,
    MatSelectModule,
    MatInputModule],
  templateUrl: './movie-edit-dialog.component.html',
  styleUrl: './movie-edit-dialog.component.scss'
})
export class MovieEditDialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected categories: ICategory[];
  protected isEditMode: boolean = false;
  protected movieForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MovieEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMovie,
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    if (this.data) {
      this.isEditMode = true;
    }
    this.setUpForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCategories(): void {
    this.moviesService.getCategories().pipe(
      tap((categories) => this.categories = categories),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private setUpForm(): void {
    this.movieForm = this.formBuilder.group({
      title: new FormControl(
        { value: this.data ? this.data.title : null, disabled: this.isEditMode },
        [Validators.required]
      ),
      pub_date: new FormControl(
        { value: this.data ? this.data.pub_date : null, disabled: this.isEditMode },
        [Validators.required]
      ),
      duration: new FormControl(
        { value: this.data ? this.data.duration : null, disabled: this.isEditMode },
        [Validators.required]
      ),
      rating: new FormControl(
        { value: this.data ? this.data.rating : null, disabled: this.isEditMode },
        [Validators.required]
      ),
      description: new FormControl(
        { value: this.data ? this.data.description : null, disabled: this.isEditMode },
        [Validators.required]
      ),
      categories: new FormControl(
        { value: this.data ? this.data.categories : null, disabled: this.isEditMode },
        [Validators.required]
      )
    });
  }

  public onSubmit(): void {
    if(!this.movieForm.valid) {
      return;
    } else {
      this.moviesService.addMovie(this.movieForm.value).pipe(
        tap(() => this.dialogRef.close()),
        takeUntil(this.destroy$)
      ).subscribe();
    } 
  }


}
