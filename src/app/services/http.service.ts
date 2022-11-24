import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ApiCallError } from '../errors/app.errors'
import { Injectable } from '@angular/core'

type HttpBody = { [key: string]: any } | { [key: string]: any }[]

@Injectable({ providedIn: 'root' })
export class HttpService {
    private baseUrl: string = environment.backendUrl as string

    constructor(
       private httpClient: HttpClient
    ) {}

    private createHeaders(): HttpHeaders {
        return new HttpHeaders().set('Content-Type', 'application/json')
    }

    public get(endpointUrl: string): Observable<HttpBody> {
        return new Observable<HttpBody>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.httpClient.get(
                fullUrl,
                {
                    headers: this.createHeaders(),
                    observe: 'body'
                }
            ).subscribe(result => {
                observer.next(result as HttpBody)
            }, error => {
                observer.error(new ApiCallError('GET', fullUrl, error))
            }, () => {
                observer.complete()
            })
        })
    }

    public post(endpointUrl: string, body: HttpBody): Observable<HttpBody> {
        return new Observable<HttpBody>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.httpClient.post(
                fullUrl,
                body,
                {
                    headers: this.createHeaders(),
                    observe: 'body'
                }
            ).subscribe(result => {
                observer.next(result as HttpBody)
            }, error => {
                observer.error(new ApiCallError('POST', fullUrl, error))
            }, () => {
                observer.complete()
            })
        })
    }

    public put(endpointUrl: string, body: HttpBody): Observable<HttpBody> {
        return new Observable<HttpBody>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.httpClient.put(
                fullUrl,
                body,
                {
                    headers: this.createHeaders(),
                    observe: 'body'
                }
            ).subscribe(result => {
                observer.next(result as HttpBody)
            }, error => {
                observer.error(new ApiCallError('PUT', fullUrl, error))
            }, () => {
                observer.complete()
            })
        })
    }

    public patch(endpointUrl: string, body: HttpBody): Observable<HttpBody> {
        return new Observable<HttpBody>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.httpClient.patch(
                fullUrl,
                body,
                {
                    headers: this.createHeaders(),
                    observe: 'body'
                }
            ).subscribe(result => {
                observer.next(result as HttpBody)
            }, error => {
                observer.error(new ApiCallError('PATCH', fullUrl, error))
            }, () => {
                observer.complete()
            })
        })
    }

    public delete(endpointUrl: string): Observable<HttpBody> {
        return new Observable<HttpBody>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.httpClient.delete(
                fullUrl,
                {
                    headers: this.createHeaders(),
                    observe: 'body'
                }
            ).subscribe(result => {
                observer.next(result as HttpBody)
            }, error => {
                observer.error(new ApiCallError('DELETE', fullUrl, error))
            }, () => {
                observer.complete()
            })
        })
    }
}