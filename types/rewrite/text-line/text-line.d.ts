import { UserTextMethods, UserTextUnitType } from "./text-addon";
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
export declare function rTextLine(): TextLine;
