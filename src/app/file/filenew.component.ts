import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Constantes } from "../models/constantes.model";
import { InitialOption } from "../models/initialoption.model";
import { FilesService } from "../services/files.service";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-file-new',
    templateUrl: './filenew.component.html',
    styleUrls: ['./filenew.component.css']
  })
  export class FileNewComponent implements OnInit {

    initialOptions : InitialOption[] = [];
    initialOptionSelected : InitialOption = new InitialOption();
    fileCode : string;
    file : File;

    constructor(private router : Router,
                private filesService : FilesService){}

    ngOnInit(): void {
        this.loadInitialOptions();
    }

    onFileSelected(event : any) {
        console.log("event--> " + event);
        console.log(event.constructor.name);

        this.file = event.target.files[0];
    }
    
    onSubmitEvent() {
      console.log("fileCode --> " + this.fileCode);
        if (this.file && this.fileCode) {
          console.log("nombre file --> " + this.file.name);
          console.log("id --> " + this.initialOptionSelected.id);
          
          this.filesService.create(this.fileCode, this.initialOptionSelected.id, this.file)
            .subscribe({
              next : (response : any) => console.log(response),       
              error : (ee : HttpErrorResponse) => {
                console.error(ee);
                console.error ("status -->" + ee.status)
              }
            });
        }
    }
    
    private loadInitialOptions(){
        if (this.initialOptions.length == 0){
          this.filesService.listInitialoptions().subscribe({
            next : (response : InitialOption[]) => {
              this.initialOptions = response
            }, 
            error : (ee : HttpErrorResponse) => {
              this.router.navigate([Constantes.PATH_LOGIN]);
            }
          });
        }
      }
  }