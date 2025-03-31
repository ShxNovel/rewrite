export interface MotionAddonType {}
export interface RewriteMotionType extends MotionAddonType {
    pause: never;
}

export type RewriteMotion = {
    type: keyof RewriteMotionType;
    args: Record<PropertyKey, unknown>;
};
