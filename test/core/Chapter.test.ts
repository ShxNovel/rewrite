import { assert, expectTypeOf, assertType, expect, test, describe } from 'vitest';
import { chapter } from '../../src/core/chapter.ts';
import { pause, RewriteText } from '../../src/core/text.ts';

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
        const file = chapter().use('aside', null).use('hero', 'name here');

        const { character, EndOfChapter } = file;
        const x = character('aside'); // 旁白
        const you = character('hero'); // 你

        function say() {
            return { a: 1 };
        }

        // @ts-expect-error
        x`some${say()}``text```;
        // @ts-expect-error
        you`some${say()}``text```;

        const res = EndOfChapter();
        expect(res.keys).toEqual(['aside', 'hero']);
    });

    test('content', () => {
        const file = chapter().use('aside', null).use('hero', 'name here');
        const { character, EndOfChapter } = file;

        const x = character('aside');
        const you = character('hero');

        x`some``text```;
        you`some``text```;

        const res = EndOfChapter();
        expect(res.memory).toMatchSnapshot();
    });

    test('pause', () => {
        const file = chapter().use('aside', null).use('hero', 'name here');
        const { character, EndOfChapter } = file;

        const x = character('aside');
        const you = character('hero');

        x`some${pause(10)}``${pause(10)}${pause(10)}text${pause(10)}``${pause(10)}`;
        you`some``text```;

        const res = EndOfChapter();
        expect(res.memory).toMatchSnapshot();
    });

    test('duplicated name', () => {
        const { use, character, EndOfChapter } = chapter();

        // @ts-expect-error
        use('some', null).use('some', null);

        const res = EndOfChapter();
        expect(res).toMatchSnapshot();
    });
});
