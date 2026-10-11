import { Transform, Type } from "class-transformer";

export function ToArray() {
    return Transform(({ value }) =>
        value === undefined
            ? undefined
            : Array.isArray(value)
                ? value
                : [value]
    );
}
