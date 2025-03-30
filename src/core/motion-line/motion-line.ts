import { RewriteItem } from "./item";
import {
    MotionAddon,
    UserMotionMethods,
    UserMotionUnitType,
} from "./motion-addon";

export interface MotionUnitType extends UserMotionUnitType {}

export type MotionUnit = {
    type: keyof MotionUnitType;
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

const MotionMethodsImpl = {
    /** side effect */
    r(this: MotionLine, arg1: RewriteItem | string, scene: string = "main") {
        if (this.motionLine.length === 0) {
            throw new Error(
                "MotionLine.r() called with no previous motion unit"
            );
        }

        if (typeof arg1 === "object") {
            scene = arg1.scene ?? "main";
            arg1 = arg1.name;
        }

        const unit = this.motionLine[this.motionLine.length - 1];
        unit.args.name = arg1;
        unit.args.scene = scene;

        return this;
    },
};

export function rMotionLine() {
    const result: MotionLine = {
        motionLine: [] as MotionUnit[],

        ...MotionMethodsImpl,
        ...MotionAddon,
    };

    return result;
}
