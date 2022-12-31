import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class MultiStepFormComponent implements OnInit, OnDestroy {


  @ViewChild('formStepper') formStepper: MatStepper | undefined;

  planOptions = [
    {
      icon:'../../assets/images/icon-arcade.svg',
      title: 'Arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
      offer: '2 months free',
    },
    {
      icon:'../../assets/images/icon-advanced.svg',
      title: 'Advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
      offer: '2 months free',
    },
    {
      icon:'../../assets/images/icon-pro.svg',
      title: 'Pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
      offer: '2 months free',
    }
  ];

  addOnOptions = [
    {
      formControl: 'onlineServiceFormControl',
      title: 'Online service',
      feature: 'Access to multiplayer games',
      monthlyPrice: 1,
      yearlyPrice: 10,
    },
    {
      formControl: 'largerStorageFormControl',
      title: 'Larger storage',
      feature: 'Extra 1TB of cloud save',
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
    {
      formControl: 'customizableProfileFormControl',
      title: 'Cutomizable Profile',
      feature: 'Custom theme on your profile',
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
  ];

  personalInfoForm:FormGroup = this.fb.group({
    nameFormControl: ['', Validators.required],
    emailFormControl: ['', [Validators.required, Validators.email]],
    phoneNumberFormControl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
  })

  planForm: FormGroup =  this.fb.group({
    planTypeFormControl: ['', Validators.required],
    planModeFormControl: [false, Validators.required],
  });

  addOnForm: FormGroup =  this.fb.group({
    onlineServiceFormControl: [false],
    largerStorageFormControl: [false],
    customizableProfileFormControl: [false]
  });

  stepIndex: number = 0;
  formIndex: number = 0;
  isLinear: boolean = true;
  finalDetails: any;
  finalAddOnList: any[] = [];
  addOnFormSubscription: any;
  planModeSubscription: any;
  subscriptionList: any[] = [];
  finalDetailsSubmitted: boolean = false;
  isLastForm: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.showFormGroup();

    this.addOnFormSubscription = this.addOnForm.valueChanges.subscribe((newValues)=>{
      this.finalAddOnList = [];      
      for(let addOn in this.addOnForm.value){
        if(this.addOnForm.value[addOn] === true){
          this.finalAddOnList.push(this.addOnOptions.find(addOnOption => addOnOption.formControl === addOn));
        }
      } 
    })

    this.planModeSubscription = this.planForm.get('planModeFormControl')?.valueChanges.subscribe(()=>{
      this.getFinalDetails();
    });

    this.subscriptionList.push(this.addOnFormSubscription, this.planModeSubscription);
  }

  stepperChange(selectedIndex: number, event?: any){
    if(event){
      this.stepIndex = selectedIndex;
      this.formIndex = selectedIndex;
    }else{
      this.stepIndex = selectedIndex;
    }
    return this.showFormGroup();
  }

  submitForm(stepper: MatStepper){
    // last form index check
    if(this.formIndex !== 3){
      if(this.isFormValid(this.personalInfoForm)){
        this.planForm.get('planTypeFormControl')?.setValue(this.planOptions[0]);
        if(this.isFormValid(this.planForm)){    
          this.getFinalDetails();
        }
        this.stepIndex = this.formIndex++;
        this.showFormGroup();
        stepper.next();
      }
    }
  }
 
  previousForm(stepper: MatStepper){
    // first form index check
    if(this.formIndex !== 0){
      this.stepIndex = this.formIndex--;
      this.showFormGroup();
      stepper.previous();
    } 
  }

  isFormValid(formGroup: FormGroup){
    if(formGroup.valid){
      this.isLinear = false;
      return true;
    } else {
      this.isLinear = true;
      return false;
    }
  }

  showFormGroup(){
    return this.stepIndex === this.formIndex ? true : false;
  }

  getFinalDetails(){
    let totalPrice = 0;

    // yearly plan
    if(this.planForm.get('planModeFormControl')?.value){
      totalPrice = this.planForm.get('planTypeFormControl')?.value.yearlyPrice;
      this.finalAddOnList.forEach((finalAddOn)=>{
        totalPrice += finalAddOn.yearlyPrice;
      });
    } 
    // monthly plan
    else {
      totalPrice = this.planForm.get('planTypeFormControl')?.value.monthlyPrice;
      this.finalAddOnList.forEach((finalAddOn)=>{
        totalPrice += finalAddOn.monthlyPrice;
      });
    }
    
    this.finalDetails = {
      name: this.personalInfoForm.get('nameFormControl')?.value,
      email: this.personalInfoForm.get('emailFormControl')?.value,
      phoneNumber: this.personalInfoForm.get('phoneNumberFormControl')?.value,
      planType: this.planForm.get('planTypeFormControl')?.value,
      planMode: this.planForm.get('planModeFormControl')?.value,
      addOns: this.finalAddOnList,
      totalPrice: totalPrice
    }
  }

  confirmDetails(){
    this.finalDetailsSubmitted = true;
    this.isLinear = true;
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }

}
