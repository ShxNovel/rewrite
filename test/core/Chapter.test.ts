import { assert, expectTypeOf, assertType, expect, test, describe } from 'vitest';
import { Chapter } from '../../src/core/chapter.ts';
import { RewriteText } from '../../src/core/text.ts';

describe('text', () => {
    test('RewriteText', () => {
        function say() {
            return { a: 1 };
        }

        // @ts-expect-error
        assertType<RewriteText>(say());
    });
});

describe('Chapter', () => {
    test('type', () => {
        const file = new Chapter().use('aside', null).use('hero', 'name here');

        const character = file.one.bind(file) as typeof file.one;
        const x = character('aside'); // 旁白
        const you = character('hero'); // 旁白

        function say() {
            return { a: 1 };
        }

        // @ts-expect-error
        you`some${say()}``text```;
    });
});
