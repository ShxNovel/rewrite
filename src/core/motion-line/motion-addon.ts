import type { MotionMethodLike } from "./motion-line";

export interface UserMotionUnitType {}

export interface UserMotionMethods {}

export const MotionAddon: UserMotionMethods = {};

export function addMotionMethod(name: string, fn: MotionMethodLike) {
    Reflect.set(MotionAddon, name, fn);
}
