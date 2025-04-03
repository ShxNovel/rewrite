import type { ChapterInfo } from './chapter';

// addon
const Addon = {};

export interface EffectAddonType {}

export type EffectAddonMethods<T> = {
    [K in keyof EffectAddonType]: (...args: unknown[]) => EffectBasicMethods<T>;
};

export function addonEffect(addons: EffectAddonMethods<unknown>): void {
    Object.assign(Addon, addons);
}

// main
export interface EffectType {
    goto: never;

    // aim
    aim: never;
    move: never;
    opacity: never;
}

export type RewriteEffect = {
    type: keyof EffectType | keyof EffectAddonType;
    args: Record<PropertyKey, unknown>;
};

export interface Effect {
    type: 'motion';
    content: RewriteEffect[];
}

export type AimState = { _aimed: true };
export type WhenAimed<T> = T extends AimState ? EffectBasicMethods<T> : never;

export interface EffectBasicMethods<T = unknown> {
    goto(anchor: string): this;
    aim(name: string, scene?: string): EffectBasicMethods<AimState>;
    move(this: WhenAimed<T>): this;
    opacity(this: WhenAimed<T>, value: number): this;
}

export type EffectMethods<T = unknown> = EffectBasicMethods<T> | EffectAddonMethods<T>;

export function makeEffect(context: ChapterInfo): EffectMethods<unknown> {
    const item: Effect = {
        type: 'motion',
        content: [],
    };

    context.memory.push(item);

    function builder<T = unknown>(): EffectMethods<T> {
        return {
            goto(anchor: string) {
                const result: RewriteEffect = { type: 'goto', args: { anchor } };
                item.content.push(result);
                return this;
            },

            aim(name: string, scene: string = 'main') {
                const result: RewriteEffect = { type: 'aim', args: { name, scene } };
                item.content.push(result);
                return this as EffectBasicMethods<AimState>;
            },

            move(this: WhenAimed<T>) {
                const result: RewriteEffect = { type: 'move', args: {} };
                item.content.push(result);
                return this;
            },

            opacity(this: WhenAimed<T>, value: number) {
                const result: RewriteEffect = { type: 'opacity', args: { value } };
                item.content.push(result);
                return this;
            },
            ...(Addon as EffectAddonMethods<T>),
        };
    }

    return builder();
}
