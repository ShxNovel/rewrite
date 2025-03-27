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

test("rPlot.use", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p2 = rPlot({ icon: "name", title: "title" });

    const p1use = p1.use({ label: "label", icon: "icon" });
    const p2use = p2.use({ label: "label", icon: "icon" });

    expect(p1use).toEqual(p2use);
    expect(p1use).toEqual(p1use.use({ label: "label", icon: "icon" }));
});

test("rPlot.make", () => {
    const p1 = rPlot({ icon: "name", title: "title" });
    const p2 = rPlot({ icon: "name", title: "title" });

    const p1amke = p1.make({
        text: rTextLine(),
        motion: rMotionLine(),
    });
    const p2amke = p2.make({
        text: rTextLine(),
        motion: rMotionLine(),
    });

    expect(p1amke).toEqual(p2amke);

    const t1 = p1amke.make({
        text: rTextLine().text("11"),
        motion: rMotionLine(),
    });

    const t2 = p2amke.make({
        text: rTextLine().text("11"),
        motion: rMotionLine(),
    });

    expect(t1).toEqual(t2);
});
