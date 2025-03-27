import type { Plot } from "./plot";

export type RewriteFile = {
    name: string;
    path: string;
    content: Plot[];
    plotFlow: boolean;
};

export const RewriteFiles: RewriteFile[] = [];

let nowFile: RewriteFile = {
    name: "",
    path: "",
    content: [],
    plotFlow: false,
};

function initFile(name: string = "", path: string = "") {
    nowFile = {
        name,
        path,
        content: [],
        plotFlow: false,
    };
}

export function useFlow(enable: boolean = true) {
    nowFile.plotFlow = enable;
}

export function rewriteBegin(name: string, path: string) {
    initFile(name, path);
}

export function rewritePush(plot: Plot) {
    nowFile.content.push(plot);
}

export function rewriteEnd() {
    RewriteFiles.push(nowFile);
    initFile();
}
