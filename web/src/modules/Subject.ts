declare global {
    export type State<T> = {
        value?: T;
        isReady: boolean;
        isPending?: boolean;
        isFailed?: boolean;
        isResolved?: boolean;
        error?: Error;
    };
}

export type Observer<T> = (value: State<T>) => void;

export default class Subject<T> {
    protected state: State<T>;

    private observers: Observer<T>[] = [];

    constructor(initialValue: T) {
        this.state = {
            isReady: true,
            value: initialValue,
        };
    }

    protected createAsync(fn: () => Promise<T>): () => Promise<void>;

    protected createAsync<P>(
        fn: (param: P) => Promise<T>
    ): (param: P) => Promise<void>;

    protected createAsync(fn: any) {
        return async (param: any) => {
            try {
                this.notify({
                    isReady: false,
                    isPending: true,
                });
                this.state = {
                    isReady: true,
                    isPending: false,
                    isResolved: true,
                    value: await fn(param),
                };

                this.notify(this.state);
            } catch (e) {
                console.error('request failed', e);
                this.notify({
                    isReady: true,
                    isPending: false,
                    isFailed: true,
                    error: e,
                });
            }
        };
    }

    notify(message: State<T>) {
        this.observers.forEach((observer) => observer(message));
    }

    attach(observer: Observer<T>) {
        observer(this.state);
        this.observers = [observer, ...this.observers];
    }

    detach(observer: Observer<T>) {
        this.observers = this.observers.filter((value) => observer !== value);
    }

    detachAll() {
        this.observers = [];
    }
}
