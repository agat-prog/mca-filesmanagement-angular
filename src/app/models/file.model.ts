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
    date : string;
    finished : boolean;
    documents : DocumentoModel[];
    phases : PhaseModel[];
}