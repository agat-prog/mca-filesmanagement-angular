import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from '../models/constantes.model';
import { FileModel } from '../models/file.model';
import { FileUpdatedRequest } from '../models/fileupdaterequest.model';
import { InitialOption } from '../models/initialoption.model';
import { PhaseItem } from '../models/phaseitem.model';
import { FilesService } from '../services/files.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  file : FileModel = new FileModel();
  availablePhases : PhaseItem[] = [];
  phaseSelected : PhaseItem = new PhaseItem();
  initialOptions : InitialOption[] = [];
    
  displayedColumns: string[] = ['phase', 'date', 'userNameCompleted', 'dateFinished', 'userFinishedCompleted'];
  displayedColumnsDocuments : string[] = ['name', 'creationDate', 'creationUser', 'updateDate'];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private filesService : FilesService,
              public spinnerService: SpinnerService,){}

  ngOnInit(): void {
    const code = this.route.snapshot.params['code'];
    this.loadFile(code);
  }

  private loadFile(code : string) {
    this.filesService.findFileByCode(code).subscribe({
      next : (response : FileModel) => {
        this.file = response;
        this.loadAvailablePhases(this.file.phaseCode);
        this.loadInitialOptions();
      } , 
      error : (ee : HttpErrorResponse) => {
        console.error ("status -->" + ee.status)
        this.router.navigate([Constantes.PATH_LOGIN]);
      }
    });
  }

  private loadAvailablePhases(phaseCode : string){
    this.filesService.findAvailablePhase(phaseCode).subscribe({
      next : (response : PhaseItem[]) => {
        this.availablePhases = response
      }, 
      error : (ee : HttpErrorResponse) => {
        this.router.navigate([Constantes.PATH_LOGIN]);
      }
    });
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

  onChangePhaseEvent(value : PhaseItem) {
    this.filesService.nextPhase(this.file.procesCode, value.code)
      .subscribe({          
          next : (response : any)=>{
            console.log("response --> " + response);
            this.loadFile(this.file.code);
          }, 
          error : (ee : HttpErrorResponse) => {
            console.error(ee);
            console.error ("status -->" + ee.status)
          }
      })
    ;
  }

  onSaveEvent() {
    let fileUpdateRequest = new FileUpdatedRequest();
    fileUpdateRequest.code = this.file.code;
    fileUpdateRequest.description = this.file.description;
    fileUpdateRequest.initialOption = this.file.initOption;

    this.filesService.update(fileUpdateRequest)
      .subscribe({
        next : (response : any) => {
          this.loadFile(this.file.code);
        }
      });
  }
}
