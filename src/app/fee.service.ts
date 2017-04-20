import { Injectable } from '@angular/core';
import { Fee } from './fee';
import { FEES } from './mock-fees';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FeeService {

    /*getFees(): Promise<Fee[]> {
       return Promise.resolve(FEES);
    }*/
    
    private feesUrl = 'http://localhost:8090/fees/listing';  // URL to web api
    private secureFeesUrl = 'http://localhost:8090/fees/secure/listing';  // URL to web api    

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getFees(): Promise<Fee[]> {
      return this.http.get(this.feesUrl)
                 .toPromise()
                 .then(response => response.json() as Fee[])
                 .catch(this.handleError);
    }
    
    getSecureFees(): Promise<Fee[]> {
        return this.authHttp.get(this.secureFeesUrl)
                   .toPromise()
                   .then(response => response.json() as Fee[])
                   .catch(this.handleError);
      }    

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    } 
}