import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Constantes } from "../models/constantes.model";
import { InitialOption } from "../models/initialoption.model";
import { FilesService } from "../services/files.service";

@Component({
    selector: 'app-file-new',
    templateUrl: './filenew.component.html',
    styleUrls: ['./filenew.component.css']
  })
  export class FileNewComponent implements OnInit {

    initialOptions : InitialOption[] = [];
    initialOptionSelected : InitialOption = new InitialOption();
    fileCode : string;

    constructor(private router : Router,
                private filesService : FilesService){}

    ngOnInit(): void {
        this.loadInitialOptions();
    }

    onFileSelected(event : any) {
        console.log("event--> " + event);
        console.log(event.constructor.name);

        const file : File = event.target.files[0];

        if (file) {
            console.log("nombre file --> " + file.name);
            
            /*
            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
            */
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