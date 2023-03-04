import { Transform, TransformFnParams } from "class-transformer";

export const Trim = (): PropertyDecorator => {
    return Transform(({ value }: TransformFnParams) => value?.trim());
};
