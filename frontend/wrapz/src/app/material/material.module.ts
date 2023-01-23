import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {DialogModule} from '@angular/cdk/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const material=[
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  DialogModule,
  MatTabsModule
]

@NgModule({
  imports: [material],
  exports:[material]
})
export class MaterialModule { }
