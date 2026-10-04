import { ApiResponse } from "@nestjs/swagger";

export function ApiNoContentResponse() {
    return ApiResponse({
        status: 204,
        description: "Operación realizada correctamente."
    });
}

export function ApiBadRequestResponse() {
    return ApiResponse({
        status: 400,
        description: "Los datos proporcionados no son válidos."
    });
}

export function ApiUnauthorizedResponse() {
    return ApiResponse({
        status: 401,
        description: "El usuario no está autenticado."
    });
}

export function ApiForbiddenResponse() {
    return ApiResponse({
        status: 403,
        description: "El usuario no tiene permisos para realizar esta operación."
    });
}

export function ApiNotFoundResponse() {
    return ApiResponse({
        status: 404,
        description: "El recurso no fue encontrado."
    });
}

export function ApiConflictResponse() {
    return ApiResponse({
        status: 409,
        description: "La solicitud entra en conflicto con el estado actual del recurso."
    });
}
