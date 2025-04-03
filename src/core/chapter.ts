import { cache } from './cache';
import { makeEffect, Effect, EffectMethods } from './effect';
import { RewriteText, Text } from './text';

export type ChapterUnit = Text | Effect;

export type LinkText = (some: TemplateStringsArray, ...values: RewriteText[]) => LinkText;

export type ChapterInfo = {
    memory: ChapterUnit[];
};

export function chapter() {
    const memory: ChapterUnit[] = [];

    const context: ChapterInfo = { memory };

    cache.push(context);

    class Chapter {
        constructor() {}

        character(name: string | null): LinkText {
            function init(some: TemplateStringsArray, ...values: RewriteText[]) {
                const content: RewriteText[] = [];
                const talk: Text = { type: 'text', name, content };

                memory.push(talk);

                function link(some: TemplateStringsArray, ...values: RewriteText[]): LinkText {
                    const len = some.length;
                    content.push(some[0]);
                    for (let i = 1; i < len; i++) {
                        content.push(values[i - 1]);
                        content.push(some[i]);
                    }
                    return link;
                }
                return link(some, ...values);
            }
            return init;
        }

        effect(): EffectMethods {
            return makeEffect(context);
        }

        EndOfChapter(): ChapterInfo {
            return context;
        }
    }

    return new Chapter();
}
