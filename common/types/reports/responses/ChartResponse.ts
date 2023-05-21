export type NumberArr = {
    date: string;
    value: number;
}[];

export type ObjectArr = {
    date: string;
    value: Record<string, number>;
}[];

export type ChartResponse = NumberArr | ObjectArr;

export type ChartValueType = {
    date: string;
    value: number;
    type?: string | undefined;
}[];
