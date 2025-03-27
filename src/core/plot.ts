import { makeArgs, mergeArgs } from "./tools";
import { rewritePush } from "./rewrite";

import type { TextLine } from "./text-line";
import { rTextLine } from "./text-line";
import { rMotionLine, type MotionLine } from "./motion-line";

export type RewriteInfo = {
    title?: string;
    icon?: string;
};

/**
 * Creates a plot information object;
 * It can be used by {@link RewritePlot.use}.
 */
export function rInfo(userArgs: Partial<RewriteInfo>): Partial<RewriteInfo> {
    return makeArgs({}, userArgs);
}

export type RewritePlotAttribute = {
    /** The type of plot, defaults to "Talk" */
    type: "Talk" | "Aside" | "Choice";

    label?: string;
} & RewriteInfo;

export type RewritePlotLine = {
    text: TextLine;
    motion: MotionLine;
};

export type RewritePlot = RewritePlotAttribute & RewritePlotLine & PlotMethods;

export type PlotMethods = {
    /**
     * Initializes a new plot instance
     * and pushes the plot to rewrite stack
     */
    make(args: Partial<RewritePlotLine>): RewritePlot;

    /**
     * With side-effects. \
     * Apply user arguments to current plot configuration
     */
    use(args: Partial<RewritePlotAttribute>): RewritePlot;
};

const PlotDefault: PlotMethods = {
    make(args = {}) {
        const result = mergeArgs(this as RewritePlot, args);
        rewritePush(result);
        return result;
    },

    use(args = {}) {
        return Object.assign(this as RewritePlot, args);
    },
};

export function rPlot(userArgs: Partial<RewritePlot>) {
    const defaultPlot: RewritePlot = {
        type: "Talk",

        text: rTextLine(),
        motion: rMotionLine(),

        ...PlotDefault,
    };

    return mergeArgs(defaultPlot, userArgs);
}
