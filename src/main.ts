export interface ListenMap {
    [I: string]: Set<(...arg: any[]) => void> | TransformSet<any[]>
}
// interface ListenMap {
//     "d":TransformSet<number[]>
// }
export type TransformSet<T extends any[]> = Set<(...args: T) => void>


type Args<T extends keyof ListenMap> = ListenMap[T] extends Set<infer U extends (...arg: any[]) => void> ? Parameters<U> : any[]

export class _EventBus<T extends ListenMap> {
    #listeners: T = {} as T;
    static #instance: _EventBus<ListenMap>|null =null;

    private constructor() {
    }
    static getInstance(){
        if(!this.#instance){
            this.#instance=new _EventBus()
        }
        return this.#instance
    }
    create<T extends ListenMap>(){
        return new _EventBus<T>()
    }
    on<K extends keyof T>(m: K, fun: (...args: Args<K & string>) => void) {

        if(m==='*'){
            Object.keys(this.#listeners).forEach(v=>{
                this.#listeners[v].add(fun)
            })
        }else {
            let n = (this.#listeners[m] || new Set()).add(fun);
            this.#listeners = {
                ...this.#listeners, [m]: n
            }
        }

    }

    emit<K extends keyof T>(e: K, ...args: Args<K & string>) {
        let listener = this.#listeners[e];
        if (listener) {
            listener.forEach((v) => {
                v(...args)
            })
        }
    }


    off<K extends keyof T>(event: K, cb: (...args: any[]) => void): void
    off<K extends keyof T>(eventName: K): void
    off(): void
    off<K extends keyof T>(event?: K, cb?: (...args: Args<T & string>) => void) {
        if (!event && !cb) {
            this.#listeners = {} as T
        }
        if (event && !cb) {
            delete this.#listeners[event]
            return
        }
        if (event && cb) {
            if(this.#listeners[event]){
                this.#listeners[event].delete(cb)
                if(this.#listeners[event].size===0){
                    delete this.#listeners[event]
                }

            }

        }
    }

    once<K extends keyof T>(e: K, fun: (...args: Args<K & string>) => void) {
        const cb = (...args: Args<K & string>) => {
            fun(...args)
            this.off(e, cb)
        }

        this.on(e, cb)
    }
}


export const EventBus = _EventBus.getInstance()

