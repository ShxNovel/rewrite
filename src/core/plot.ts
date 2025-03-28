import { makeArgs, mergeArgs } from "./tools";
import { rewritePush } from "./rewrite";

import type { TextLine } from "./text-line";
import { rTextLine } from "./text-line";
import { rMotionLine, type MotionLine } from "./motion-line";

export type Info = {
    title?: string;
    icon?: string;
};

/**
 * Creates a plot information object;
 * It can be used by {@link Plot.use}.
 */
export function rInfo(userArgs: Partial<Info>): Partial<Info> {
    return makeArgs({}, userArgs);
}

export type PlotAttribute = {
    /** The type of plot, defaults to "Talk" */
    type: "Talk" | "Aside" | "Choice";

    label?: string;
} & Info;

export type PlotLine = {
    text: TextLine;
    motion: MotionLine;
};

export type BasicPlot = PlotAttribute & PlotLine;
export type Plot = BasicPlot & PlotEffect & PlotPure;

export type PlotPure = {
    /** Creates a new `Talk` plot instance. */
    get talk(): Plot;
    /** Creates a new `Aside` plot instance. */
    get aside(): Plot;
    /** Creates a new `Choice` plot instance. */
    get choice(): Plot;
};

export type PlotEffect = {
    /**
     * Initializes a new plot instance
     * and pushes the plot to rewrite stack
     */
    begin(args?: Partial<BasicPlot>): Plot;
    use(args: Partial<BasicPlot>): Plot;
    useText(args: TextLine): Plot;
    useMotion(args: MotionLine): Plot;
    useInfo(args: Partial<PlotAttribute>): Plot;
};

const PlotEffect: PlotEffect = {
    begin(this: Plot, args = {}) {
        const base = rPlot();
        const result = mergeArgs(mergeArgs(base, this), args);
        rewritePush(result);
        return result;
    },
    use(this: Plot, args) {
        return Object.assign(this, args);
    },

    useText(this: Plot, args) {
        const object: Partial<PlotLine> = { text: args };
        Object.assign(this, object);
        return this;
    },

    useMotion(this: Plot, args) {
        const object: Partial<PlotLine> = { motion: args };
        Object.assign(this, object);
        return this;
    },

    useInfo(this: Plot, args) {
        return Object.assign(this, args);
    },
};

export function rPlot(userArgs: Partial<Plot> = {}): Plot {
    const ResultPure: PlotPure = Object.defineProperties({} as PlotPure, {
        talk: {
            get() {
                const base = rPlot();
                const temp: Plot = mergeArgs(base, this);
                return temp.useInfo({ type: "Talk" });
            },
            enumerable: false,
        },
        aside: {
            get() {
                const base = rPlot();
                const temp: Plot = mergeArgs(base, this);
                return temp.useInfo({ type: "Aside" });
            },
            enumerable: false,
        },
        choice: {
            get() {
                const base = rPlot();
                const temp: Plot = mergeArgs(base, this);
                return temp.useInfo({ type: "Choice" });
            },
            enumerable: false,
        },
    });

    const result = Object.assign(ResultPure, {
        type: "Talk" as PlotAttribute["type"],

        text: rTextLine(),
        motion: rMotionLine(),

        ...PlotEffect,
    }) satisfies Plot;

    return mergeArgs(result, userArgs);
}
