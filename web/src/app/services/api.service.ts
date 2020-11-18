import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CommonHelper } from '../helper/common.helper';
import { IAggregatedItem } from '../models/aggregated-item.dto';

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    processFile(file: File): Observable<Array<IAggregatedItem>> {
        return this.http.post<Array<IAggregatedItem>>(
            `https://localhost:44328/api/ProcessData/GetDataFromFile`,
            CommonHelper.getFormDataOptions([file]));
    }
}
