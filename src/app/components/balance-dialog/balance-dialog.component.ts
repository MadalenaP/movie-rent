import { Component, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { UpdateBalance } from '../../state-management/user/user.actions';

@Component({
  selector: 'app-balance-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  CurrencyPipe],
  templateUrl: './balance-dialog.component.html',
  styleUrl: './balance-dialog.component.scss'
})
export class BalanceDialogComponent {
  protected moneyToAdd: number;

  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  public updateBalance(): void {
    this.store.dispatch(new UpdateBalance(this.data + this.moneyToAdd));
    this.dialogRef.close();
  }
}
