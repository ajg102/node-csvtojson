import { Converter } from "./Converter";
export default function (csvRows: string[][], conv: Converter): Promise<JSONResult[]>;
export declare type JSONResult = {
    [key: string]: any;
};
