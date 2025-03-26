export function makeArgs<T1, T2>(defaultArgs: T1, userArgs: T2) {
    return Object.assign(
        {},
        structuredClone(defaultArgs),
        structuredClone(userArgs)
    );
}

export function mergeArgs<T1 extends object, T2 extends object>(
    defaultArgs: T1,
    userArgs: T2
): T1 & T2 {
    const merged = Object.assign({}, defaultArgs, userArgs);
    const result: Record<PropertyKey, unknown> = {};

    const keys = Reflect.ownKeys(merged);
    for (const key of keys) {
        const value = (merged as any)[key];

        if (typeof value === "function") {
            result[key] = value;
        } else {
            result[key] = structuredClone(value);
        }
    }

    return result as T1 & T2;
}
