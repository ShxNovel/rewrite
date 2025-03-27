export function rewriteClone<T>(target: T): T {
    const seen = new WeakSet();

    function clone(obj: unknown): unknown {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        if (seen.has(obj)) {
            return obj;
        }
        seen.add(obj);
        if (Array.isArray(obj)) {
            return obj.map((item) => clone(item));
        }
        const result = {} as Record<PropertyKey, unknown>;
        for (const key of Object.keys(obj)) {
            result[key] = clone((obj as any)[key]);
        }
        return result;
    }

    return clone(target) as T;
}

export function makeArgs<T1, T2>(defaultArgs: T1, userArgs: T2) {
    return Object.assign(
        {},
        rewriteClone(defaultArgs),
        rewriteClone(userArgs)
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
            result[key] = rewriteClone(value);
        }
    }

    return result as T1 & T2;
}
