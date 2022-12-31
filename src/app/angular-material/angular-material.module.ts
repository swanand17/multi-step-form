import { NgModule } from '@angular/core';

//Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


const MaterialModules = [
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDividerModule,
  MatListModule
]

@NgModule({
  declarations: [],
  imports: [
    MaterialModules
  ],
  exports:[
    MaterialModules
  ]
})
export class AngularMaterialModule { }
