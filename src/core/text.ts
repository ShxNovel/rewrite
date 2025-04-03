export interface TextAddonType {}
export interface RewriteTextType {
    pause: never;
    instant: never;
    until: never;
}

export type RewriteText =
    | string
    | {
          type: keyof RewriteTextType | keyof TextAddonType;
          args: Record<PropertyKey, unknown>;
      };

export interface Text {
    type: 'text';
    name: string | null;
    content: RewriteText[];
}

/** @param ms The duration of the pause in milliseconds */
export function pause(ms: number): RewriteText {
    return { type: 'pause', args: { ms } };
}

/** @param str The string content to be displayed */
export function instant(str: string): RewriteText {
    return { type: 'instant', args: { str } };
}

export function until(str: string | null): RewriteText {
    return { type: 'until', args: { str } };
}
