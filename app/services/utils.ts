
export function compose<T1, T2>(
    f: (x: T1) => T2
): (x: T1) => T2;
export function compose<T1, T2, T3>(
    f: (x: T2) => T3,
    g: (x: T1) => T2
): (x: T1) => T3;
export function compose<T1, T2, T3, T4>(
    f: (x: T3) => T4,
    g: (x: T2) => T3,
    h: (x: T1) => T2
): (x: T1) => T4;
export function compose<T1, T2, T3, T4, T5>(
    f: (x: T4) => T5,
    g: (x: T3) => T4,
    h: (x: T2) => T3,
    k: (x: T1) => T2
): (x: T1) => T5;
export function compose<T1, T2, T3, T4, T5, T6>(
    f: (x: T5) => T6,
    g: (x: T4) => T5,
    h: (x: T3) => T4,
    k: (x: T2) => T3,
    l: (x: T1) => T2
): (x: T1) => T6;
export function compose<T1, T2, T3, T4, T5, T6, T7>(
    f: (x: T6) => T7,
    g: (x: T5) => T6,
    h: (x: T4) => T5,
    k: (x: T3) => T4,
    l: (x: T2) => T3,
    m: (x: T1) => T2
): (x: T1) => T7;
export function compose(fn1: any, ...fns: any[]): any {
    return fns.reduce((prevFn, nextFn) => (value: any) => prevFn(nextFn(value)), fn1);
}