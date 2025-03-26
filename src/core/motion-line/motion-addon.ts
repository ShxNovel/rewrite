import type { MotionMethodLike } from "./motion-line";

export interface UserMotionMethods {}

export type UserMotionUnitType = "__some__";

export const MotionAddon: UserMotionMethods = {};

export function addMotionMethod(name: string, fn: MotionMethodLike) {
    Reflect.set(MotionAddon, name, fn);
}
