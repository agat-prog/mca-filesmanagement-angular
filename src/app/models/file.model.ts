import { DocumentoModel } from "./documento.model";
import { PhaseModel } from "./phase.model";

export class FileModel {
    id : string;
    code : string;
    userName : string;
    userNameCompleted : string;
    procesCode : string;
    phaseCode : string;
    initOption : string;
    description : string;
    date : Date;
    finished : boolean;
    documents : DocumentoModel[];
    phases : PhaseModel[];
}