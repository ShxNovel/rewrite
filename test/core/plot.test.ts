import { assert, expect, test } from "vitest";
import { rInfo, rPlot } from "../../src/core/plot";
import { rTextLine } from "../../src/core/text-line";
import { rMotionLine } from "../../src/core/motion-line";

test("rInfo", () => {
    const i1 = rInfo({ icon: "name", title: "title" });
    const i2 = rInfo({ icon: "name", title: "title" });

    expect(i1).toEqual(i2);
});

test("rPlot", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p2 = rPlot({ icon: "name", title: "title" });

    expect(p1).toEqual(p2);
});

test("rPlot.useInfo", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p2 = rPlot({ icon: "name", title: "title" });

    const p1use = p1.useInfo({ label: "label", icon: "icon" });
    const p2use = p2.useInfo({ label: "label", icon: "icon" });

    const i1 = rInfo({ icon: "name", title: "title" });

    expect(p1use).toEqual(p2use);
    expect(p1use).toEqual(p1use.useInfo({ label: "label", icon: "icon" }));
    expect(p1use).toEqual(p1use.useInfo(i1));
});

test("rPlot.begin", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p2 = rPlot({ icon: "name", title: "title" });

    const p1amke = p1.begin({
        text: rTextLine(),
        motion: rMotionLine(),
    });
    const p2amke = p2.begin({
        text: rTextLine(),
        motion: rMotionLine(),
    });

    const t1 = p1amke.begin({
        text: rTextLine().text("11").pause(1000),
        motion: rMotionLine(),
    });

    const t2 = p2amke.begin({
        text: rTextLine().text("11").pause(1000),
        motion: rMotionLine(),
    });

    expect(p1amke).toEqual(p2amke);
    expect(t1).toEqual(t2);
});

test("rPlot.type", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p11 = p1.talk;
    const p21 = p11.aside;
    const p31 = p11.choice;

    // no side effect
    expect(p1).toStrictEqual(p11);
    expect(Object.is(p1, p11)).toEqual(false);

    // other check
    expect(p1).toMatchSnapshot();
    expect(p11).toMatchSnapshot();
    expect(p21).toMatchSnapshot();
    expect(p31).toMatchSnapshot();
});
