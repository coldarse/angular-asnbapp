import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = 'https://aldansupport.com/ASNBCore/api/';
// new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class TokenAuthServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    authenticate(body: AuthenticateModel | undefined): Observable<AuthenticateResultModel> {
        let url_ = this.baseUrl + "/api/TokenAuth/Authenticate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json", 
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAuthenticate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuthenticate(<any>response_);
                } catch (e) {
                    return <Observable<AuthenticateResultModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<AuthenticateResultModel>><any>_observableThrow(response_);
        }));
    }

    protected processAuthenticate(response: HttpResponseBase): Observable<AuthenticateResultModel> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthenticateResultModel.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AuthenticateResultModel>(<any>null);
    }
    export class AuthenticateModel implements IAuthenticateModel {
        userNameOrEmailAddress: string | undefined;
        password: string | undefined;
        rememberClient: boolean;
    
        constructor(data?: IAuthenticateModel) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.userNameOrEmailAddress = data["userNameOrEmailAddress"];
                this.password = data["password"];
                this.rememberClient = data["rememberClient"];
            }
        }
    
        static fromJS(data: any): AuthenticateModel {
            data = typeof data === 'object' ? data : {};
            let result = new AuthenticateModel();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
            data["password"] = this.password;
            data["rememberClient"] = this.rememberClient;
            return data; 
        }
    
        clone(): AuthenticateModel {
            const json = this.toJSON();
            let result = new AuthenticateModel();
            result.init(json);
            return result;
        }
    }
    
    export interface IAuthenticateModel {
        userNameOrEmailAddress: string | undefined;
        password: string | undefined;
        rememberClient: boolean;
    }