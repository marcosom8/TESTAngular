import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent implements OnInit {
    progress: number = 0;
    uploadData: any = [];
    public _files: any = [];
    user:User = new User();
    datatable:any = [];

    @Output() onUploadFinished = new EventEmitter();
    @ViewChild('file', {static:false})

    inputElement: ElementRef=new ElementRef(0);

  constructor(private http:HttpClient, private uploadService: UploadService,private userService:DataService) {   }

  ngOnInit(): void {
    this.onDataTable();
  }

  getData(pathData: string){
    this.uploadService.getInfo(pathData).subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.uploadData.push(e);
      });
    });
  }

  onDataTable(){
    this.userService.getUsers().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
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

