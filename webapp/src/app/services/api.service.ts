/**
 * Service - API Services
 * @api functionType - POST, GET
 * @return - API response
 */

 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { of, timer } from 'rxjs';
 import { catchError, map, switchMap } from 'rxjs/operators';
 import { environment } from '../../environments/environment';
 
 @Injectable({
   providedIn: 'root',
 })
 export class ApiService {
   
   public accessTokenPlatform: string;
   public accessToken: string;
   public userLogins: any;
   public userId: any;
   public userRole: string;
   public userName = '';
   private httpOptions: any;
 
   constructor(private http: HttpClient, private router: Router) {
     if (sessionStorage.getItem('currentUser')) {
       this.getAccessToken();
     }
   }
 
   /**
    * function to do session storage and other user details storage
    * @functionCall - getAccessToken()
    */
   public getAccessToken(): any {
     if (sessionStorage.getItem('currentUser')) {
       // logged in so return true
       const user = JSON.parse(sessionStorage.getItem('currentUser'));
       this.accessToken = user.token;
       this.userId = user.user.id;
       this.userName = user.user.username;
       this.getheaders();
     }
     return;
   }
 
   /**
    * function to set headers for API calls
    * @functionCall - getheaders()
    */
   public getheaders(): any {
     this.httpOptions = {
       headers: new HttpHeaders({
         'x-access-token': this.accessToken,
       }),
     };
   }
 
   /**
    * function to clear sessions and other storage variables
    * @functionCall - getClearAll()
    */
   public getClearAll(): any {
     this.userLogins = [];
     this.accessToken = '';
     this.accessTokenPlatform = '';
     this.userId = '';
     localStorage.clear();
     sessionStorage.removeItem('currentUser');
     sessionStorage.clear();
   }
 
   /**
    * common authentication Service API calls
    */
 
    // Login
   public doLogin(data: any): any {
     return this.http
       .post<any>(`${environment.apiURL}` + 'users/login', data )
       .pipe(
         map((userData: any) => {

           // login successful if there's a jwt token in the response
           if (userData && userData.token) {
             // store user details and jwt token in session storage to keep user logged in between page refreshes
             sessionStorage.setItem('currentUser', JSON.stringify(userData));
             this.getAccessToken();
           }
           return userData.user;
         })
       );
   }
 
   // Logout
   public doLogout(): any {
     const data = {
      userid: this.userId
     };
     this.getAccessToken();

     return this.http
      .post<any>(`${environment.apiURL}` + 'users/logout', data, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
 
   /**
    * common user Service API calls
    */
 
   // general get service | @author: jishna.av@netobjex.com
   public doGetRequest(url: any): any {
     this.getheaders();
     return this.http
       .get<any>(`${environment.apiURL}` + url, this.httpOptions)
       .pipe(
         map((response) => {
           return response;
         })
       );
   }
 
   // general post service | @author: jishna.av@netobjex.com
   public doPostRequest(url: any, data: any): any {
     this.getheaders();
     return this.http
       .post<any>(`${environment.apiURL}` + url, data, this.httpOptions)
       .pipe(
         map((response) => {
           return response;
         })
       );
   }

   // general put service | @author: jishna.av@netobjex.com
   public doPutRequest(url: any, data: any): any {
    this.getheaders();
    return this.http
      .put<any>(`${environment.apiURL}` + url, data, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // general delete service | @author: jishna.av@netobjex.com
  public doDeleteRequest(url: any): any {
    this.getAccessToken();
    return this.http
      .delete<any>(`${environment.apiURL}` + url, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }


 }
 