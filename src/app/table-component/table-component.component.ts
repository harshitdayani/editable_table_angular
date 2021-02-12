
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})

export class TableComponentComponent implements OnInit {

  form_uTable: FormGroup;
  control: FormArray;
  rowSaved: any;

  data: Users;

  constructor(
    private formCreate: FormBuilder,
    private userS : UsersService
  ) { }

  ngOnInit(): void {
    this.rowSaved = [];
    this.form_uTable = this.formCreate.group({
      tableRows: this.formCreate.array([])
    });

    
    this.userS.getJSON().subscribe(users => {
      this.data = users;
      console.log(this.data);

    });

  }

  ngAfterOnInit() {
    this.control = this.form_uTable.get('tableRows') as FormArray;
  }
  

  // on adding new row => row will be initiated
  addForm(): FormGroup {
    return this.formCreate.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }

  // Add row btn Function
  addRow() {
    const control = this.form_uTable.get('tableRows') as FormArray;
    control.push(this.addForm());
  }

  // Delete icon btn Function
  deleteRow(index: number) {
    const control = this.form_uTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  // Edit icon btn Function
  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  // save details icon function
  saveDetails(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  get getFormControls() {
    const control = this.form_uTable.get('tableRows') as FormArray;
    // console.log(control);
    return control;
  }

  submitForm() {
    const control = this.form_uTable.get('tableRows') as FormArray;
    this.rowSaved = control.controls.filter(row => row.touched).map(row => row.value);
  }

}
