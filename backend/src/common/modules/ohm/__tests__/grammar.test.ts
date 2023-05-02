import { NotFoundException } from "@nestjs/common";
import { Metric, MetricData, MetricType } from "@prisma/client";
import {
    NumberArr,
    ObjectArr,
} from "../../../../../../common/types/reports/responses/ChartResponse";
import { MetricsService } from "../../../../routes/metrics/metrics.service";
import { ResourcesService } from "../../../../routes/resources/resources.service";
import { PrismaService } from "../../database/prisma.service";
import { PgBossService } from "../../pgboss/pgboss.service";
import { OhmService } from "../ohm.service";

jest.mock("../../database/prisma.service");
jest.mock("../../pgboss/pgboss.service");
jest.mock("../../../../routes/resources/resources.service");
jest.mock("../../../../routes/metrics/metrics.service");

let service: OhmService;
let metricsService: MetricsService;

beforeEach(() => {
    metricsService = new MetricsService(
        new PrismaService(),
        new ResourcesService(new PrismaService()),
        new PgBossService()
    );
    service = new OhmService(metricsService);
});

describe("Парсинг - число", () => {
    it("число", () => {
        expect(service.matchNumber("123")).toBeUndefined();
    });

    it("число и буквы", () => {
        expect(service.matchNumber("123awdawd")).not.toBeUndefined();
    });

    it("идентификатор массив", () => {
        expect(service.matchNumber("Number_23nwakdb1")).not.toBeUndefined();
    });

    describe("математика", () => {
        it("сложение", () => {
            expect(service.matchNumber("1+2")).toBeUndefined();
        });

        it("вычитание", () => {
            expect(service.matchNumber("1- 2")).toBeUndefined();
        });

        it("умножение", () => {
            expect(service.matchNumber("1 *2")).toBeUndefined();
        });

        it("деление", () => {
            expect(service.matchNumber("1 / 2")).toBeUndefined();
        });
    });

    it("функции суммы - число", () => {
        expect(service.matchNumber("sum(Number_23nwakdb1)")).toBeUndefined();
    });

    it("функции суммы - объект", () => {
        expect(
            service.matchNumber("sum(Object_23nwakdb1)")
        ).not.toBeUndefined();
    });

    it("функции суммы c ошибкой", () => {
        expect(service.matchNumber("sum(awd123)")).not.toBeUndefined();
    });

    describe("Сложные выражения", () => {
        it("Сложные выражения - 1", () => {
            expect(
                service.matchNumber("sum(sum(Object_test)) ")
            ).toBeUndefined();
        });
        it("Сложные выражения - 2", () => {
            expect(
                service.matchNumber("((sum(Number_test))) ")
            ).toBeUndefined();
        });
        it("Сложные выражения - 3", () => {
            expect(
                service.matchNumber("4/(1+1)*2/2+1*2+(12)*(2)+35 ")
            ).toBeUndefined();
        });
        it("Сложные выражения - 4", () => {
            expect(
                service.matchNumber("(sum(Number_test+5)*2 + (15*3))")
            ).toBeUndefined();
        });
    });
});

describe("Парсинг - массив чисел", () => {
    it("число", () => {
        expect(service.matchNumberArr("123")).not.toBeUndefined();
    });

    it("число и буквы", () => {
        expect(service.matchNumberArr("123awdawd")).not.toBeUndefined();
    });

    it("идентификатор массив", () => {
        expect(service.matchNumberArr("Number_23nwakdb1")).toBeUndefined();
    });

    describe("идентификаторы числа - математика", () => {
        it("сложение", () => {
            expect(
                service.matchNumberArr(
                    "sum(Number_23nwakdb1) + Number_23nwakdb1"
                )
            ).toBeUndefined();
        });

        it("вычитание", () => {
            expect(
                service.matchNumberArr(
                    "Number_23nwakdb1- sum( Number_23nwakdb1)"
                )
            ).toBeUndefined();
        });

        it("умножение", () => {
            expect(
                service.matchNumberArr(
                    "avg(Number_23nwakdb1) *Number_23nwakdb1"
                )
            ).toBeUndefined();
        });

        it("деление", () => {
            expect(
                service.matchNumberArr(
                    "avg(Number_23nwakdb1) / Number_23nwakdb1"
                )
            ).toBeUndefined();
        });
    });

    it("функции суммы - число", () => {
        expect(
            service.matchNumberArr("sum(Number_23nwakdb1)")
        ).not.toBeUndefined();
    });

    it("функции суммы - объект", () => {
        expect(service.matchNumberArr("sum(Object_23nwakdb1)")).toBeUndefined();
    });

    it("функции суммы c ошибкой", () => {
        expect(service.matchNumberArr("sum(awd123)")).not.toBeUndefined();
    });

    it("функции суммы c математикой", () => {
        expect(
            service.matchNumberArr("sum(Object_23nwakdb1+24)")
        ).toBeUndefined();
    });

    describe("Сложные выражения", () => {
        it("Сложные выражения - 2", () => {
            expect(service.matchNumberArr("sum(Object_test) ")).toBeUndefined();
        });
        it("Сложные выражения - 4", () => {
            expect(
                service.matchNumberArr("sum(Object_test+5)*2 + (15*3)")
            ).toBeUndefined();
        });
    });
});

