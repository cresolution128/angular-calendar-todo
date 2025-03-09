import { MatInputModule } from '@angular/material/input';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { IDialogData } from '../../../shared/types';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MainService } from '../../../service/main.service';

@Component({
  selector: 'app-appoint-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule,MatIconModule],
  templateUrl: './appoint-modal.component.html',
  styleUrl: './appoint-modal.component.scss',
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ]
})
export class AppointModalComponent {
  appointmentForm: FormGroup;
  mode: string;
  updateId: number;
  constructor(
    private _calendarService: MainService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<unknown>,
    public dialogRef: MatDialogRef<AppointModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData
  ) {
    this.mode = dialogData?.mode || 'create',
      this.dateAdapter.setLocale('en-GB')
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      description: ['']
    });
    this.updateId = 0;

    if (this.mode === 'update' && dialogData.data) {
      this.updateId = dialogData.data.id;
      this.appointmentForm.patchValue({
        title: dialogData.data.title,
        date: dialogData.data.date,
        description: ''
      })
    } else if (this.mode === 'create' && dialogData.data) {
      this.appointmentForm.patchValue({
        title: '',
        date: dialogData.data.date,
        description: ''
      })
    }
  }

  isUpdateMode() {
    return this.mode == 'update'
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    } else {
      console.log("error ----------------- :", this.appointmentForm.errors);
    }
  }
  handleDelete() {
    this._calendarService.deleteAppointment(this.updateId);
    this.dialogRef.close()
  }
}
