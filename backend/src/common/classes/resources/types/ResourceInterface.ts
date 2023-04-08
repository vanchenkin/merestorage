import { MetricType } from "../../../../../../common/types/MetricType";
import { MetricDataType } from "./resourceMapper";

export interface ResourceInterface<T> {
    checkConnection: () => Promise<void>;
    getData: (query: T, type: MetricType) => Promise<MetricDataType>;
}
