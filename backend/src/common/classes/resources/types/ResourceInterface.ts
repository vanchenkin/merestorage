import { MetricType } from "../../../../../../common/types/MetricType";
import { MetricDataType } from "../../../../../../common/types/resources/resourceMapper";

export interface ResourceInterface<T> {
    checkConnection: () => Promise<void>;
    getData: (query: T, type: MetricType) => Promise<MetricDataType>;
}
