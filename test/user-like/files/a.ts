import { rInfo, rPlot } from "../../../src/core/plot";
import { useFlow } from "../../../src/core/rewrite";
import { rTextLine } from "../../../src/core/text-line";

const i1 = rInfo({ icon: "name", title: "title" });
const i2 = rInfo({ icon: "name", title: "title2" });
const p1 = rPlot({ icon: "name", title: "title3" });

const p2 = p1.aside
    .begin()
    .use(i1)
    .useText(rTextLine().text("Hello").pause(1000).text(" World"));

const p3 = p2.aside.use(i2).begin();
