import { RewriteText } from './text';

export interface Talk {
    name: string;
    content: RewriteText[];
}

export type ChapterUnit = Talk;

export function chapter() {
    const characters = new Map<string, string | null>();
    const memory: ChapterUnit[] = [];

    class Chapter<T extends string = never> {
        constructor(readonly keys: T[] = []) {}

        /**
         * Adds a new character to the chapter with the specified name and title.
         * @param name - The name identifier for the character
         * @param title - The display title for the character, can be null
         */
        use<U extends string>(name: U, title: string | null): Chapter<T | U> {
            characters.set(name, title);
            return new Chapter([...this.keys, name] as T[]);
        }

        character(name: typeof this.getKeys extends () => (infer U)[] ? U : never) {
            function init(some: TemplateStringsArray, ...values: RewriteText[]) {
                const content: RewriteText[] = [];
                const talk: Talk = { name, content };
                memory.push(talk);

                function link(some: TemplateStringsArray, ...values: RewriteText[]) {
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

        getKeys(): T[] {
            return this.keys;
        }

        EndOfChapter() {
            return { characters, memory };
        }
    }

    return new Chapter();
}
