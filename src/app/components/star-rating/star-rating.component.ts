import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StarRatingComponent,
    },
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() value: number;
  @Input() disabled: boolean = false;

  onChange = (value) => {};
  onTouched = () => {};
  protected touched = false;

  valueChanged(): void {
    this.onChange(this.value);
  }

  rate(rating: number): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = rating;
      this.onChange(this.value);
    }
  }

  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
