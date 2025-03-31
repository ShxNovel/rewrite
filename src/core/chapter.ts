import { RewriteText } from './text';

export interface Talk {
    name: string;
    content: RewriteText[];
}

export type ChapterUnit = Talk;

export class Chapter<T extends string = never> {
    characters: Map<string, string | null> = new Map();
    cache: ChapterUnit[] = [];

    constructor(private readonly keys: T[] = []) {}

    use<U extends string>(name: U, title: string | null): Chapter<T | U> {
        this.characters.set(name, title);
        return new Chapter([...this.keys, name] as T[]);
    }

    one(name: typeof this.getKeys extends () => (infer U)[] ? U : never) {
        const that = this;

        function init(some: TemplateStringsArray, ...values: RewriteText[]) {
            const content: RewriteText[] = [];
            const talk: Talk = { name, content };
            console.log('xxx ', that);
            that.cache.push(talk);

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

    wrap<T extends Function>(this: ThisParameterType<T>, item: T): T {
        return item.bind(this);
    }

    getKeys(): T[] {
        return this.keys;
    }
}

/**
 *  import { one } from "./one";
 *  type characters = typeof file.getKeys extends () => (infer U)[] ? U : never;
 *  const character = one<characters>;
 *  const file = new Chapter().use("a", "xxx");
 *  const A = character("a");
 *  A `some` `text` ``;
 */
