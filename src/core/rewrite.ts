import type { RewritePlot } from "./plot";

const files = [];

let nowFile = {
    name: "",
    path: "",
    content: [] as RewritePlot[],
};

function initFile(name: string = "", path: string = "") {
    nowFile = {
        name,
        path,
        content: [] as RewritePlot[],
    };
}

export function rewriteBegin(name: string, path: string) {
    initFile(name, path);
}

export function rewritePush(plot: RewritePlot) {
    nowFile.content.push(plot);
}

export function rewriteEnd() {
    files.push(nowFile);
    initFile();
}
