import { ConflictException } from "@nestjs/common";

export function handleDuplicateError(error: unknown): void {
    if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ER_DUP_ENTRY"
    ) {
        throw new ConflictException(
            "Un recurso con ese mismo valor ya existe."
        );
    }
}
