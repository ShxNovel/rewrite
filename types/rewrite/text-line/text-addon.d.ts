import type { TextMethodLike } from "./text-line";
export interface UserTextMethods {
}
export type UserTextUnitType = "__some__";
export declare const TextAddon: UserTextMethods;
export declare function addTextMethod(name: string, fn: TextMethodLike): void;
