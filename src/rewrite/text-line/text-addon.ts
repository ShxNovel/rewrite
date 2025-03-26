import type { TextMethodLike } from "./text-line";

export interface UserTextMethods {}

export type UserTextUnitType = "__some__";

export const TextAddon: UserTextMethods = {};

export function addTextMethod(name: string, fn: TextMethodLike) {
    Reflect.set(TextAddon, name, fn);
}
