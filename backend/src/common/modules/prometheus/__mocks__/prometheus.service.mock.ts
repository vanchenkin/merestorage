import { PrometheusService } from "../prometheus.service";

export const PrometheusServiceMock: PrometheusService = {
    createMetric: jest.fn(),
};
