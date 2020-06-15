import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
  providers: [MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
})
export class MaterialModule {}
