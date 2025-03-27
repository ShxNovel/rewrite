import { TextAddon, UserTextMethods, UserTextUnitType } from "./text-addon";

export type TextUnitType = "Text" | "Pause" | UserTextUnitType;

export type TextUnit = {
    type: TextUnitType;
    args: Record<PropertyKey, unknown>;
};

export type TextMethodLike = (...args: unknown[]) => TextLine;

export interface TextMethods {
    text(word: string): TextLine;
    pause(ms: number): TextLine;
}

export interface TextLine extends TextMethods, Partial<UserTextMethods> {
    textLine: TextUnit[];
}

const TextMethodsImpl = {
    text(this: TextLine, word: string) {
        this.textLine.push({
            type: "Text",
            args: { word },
        });
        return this;
    },
    pause(this: TextLine, ms: number) {
        this.textLine.push({
            type: "Pause",
            args: { ms },
        });
        return this;
    },
};

export function rTextLine() {
    const result: TextLine = {
        textLine: [] as TextUnit[],

        ...TextMethodsImpl,
        ...TextAddon,
    };

    return result;
}
