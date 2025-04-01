export interface MotionAddonType {}
export interface RewriteMotionType extends MotionAddonType {
    goto: never;
    move: never;
    opacity: never;
}

export type RewriteMotion = {
    type: keyof RewriteMotionType;
    args: Record<PropertyKey, unknown>;
};
