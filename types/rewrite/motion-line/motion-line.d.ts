import { RewriteItem } from "./item";
import { UserMotionMethods, UserMotionUnitType } from "./motion-addon";
export type MotionUnitType = "Text" | "Pause" | UserMotionUnitType;
export type MotionUnit = {
    type: MotionUnitType;
    args: Record<PropertyKey, unknown>;
};
export type MotionMethodLike = (...args: unknown[]) => MotionLine;
export interface MotionMethods {
    r(name: string, scene?: string): MotionLine;
    r(item: RewriteItem): MotionLine;
}
export interface MotionLine extends MotionMethods, Partial<UserMotionMethods> {
    motionLine: MotionUnit[];
}
export declare function rMotionLine(): MotionLine;
