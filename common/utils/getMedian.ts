export const getMedian = (values: number[]) => {
    values.sort(function (a, b) {
        return a - b;
    });

    const half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];

    return (values[half - 1] + values[half]) / 2.0;
};
