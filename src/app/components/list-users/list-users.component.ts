import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/models/user';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';

@Component({ 
  selector: 'app-list-users', 
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  modalRef!: BsModalRef;
  user:User = new User();
  datatable:any = [];
  filterPost = '';
  modalSwitch?:boolean;

  constructor(private userService:DataService, public modalService: BsModalService) {
  }

  openModal(){
    this.modalSwitch = true;
  }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.userService.getUsers().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onSetData(select:any){
    this.user.uid = select.uid;
    this.user.registrationdate = select.registrationdate;
    this.user.name = select.name;
    this.user.address = select.address;
    this.user.phone = select.phone;
    this.user.curp = select.curp;
  }

  clear(){
    this.user.uid = 0;
    this.user.registrationdate;
    this.user.name = "";
    this.user.address = "";
    this.user.phone = "";
    this.user.curp = "";
  }

  onAddUser(user:User):void{
    if(user.name != ""){
      if(user.address != ""){
        if(user.phone != ""){
          if(user.curp != ""){
            this.userService.addUsers(user).subscribe(res => {
              if(res){
                alert(`Contact ${user.name} has been added successfully`);
                this.clear();
                this.onDataTable();
              }
              else{
                alert("Save error");
              }
            });
          }
          else{
            alert("Please, enter your CURP in the form");
          }
        }
        else{
          alert("Please, enter a phone number in the form");
        }
      }else{
        alert("Please, enter an address in the form");
      }
    }
    else{
      alert("Please, enter a user name in the form");
    }
  }

  onUpdateUser(user:User):void{
    if(user.uid > 0){
      this.userService.updateUsers(user.uid, user).subscribe(res => {
        if(res){
          alert(`The user ${user.name} has been successfully updated`);
          this.clear();
          this.onDataTable();
        }
        else{
          alert("Update error");
        }
      });
    }
    else{
      alert("Please, select a user from the list");
    }
  }

  onRemoveUser(uid:number):void{
    this.userService.removeUser(uid).subscribe(res => {
      if(res){
        alert(`The user with ID: ${uid} has been successfully removed`);
        this.clear();
        this.onDataTable();
      }
      else{
        alert("Delete error");
      }
    });
  }

  fileUploaded(e: any){
    if(e.status == 1){
      this.loadListContacts();
    }
  }

  loadListContacts(initTable: boolean = false){
    this.userService
  }

  parseCSV(text: any) {
    let lines = text.split('\n');
    return lines.map((line: any) => {
      let values = line.split(',');
      return values;
    });
  }
  //Read CSV file
  readFile($event: any): void {
    let inputFile: HTMLInputElement = <HTMLInputElement>document.getElementById("fileCSV");

    let file = inputFile.files; 
    if(!file){
      return;
    }
      let reader = new FileReader();
      reader.onload = (e) => {
        let lines = this.parseCSV(e.target?.result);
        this.setUsersCSV(lines);
      };
      reader.readAsBinaryString(file[0]); 
  }
  
  setUsersCSV(output: any){
    let forms: FormGroup[];
    let counter: number = 0;
    let result: boolean = true;

      output.forEach((value: any, index:number) => {
        if(value[0]===null){ return;}else{
          if(counter > 0)
          {
            this.user.name = value[0];
            this.user.address = value[1];
            this.user.phone = value[2];
            this.user.curp = value[3];

              this.userService.addUsers(this.user)
              .subscribe(res => {
              if(!res){
                result=false;
              }
            });
          }else{
            counter+=1;
          }
        }
      });
if(result){
  alert(`Contacts have been added successfully`);
  this.onDataTable();
}else{
  alert(`Error, make sure the file has the correct structure`);
}

  }

}
