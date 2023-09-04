import { ObserversModule } from "@angular/cdk/observers";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileNewComponent } from "../file/filenew.component";
import { FileModel } from "../models/file.model";
import { FileItem } from "../models/fileitem.model";
import { FileUpdatedRequest } from "../models/fileupdaterequest.model";
import { InitialOption } from "../models/initialoption.model";
import { PhaseItem } from "../models/phaseitem.model";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class FilesService {

    private URL : string = "/api/index";
    private URL_FILE_DETAIL : string = "/api/files/";
    private URL_FILE_OPTIONS : string = "/api/files/initialoptions/all";
    private URL_BPM : string = "/api/bpm";
    private URL_AVAILABLE_PHASES : string = this.URL_BPM + "/availablePhases/";

    constructor(private httpClient : HttpClient,
                private authenticationService:AuthenticationService){}

    findFiles() : Observable<FileItem[]> {
        return this.httpClient
            .get<FileItem[]>(this.URL)
    }

    /**
     * Devuelve el expediente a partir de su código único
     * @param code 
     * @returns 
     */
    findFileByCode(code : string) : Observable<FileModel> {
        return this.httpClient
            .get<FileModel>(this.URL_FILE_DETAIL + code)
    }

    /**
     * Devuelve todas las fases disponibles a partir de la actual.
     * @param code 
     * @returns 
     */
    findAvailablePhase(code : string) : Observable<PhaseItem[]>{
        return this.httpClient
            .get<PhaseItem[]>(this.URL_AVAILABLE_PHASES + code)
    }

    /**
     * Avanza el expediente a la fase establecida.
     * @param processCode 
     * @param phaseCode 
     * @returns 
     */
    nextPhase(processCode : string, phaseCode : string) : Observable<any[]>{
        const body = new FormData();
        body.set('procesCode', processCode);
        body.set('phaseCode', phaseCode);

        return this.httpClient        
            .post<any>(this.URL_BPM
                , body
            );        
    }

    /**
     * Devuelve la lista de todos las opciones de inicio.
     * @returns 
     */
    listInitialoptions() : Observable<InitialOption[]>{
        return this.httpClient
            .get<InitialOption[]>(this.URL_FILE_OPTIONS)
    }

    /**
     * Actualiza los campos del expediente.
     * @param fileUpdateRequest 
     * @returns 
     */
    update(fileUpdateRequest : FileUpdatedRequest){
        return this.httpClient        
            .put<any>(this.URL_FILE_DETAIL
                , fileUpdateRequest
            );   
    }

    create(fileCode : string, initialOption : number, file : File) : Observable<any[]>{
        const body = new FormData();
        body.set('code', fileCode);
        body.set('initialoption', initialOption.toString());
        body.set("file", file);

        return this.httpClient        
            .post<any>(this.URL_FILE_DETAIL
                , body
            );        
    }
}