/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ResponseType } from "../../../../../common/types/reports/grammarMapper";
import {
    ChartResponse,
    NumberArr,
    ObjectArr,
} from "../../../../../common/types/reports/responses/ChartResponse";
import { getMedian } from "../../../../../common/utils/getMedian";
import { MetricsService } from "../../../routes/metrics/metrics.service";
import grammar, { GrammarSemantics } from "./grammars/grammar.ohm-bundle";

@Injectable()
export class OhmService {
    private readonly logger = new Logger(OhmService.name);

    private readonly semantics: GrammarSemantics;

    constructor(private metricsService: MetricsService) {
        this.semantics = grammar.createSemantics();
        this.createSemantic(metricsService);
    }

    private createSemantic(metricsService: MetricsService) {
        // TODO: make new row type - Object
        this.semantics.addOperation<
            Promise<ResponseType | Record<string, number>>
        >("eval()", {
            /** Number */
            async Number_add_plus(t1, _, t2) {
                return (await t1.eval()) + (await t2.eval());
            },
            async Number_add_minus(t1, _, t2) {
                return (await t1.eval()) - (await t2.eval());
            },
            async Number_mul_mult(t1, _, t2) {
                return (await t1.eval()) * (await t2.eval());
            },
            async Number_mul_div(t1, _, t2) {
                return (await t1.eval()) / (await t2.eval());
            },
            async Number_other_aggrSum(_1, t, _2) {
                const numberArr = (await t.eval()) as NumberArr;
                return numberArr.reduce((prev, cur) => {
                    return prev + cur.value;
                }, 0);
            },
            async Number_other_aggrAvg(_1, t, _2) {
                const numberArr = (await t.eval()) as NumberArr;

                return (
                    numberArr.reduce((prev, cur) => {
                        return prev + cur.value;
                    }, 0) / numberArr.length
                );
            },
            async Number_other_aggrMin(_1, t, _2) {
                const numberArr = (await t.eval()) as NumberArr;
                return numberArr.reduce((prev, cur) => {
                    return Math.min(prev, cur.value);
                }, Infinity);
            },
            async Number_other_aggrMax(_1, t, _2) {
                const numberArr = (await t.eval()) as NumberArr;

                return numberArr.reduce((prev, cur) => {
                    return Math.max(prev, cur.value);
                }, -Infinity);
            },
            async Number_other_aggrMedian(_1, t, _2) {
                const numberArr = (await t.eval()) as NumberArr;

                return getMedian(numberArr.map((val) => val.value));
            },
            async Number_other_redSum(_1, t, _2) {
                const object = (await t.eval()) as Record<string, number>;

                return Object.values(object).reduce(
                    (prev, cur) => prev + cur,
                    0
                );
            },
            async Number_other_redMin(_1, t, _2) {
                const object = (await t.eval()) as Record<string, number>;

                return Object.values(object).reduce(
                    (prev, cur) => Math.min(prev, cur),
                    Infinity
                );
            },
            async Number_other_redMax(_1, t, _2) {
                const object = (await t.eval()) as Record<string, number>;

                return Object.values(object).reduce(
                    (prev, cur) => Math.max(prev, cur),
                    -Infinity
                );
            },
            async Number_other_redAvg(_1, t, _2) {
                const object = (await t.eval()) as Record<string, number>;

                return (
                    Object.values(object).reduce((prev, cur) => prev + cur, 0) /
                    Object.values(object).length
                );
            },
            async Number_other_redMedian(_1, t, _2) {
                const object = (await t.eval()) as Record<string, number>;

                return getMedian(Object.values(object));
            },
            async Number_parsed_parens(_1, t, _2) {
                return t.eval();
            },
            async number(_) {
                return parseFloat(this.sourceString);
            },

            /** NumberArr */
            async NumberArr_plus_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value + a1,
                }));
            },
            async NumberArr_minus_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value - a1,
                }));
            },
            async NumberArr_mult_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value * a1,
                }));
            },
            async NumberArr_div_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value / a1,
                }));
            },
            async NumberArr_plus_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value + a1,
                }));
            },
            async NumberArr_minus_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value - a1,
                }));
            },
            async NumberArr_mult_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value * a1,
                }));
            },
            async NumberArr_div_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as NumberArr;
                return a2.map((v) => ({
                    ...v,
                    value: v.value / a1,
                }));
            },
            async NumberArr_parsed_parens(_1, t, _2) {
                return t.eval();
            },
            async NumberArr_other_aggrSum(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                return objectArr.map((object) => {
                    const value = Object.values(object.value).reduce(
                        (prev, cur) => prev + cur,
                        0
                    );

                    return {
                        ...object,
                        value,
                    };
                });
            },

            async NumberArr_other_aggrMin(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                return objectArr.map((object) => {
                    const value = Object.values(object.value).reduce(
                        (prev, cur) => Math.min(prev, cur),
                        Infinity
                    );

                    return {
                        ...object,
                        value,
                    };
                });
            },

            async NumberArr_other_aggrMax(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                return objectArr.map((object) => {
                    const value = Object.values(object.value).reduce(
                        (prev, cur) => Math.max(prev, cur),
                        -Infinity
                    );

                    return {
                        ...object,
                        value,
                    };
                });
            },

            async NumberArr_other_aggrAvg(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                return objectArr.map((object) => {
                    const sum = Object.values(object.value).reduce(
                        (prev, cur) => prev + cur,
                        0
                    );

                    return {
                        ...object,
                        value: sum / Object.values(object.value).length,
                    };
                });
            },

            async NumberArr_other_aggrMedian(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                return objectArr.map((object) => {
                    const value = getMedian(Object.values(object.value));

                    return {
                        ...object,
                        value,
                    };
                });
            },

            async ident_numberArr(_1, _2) {
                const metric = await metricsService.getByName(
                    this.sourceString.slice("Number_".length) as string
                );
                const data = await metricsService.getMetricData(metric.id);
                return data.map((v) => ({
                    date: v.createdAt.toLocaleString("ru", {
                        timeZone: "Europe/Moscow",
                    }),
                    value: v.data,
                })) as NumberArr;
            },

            /** ObjectArr */
            async ObjectArr_plus_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] += a1;
                    });
                });
                return a2;
            },
            async ObjectArr_minus_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] -= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_mult_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] *= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_div_l(t1, _, t2) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] /= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_plus_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] += a1;
                    });
                });
                return a2;
            },
            async ObjectArr_minus_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] -= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_mult_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] *= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_div_r(t2, _, t1) {
                const a1 = (await t1.eval()) as number;
                const a2 = (await t2.eval()) as ObjectArr;
                a2.forEach((v) => {
                    Object.keys(v.value).forEach((key) => {
                        v.value[key] /= a1;
                    });
                });
                return a2;
            },
            async ObjectArr_parsed_parens(_1, t, _2) {
                return t.eval();
            },

            async ident_objectArr(_1, _2) {
                const metric = await metricsService.getByName(
                    this.sourceString.slice("Object_".length) as string
                );
                const data = await metricsService.getMetricData(metric.id);
                return data.map((v) => ({
                    date: v.createdAt.toLocaleString("ru", {
                        timeZone: "Europe/Moscow",
                    }),
                    value: v.data,
                })) as ObjectArr;
            },

            /** Object */

            async Object_parsed_parens(_1, t, _2) {
                return t.eval();
            },
            async Object_other_aggrSum(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                const resObj: Record<string, number> = {};

                objectArr.forEach((object) => {
                    Object.entries(object.value).forEach((entry) => {
                        if (!resObj[entry[0]]) {
                            resObj[entry[0]] = entry[1];
                        } else {
                            resObj[entry[0]] += entry[1];
                        }
                    });
                });

                return resObj;
            },
            async Object_other_aggrMin(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                const resObj: Record<string, number> = {};

                objectArr.forEach((object) => {
                    Object.entries(object.value).forEach((entry) => {
                        if (!resObj[entry[0]]) {
                            resObj[entry[0]] = entry[1];
                        } else {
                            resObj[entry[0]] = Math.min(
                                entry[1],
                                resObj[entry[0]]
                            );
                        }
                    });
                });

                return resObj;
            },
            async Object_other_aggrMax(_1, t, _2) {
                const objectArr = (await t.eval()) as ObjectArr;

                const resObj: Record<string, number> = {};

                objectArr.forEach((object) => {
                    Object.entries(object.value).forEach((entry) => {
                        if (!resObj[entry[0]]) {
                            resObj[entry[0]] = entry[1];
                        } else {
                            resObj[entry[0]] = Math.max(
                                entry[1],
                                resObj[entry[0]]
                            );
                        }
                    });
                });

                return resObj;
            },
        });
    }

    async transformMetricNames(query: string): Promise<string> {
        let newQuery = query;

        for (const match of newQuery.matchAll(/\$\w+/gi)) {
            const metric = await this.metricsService.getByName(
                match[0].slice(1)
            );
            newQuery = newQuery.replace(
                match[0],
                `${metric.type}_${metric.name}`
            );
        }

        return newQuery;
    }

    matchNumber(query: string): string | undefined {
        return grammar.match(query, "Number").message;
    }

    matchNumberArr(query: string): string | undefined {
        return grammar.match(query, "NumberArr").message;
    }

    matchObjectArr(query: string): string | undefined {
        return grammar.match(query, "ObjectArr").message;
    }

    async evalNumber(query: string): Promise<number> {
        const tranformedQuery = await this.transformMetricNames(query);

        try {
            return this.semantics(
                grammar.match(tranformedQuery, "Number")
            ).eval();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async evalNumberArr(query: string): Promise<NumberArr> {
        const tranformedQuery = await this.transformMetricNames(query);

        return this.semantics(grammar.match(tranformedQuery, "Chart")).eval();
    }

    async evalObjectArr(query: string): Promise<ObjectArr> {
        const tranformedQuery = await this.transformMetricNames(query);

        return this.semantics(
            grammar.match(tranformedQuery, "ObjectArr")
        ).eval();
    }

    async evalChart(query: string): Promise<ChartResponse> {
        const tranformedQuery = await this.transformMetricNames(query);

        try {
            return this.semantics(
                grammar.match(tranformedQuery, "Chart")
            ).eval();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}
