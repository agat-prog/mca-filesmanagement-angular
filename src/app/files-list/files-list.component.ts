import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from '../models/constantes.model';
import { FileItem } from '../models/fileitem.model';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  
  files : FileItem[] = [];

  displayedColumns: string[] = ['id', 'initOption', 'procesDate', 'phaseName', 'description', 'operations'];
  
  constructor(private filesService : FilesService,
              private router: Router){}

  ngOnInit(): void {
    this.filesService.findFiles()
      .subscribe({
        next : (response : FileItem[]) => this.files = response , 
        error : (ee : HttpErrorResponse) => {
          console.error ("status -->" + ee.status)
          this.router.navigate([Constantes.PATH_LOGIN]);
        }
      });
  }
}
