export type RewriteItem = {
    scene?: string;
    name: string;
};

export function rItem(args: RewriteItem): RewriteItem {
    const result: Partial<RewriteItem> = { scene: "main" };
    return Object.assign(result, args);
}
