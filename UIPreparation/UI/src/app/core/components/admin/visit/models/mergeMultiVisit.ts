import { MultiVisiters } from "../../multiVisiters/models/MultiVisiters";
import { Visit } from "./Visit";

export interface MergeMultiVisit {
    visit: Visit;
    multiVisiters: MultiVisiters[];
    animated:boolean;
}