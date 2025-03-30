import type { TextMethodLike } from "./text-line";

export interface UserTextUnitType {}

export interface UserTextMethods {}

export const TextAddon: UserTextMethods = {};

export function addTextMethod(name: string, fn: TextMethodLike) {
    Reflect.set(TextAddon, name, fn);
}
