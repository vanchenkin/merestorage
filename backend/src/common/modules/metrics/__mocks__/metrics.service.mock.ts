import { MetricsService } from "../metrics.service";

export const MetricsServiceMock: MetricsService = {
    createMetric: jest.fn(),
};