describe("Трансформация", () => {
    beforeEach(() => {
        metricsService.getByName = jest.fn(async (name) => {
            if (name === "name1")
                return {
                    type: MetricType.Number,
                    name: "name1",
                } as Metric;
            else if (name === "name2")
                return {
                    type: MetricType.Object,
                    name: "name2",
                } as Metric;
            else throw new NotFoundException("metric not found");
        });
    });

    it("число", async () => {
        expect.assertions(1);
        expect(await service.transformMetricNames("$name1")).toBe(
            "Number_name1"
        );
    });

    it("объект", async () => {
        expect.assertions(1);
        expect(await service.transformMetricNames("$name2")).toBe(
            "Object_name2"
        );
    });

    it("сложное выражение", async () => {
        expect.assertions(1);
        expect(
            await service.transformMetricNames("1 + $name1 + sum($name2)")
        ).toBe("1 + Number_name1 + sum(Object_name2)");
    });
});

describe("Вычисление", () => {
    beforeEach(() => {
        metricsService.getByName = jest.fn(async (name) => {
            if (name === "name1")
                return {
                    id: 1,
                    type: MetricType.Number,
                    name: "name1",
                } as Metric;
            else if (name === "name2")
                return {
                    id: 2,
                    type: MetricType.Object,
                    name: "name2",
                } as Metric;
            else throw new NotFoundException("metric not found");
        });

        metricsService.getMetricData = jest.fn(async (id) => {
            if (id === 1)
                return [
                    {
                        id: 1,
                        createdAt: new Date(),
                        data: 1,
                        metricId: 1,
                    },
                    {
                        id: 2,
                        createdAt: new Date(),
                        data: 4,
                        metricId: 1,
                    },
                ] as MetricData[];
            else if (id === 2)
                return [
                    {
                        id: 1,
                        createdAt: new Date(),
                        data: {
                            t1: 1,
                            t2: 5,
                        },
                        metricId: 1,
                    },
                    {
                        id: 2,
                        createdAt: new Date(),
                        data: {
                            t1: 0,
                            t2: 3,
                        },
                        metricId: 1,
                    },
                ] as MetricData[];
            else throw new NotFoundException("metric not found");
        });
    });

    describe("Калькулятор", () => {
        it("Тест1", async () => {
            expect.assertions(1);
            expect(
                await service.evalNumber("((10.5/3.4)/3.5+(20/6.3)/2.6)/4.2")
            ).toBeCloseTo(0.500799);
        });

        it("Тест2", async () => {
            expect.assertions(1);
            expect(
                await service.evalNumber("((5*4-9/4)+4*5.3)*34/10")
            ).toBeCloseTo(132.43);
        });

        it("Тест3", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("15*2/0")).toBeCloseTo(Infinity);
        });

        it("Тест4", async () => {
            expect.assertions(1);
            expect(
                await service.evalNumber("((3)*((5)*(6)/(2)))*(4)")
            ).toBeCloseTo(180);
        });

        it("Тест5", async () => {
            expect.assertions(1);
            expect(
                await service.evalNumber("(0.5+1.5)/((1.2 - 0.8) * 5)")
            ).toBeCloseTo(1);
        });

        it("Тест6", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("3")).toBeCloseTo(3);
        });
    });

    describe("Агрегация массива чисел в число", () => {
        it("Сумма", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("sum($name1)")).toBeCloseTo(5);
        });

        it("Минимум", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("min($name1)")).toBeCloseTo(1);
        });

        it("Максимум", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("max($name1)")).toBeCloseTo(4);
        });

        it("Среднее", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("avg($name1)")).toBeCloseTo(2.5);
        });

        it("Медиана", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("median($name1)")).toBeCloseTo(2.5);
        });
    });

    const makeExpectNumberArr = (arr: NumberArr) => {
        return arr.map((val) => val.value);
    };

    describe("Операции с массивом чисел", () => {
        it("Сумма", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("$name1+5/2"))
            ).toEqual([3.5, 6.5]);
        });

        it("Умножение", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("$name1*2"))
            ).toEqual([2, 8]);
        });
    });

    const makeExpectObjectArr = (arr: ObjectArr) => {
        return arr.map((val) => Object.values(val.value));
    };

    describe("Операции с массивом объектов", () => {
        it("Сумма", async () => {
            expect.assertions(1);
            expect(
                makeExpectObjectArr(await service.evalObjectArr("$name2+1"))
            ).toEqual([
                [2, 6],
                [1, 4],
            ]);
        });
        it("Умножение", async () => {
            expect.assertions(1);
            expect(
                makeExpectObjectArr(await service.evalObjectArr("$name2*2"))
            ).toEqual([
                [2, 10],
                [0, 6],
            ]);
        });
    });

    describe("Преобразование из массива объектов в массив чисел", () => {
        it("Сумма", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("sum($name2)"))
            ).toEqual([6, 3]);
        });

        it("Минимум", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("min($name2)"))
            ).toEqual([1, 0]);
        });

        it("Максимум", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("max($name2)"))
            ).toEqual([5, 3]);
        });

        it("Среднее", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(await service.evalNumberArr("avg($name2)"))
            ).toEqual([3, 1.5]);
        });

        it("Медиана", async () => {
            expect.assertions(1);
            expect(
                makeExpectNumberArr(
                    await service.evalNumberArr("median($name2)")
                )
            ).toEqual([3, 1.5]);
        });
    });

    describe("Преобразование из объекта в число", () => {
        it("Сумма", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("sum(sumObject($name2))")).toEqual(
                9
            );
        });
        it("Минимум", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("sum(minObject($name2))")).toEqual(
                3
            );
        });
        it("Максимум", async () => {
            expect.assertions(1);
            expect(await service.evalNumber("sum(maxObject($name2))")).toEqual(
                6
            );
        });
    });
});
