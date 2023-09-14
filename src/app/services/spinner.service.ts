import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {

    visibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) ;

    constructor() {
        this.visibility = new BehaviorSubject<boolean>(false);
    }

    show() {
        this.visibility.next(true);
    }

    hide() {
        this.visibility.next(false);
    }
}