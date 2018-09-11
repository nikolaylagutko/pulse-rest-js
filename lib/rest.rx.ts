import {RxHttpRequest, RxHttpRequestResponse} from '@akanass/rx-http-request';
import {interval, Observable} from 'rxjs';
import {flatMap, map, skipWhile, take} from 'rxjs/operators';

export type Await = () => Observable<boolean>;

const DEFAULT_INTERVAL = 500; // milliseconds

export class RxRest {

    private http: RxHttpRequest;

    constructor(url: string) {
        this.http = RxHttpRequest.instance().defaults({
            baseUrl: url
        });
    }

    public put(path: string, data?: any): Observable<string> {
        return RxRest.execute(() => {
            const options = {
                json: data
            };

            return this.http.put(path, options);
        });
    }

    public getJson<T>(path: string): Observable<T> {
        return this.get(path).pipe(
            map((body) => JSON.parse(body))
        );
    }

    public get(path: string): Observable<string> {
        return RxRest.execute(() => this.http.get(path));
    }

    private static execute(request: () => Observable<RxHttpRequestResponse<string>>): Observable<string> {
        return request().pipe(
            map(RxRest.postProcess)
        );
    }

    private static postProcess<T>(response: RxHttpRequestResponse<T>): T {
        return response.body;
    }

}

function await<T>(
        observable: Observable<T>,
        handler: Await,
        intervalTimeout: number = DEFAULT_INTERVAL
    ): Observable<T> {
    return observable.pipe(flatMap((result) =>
        interval(intervalTimeout).pipe(
            flatMap(() => handler()),
            skipWhile((handlerResult) => !!handlerResult),
            take(1),
            map(() => result)
        )
    ));
}
