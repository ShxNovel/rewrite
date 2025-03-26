export declare function makeArgs<T1, T2>(defaultArgs: T1, userArgs: T2): {} & T1 & T2;
export declare function mergeArgs<T1 extends object, T2 extends object>(defaultArgs: T1, userArgs: T2): T1 & T2;
