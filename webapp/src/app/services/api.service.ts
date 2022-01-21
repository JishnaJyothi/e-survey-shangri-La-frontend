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
   public userFirstname: string;
   private httpOptions: any;
   private httpOptionsText: any;
 
   constructor(private http: HttpClient, private router: Router) {
     if (sessionStorage.getItem('currentUser')) {
       this.getAccessToken();
     }
   }
 
   /**
    * function to do session storage and other user details storage
    * @functionCall - getAccessToken()
    */
   public getAccessToken() {
    //  if (sessionStorage.getItem('currentUser')) {
    //    // logged in so return true
    //    const user = JSON.parse(sessionStorage.getItem('currentUser'));
 
    //    this.userLogins = user.data;
    //    this.accessToken = user.token;
    //    this.accessTokenPlatform = user.data.token;
    //    this.userId = user.data.uid;
    //    this.userRole = user.data.roles[0];
    //    this.userFirstname = user.data.firstname;
    //    this.getheaders();
    //  }
     return;
   }
 
   /**
    * function to set headers for API calls
    * @functionCall - getheaders()
    */
   public getheaders() {
    //  this.httpOptions = {
    //    headers: new HttpHeaders({
    //      'Access-Control-Allow-Origin': '*',
    //      'Content-Type': 'application/json',
    //      'Authorization': 'Bearer' + this.accessToken,
    //    }),
    //  };
   }
 
   /**
    * function to clear sessions and other storage variables
    * @functionCall - getClearAll()
    */
   public getClearAll() {
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
   public doLogin(data: any) {
     return this.http
       .post<any>(`${environment.apiURL}` + 'api/login', data, this.httpOptions)
       .pipe(
         map((user) => {
           // login successful if there's a jwt token in the response
           if (user && user['token']) {
             // store user details and jwt token in session storage to keep user logged in between page refreshes
             sessionStorage.setItem('currentUser', JSON.stringify(user));
             this.getAccessToken();
           }
           return user;
         })
       );
   }
 
   // Logout
   public doLogout() {
     return this.http
       .post<any>(`${environment.apiURL}` + '/logout?access_token=' +
           this.accessTokenPlatform,
         this.httpOptions
       )
       .pipe(
         map((response) => {
           this.getClearAll();
           return response;
         })
       );
   }
 
   /**
    * common user Service API calls
    */
 
   // general get service | @author: jishna.av@netobjex.com
   public doGetRequest(url: any) {
     this.getAccessToken();
     return this.http
       .get<any>(`${environment.apiURL}` + url, this.httpOptions)
       .pipe(
         map((response) => {
           return response;
         })
       );
   }
 
   // general post service | @author: jishna.av@netobjex.com
   public doPostRequest(url: any, data: any) {
     this.getAccessToken();
     return this.http
       .post<any>(`${environment.apiURL}` + url, data, this.httpOptions)
       .pipe(
         map((response) => {
           return response;
         })
       );
   }
 }
 