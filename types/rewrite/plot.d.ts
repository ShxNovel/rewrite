import type { TextLine } from "./text-line";
import { type MotionLine } from "./motion-line";
export type RewriteInfo = {
    title?: string;
    icon?: string;
};
/**
 * Creates a plot information object;
 * It can be used by {@link RewritePlot.use}.
 */
export declare function rInfo(userArgs: Partial<RewriteInfo>): Partial<RewriteInfo>;
export type RewritePlotAttribute = {
    /** The type of plot, defaults to "Talk" */
    type: "Talk" | "Aside" | "Choice";
    label?: string;
} & RewriteInfo;
export type RewritePlotLine = {
    text: TextLine;
    motion: MotionLine;
};
export type RewritePlot = RewritePlotAttribute & RewritePlotLine & {
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
export declare function rPlot(userArgs: Partial<RewritePlot>): {
    /** The type of plot, defaults to "Talk" */
    type: "Talk" | "Aside" | "Choice";
    label?: string;
} & RewriteInfo & RewritePlotLine & {
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
} & Partial<RewritePlot>;
