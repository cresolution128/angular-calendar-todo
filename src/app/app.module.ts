import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// @NgModule({
//   declarations: [
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     DragDropModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatInputModule,
//     MatFormFieldModule,
//     MatDialogModule,
//     MatButtonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AppRoutingModule,
//   ],
//   providers: [],
//   bootstrap: []
// })
// export class AppModule { }
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // Optionally provide other modules required for standalone components
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
});