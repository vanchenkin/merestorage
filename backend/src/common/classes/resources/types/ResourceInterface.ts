import { MetricType } from "../../../../../../common/types/MetricType";
import { DataType, QueryType } from "./resourceMapper";

export interface ResourceInterface {
    checkConnection: () => Promise<void>;
    getData: (query: QueryType, type: MetricType) => Promise<DataType>;
}
