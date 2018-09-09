import {RxHttpRequest, RxHttpRequestResponse} from '@akanass/rx-http-request';
import {flatMap, map, skipWhile, take} from 'rxjs/operators';
import {Observable, interval} from 'rxjs';

export type Await = () => Observable<boolean>

const DEFAULT_INTERVAL = 500; // milliseconds

export class RxRest {

    private http: RxHttpRequest;

    constructor(url: string) {
        this.http = RxHttpRequest.instance().defaults({
            baseUrl: url
        });
    }

    put(path: string, data?: any, awaitTimeout?: number, handler?: Await): Observable<void> {
        const result = RxRest.execute<void>(() => {
            const options = {
                body: data
            };

            return this.http.put(path, options);
        });

        if (handler) {
            return await(result, handler, awaitTimeout);
        } else {
            return result;
        }
    }

    get<T>(path: string): Observable<T> {
        return RxRest.execute<T>(
            () => this.http.get(path),
            (body) => JSON.parse(body)
        );
    }

    private static execute<T>(request: () => Observable<RxHttpRequestResponse<string>>, mapper?: (string) => T): Observable<T> {
        const finalMapper = mapper ? mapper : (s) => s;
        return request().pipe(
            map(RxRest.postProcess),
            map(finalMapper)
        );
    }

    private static postProcess<T>(response: RxHttpRequestResponse<T>): T {
        return response.body;
    }

}

function await<T>(observable: Observable<T>, handler: Await, intervalTimeout: number = DEFAULT_INTERVAL): Observable<T> {
    return observable.pipe(flatMap((result) =>
        interval(intervalTimeout).pipe(
            flatMap(() => handler()),
            skipWhile((handlerResult) => !!handlerResult),
            take(1),
            map(() => result)
        )
    ));
}

