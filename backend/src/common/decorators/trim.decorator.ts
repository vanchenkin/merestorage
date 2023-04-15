import { Transform, TransformFnParams } from "class-transformer";

/**
 * Убирает пробелы из начала и конца строки
 */
export const Trim = (): PropertyDecorator => {
    return Transform(({ value }: TransformFnParams) => value?.trim());
};
