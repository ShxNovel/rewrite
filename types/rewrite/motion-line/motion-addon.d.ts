import type { MotionMethodLike } from "./motion-line";
export interface UserMotionMethods {
}
export type UserMotionUnitType = "__some__";
export declare const MotionAddon: UserMotionMethods;
export declare function addMotionMethod(name: string, fn: MotionMethodLike): void;
