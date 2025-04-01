import { RewriteText } from './text';

export interface Talk {
    type: 'talk';
    name: string;
    content: RewriteText[];
}

export type ChapterUnit = Talk;

type LinkText = (some: TemplateStringsArray, ...values: RewriteText[]) => LinkText;
type ChapterInfo = {
    keys: string[];
    characters: Map<string, string | null>;
    memory: ChapterUnit[];
};

export function chapter() {
    const keys: string[] = [];
    const characters = new Map<string, string | null>();
    const memory: ChapterUnit[] = [];

    class Chapter<T extends string = never> {
        constructor() {}

        use<U extends string>(name: U & (U extends T ? never : U), title: string | null): Chapter<T | U> {
            keys.push(name);
            characters.set(name, title);
            return new Chapter();
        }

        character(name: T): LinkText {
            function init(some: TemplateStringsArray, ...values: RewriteText[]) {
                const content: RewriteText[] = [];
                const talk: Talk = { type: 'talk', name, content };
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

        EndOfChapter(): ChapterInfo {
            return { keys, characters, memory };
        }
    }

    return new Chapter();
}
