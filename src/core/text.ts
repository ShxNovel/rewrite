export interface TextAddonType {}
export interface RewriteTextType extends TextAddonType {
    pause: never;
    instant: never;
}

export type RewriteText =
    | string
    | {
          type: keyof RewriteTextType;
          args: Record<PropertyKey, unknown>;
      };

export function pause(ms: number): RewriteText {
    return { type: 'pause', args: { ms } };
}

export function instant(str: string): RewriteText {
    return { type: 'instant', args: { str } };
}
