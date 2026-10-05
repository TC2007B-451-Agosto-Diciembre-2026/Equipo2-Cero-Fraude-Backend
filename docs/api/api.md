# Documentación API Cero Fraude

## Índice

1. [Introducción](#1-introducción)

* 1.1. [Propósito](#11-propósito)
* 1.2. [Tipos de Acceso](#12-tipos-de-acceso)
* 1.3. [Manejo de errores](#13-manejo-de-errores)
* 1.4. [Códigos de respuesta](#14-códigos-de-respuesta)

2. [Resumen de Endpoints](#2-resumen-de-endpoints)

3. [Autenticación](#3-autenticación)

* 3.1. [Registro de usuario](#31-registro-de-usuario)
* 3.2. [Inicio de sesión](#32-inicio-de-sesión)
* 3.3. [Renovación del token de acceso](#33-renovación-del-token-de-acceso)
* 3.4. [Cambiar contraseña](#34-cambiar-contraseña)

1. [Catálogos](#4-catálogos)

* 4.1. [Roles](#41-roles)
* 4.2. [Reacciones](#42-reacciones)
* 4.3. [Estados](#43-estados)
* 4.4. [Categorías](#44-categorías)
* 4.5. [Acciones de auditoría](#45-acciones-de-auditoría)
* 4.6. [Razones de reporte](#46-razones-de-reporte)
* 4.7. [Tipos de fraude](#47-tipos-de-fraude)
* 4.8. [Campos modificados](#48-campos-modificados)
* 4.9. [Tipos de evidencia](#49-tipos-de-evidencia)
* 4.10. [Autoridades](#410-autoridades)

5. [Usuarios](#5-usuarios)

* 5.1. [Obtener usuarios](#51-obtener-usuarios)
* 5.2. [Obtener mi usuario](#52-obtener-mi-usuario)
* 5.3. [Obtener usuario](#53-obtener-usuario)
* 5.4. [Modificar mi usuario](#54-modificar-mi-usuario)
* 5.5. [Modificar un usuario](#55-modificar-un-usuario)

6. [Publicaciones de fraude](#6-publicaciones-de-fraude)

* 6.1. [Obtener publicaciones](#61-obtener-publicaciones)
* 6.2. [Obtener mis publicaciones](#62-obtener-mis-publicaciones)
* 6.3. [Obtener una publicación](#63-obtener-una-publicación)
* 6.4. [Crear una publicación](#64-crear-una-publicación)
* 6.5. [Actualizar una publicación](#65-actualizar-una-publicación)
* 6.6. [Eliminar una publicación](#66-eliminar-una-publicación)

7. [Reportes](#7-reportes)

* 7.1. [Obtener reportes](#71-obtener-reportes)
* 7.2. [Obtener reportes de una publicación](#72-obtener-reportes-de-una-publicación)
* 7.3. [Crear un reporte](#73-crear-un-reporte)
* 7.4. [Eliminar un reporte](#74-eliminar-un-reporte)

8. [Evidencias](#8-evidencias)

* 8.1. [Obtener evidencias de una publicación](#81-obtener-evidencias-de-una-publicación)
* 8.2. [Crear una evidencia](#82-crear-una-evidencia)
* 8.3. [Asociar una evidencia a una publicación](#83-asociar-una-evidencia-a-una-publicación)
* 8.4. [Actualizar una evidencia](#84-actualizar-una-evidencia)
* 8.5. [Eliminar una evidencia](#85-eliminar-una-evidencia)

9. [Comentarios](#9-comentarios)

* 9.1. [Obtener comentarios](#91-obtener-comentarios)
* 9.2. [Crear un comentario](#92-crear-un-comentario)
* 9.3. [Obtener comentarios de una publicación](#93-obtener-comentarios-de-una-publicación)

10. [Reacciones](#10-reacciones)

* 10.1. [Obtener reacciones](#101-obtener-reacciones)
* 10.2. [Crear o cambiar una reacción](#102-crear-o-cambiar-una-reacción)
* 10.3. [Eliminar una reacción](#103-eliminar-una-reacción)

11. [Autoridades](#11-autoridades)

* 11.1. [Obtener autoridades de un tipo de fraude](#111-obtener-autoridades-de-un-tipo-de-fraude)
* 11.2. [Asociar autoridad a tipo](#112-asociar-autoridad-a-tipo)
* 11.3. [Desasociar autoridad de tipo](#113-desasociar-autoridad-de-tipo)
* 11.4. [Obtener las autoridades de una publicación](#114-obtener-las-autoridades-de-una-publicación)
* 11.5. [Asociar autoridad a una publicación](#115-asociar-autoridad-a-una-publicación)
* 11.6. [Cambiar prioridad de una autoridad asociada a una publicación](#116-cambiar-prioridad-de-una-autoridad-asociada-a-una-publicación)
* 11.7. [Quitar autoridad de una publicación](#117-quitar-autoridad-de-una-publicación)

12. [Auditoría](#12-auditoría)

* 12.1. [Obtener registros de auditoría](#121-obtener-registros-de-auditoría)

## 1. Introducción

### 1.1. Propósito

Esta sección proporciona una vista general de los endpoints disponibles. La especificación detallada de cada endpoint se encuentra en las secciones correspondientes.

### 1.2. Tipos de Acceso

* **Público:** no requiere autenticación.
* **Usuario:** cualquier usuario autenticado.
* **Propietario:** usuario autenticado propietario del recurso.
* **Administrador:** usuario autenticado con rol de administrador.

### 1.3. Manejo de errores

La API utiliza códigos de estado HTTP para indicar el resultado de cada solicitud. Cuando ocurre un error, la respuesta contiene un objeto JSON con la siguiente estructura:

```json
{
  "statusCode": 400,
  "message": "Descripción del error",
  "error": "Bad Request"
}
```

### 1.4. Códigos de respuesta

| Código | Respuesta/Error       | Mensaje                                                                                                                        |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 200    | OK                    | La petición tuvo éxito y el servidor regresa lo solicitado.                                                                    |
| 201    | Created               | La solicitud se ha recibido y se ha creado un nuevo recurso.                                                                   |
| 204    | No Content            | La petición tuvo éxito.                                                                                                        |
| 400    | Bad Request           | La solicitud contiene datos inválidos o no cumple con las reglas de validación.                                                |
| 401    | Unauthorized          | La solicitud requiere autenticación o las credenciales proporcionadas no son válidas.                                          |
| 403    | Forbidden             | El usuario está autenticado, pero no cuenta con los permisos necesarios para realizar la operación.                            |
| 404    | Not Found             | El recurso solicitado no existe.                                                                                               |
| 409    | Conflict              | La solicitud entra en conflicto con el estado actual del sistema, por ejemplo, al intentar registrar un recurso que ya existe. |
| 500    | Internal Server Error | Ocurrió un error inesperado durante el procesamiento de la solicitud.                                                          |

## 2. Resumen de Endpoints

| Método | Endpoint                                  | Acceso                               |
| ------ | ----------------------------------------- | ------------------------------------ |
| POST   | `/auth/register`                          | Público                              |
| POST   | `/auth/login`                             | Público                              |
| POST   | `/auth/refresh`                           | Público                              |
| PATCH  | `/auth/password`                          | Usuario                              |
| GET    | `/roles`                                  | Administrador                        |
| GET    | `/reactions`                              | Usuario                              |
| POST   | `/reactions`                              | Administrador                        |
| GET    | `/states`                                 | Usuario                              |
| GET    | `/categories`                             | Usuario                              |
| POST   | `/categories`                             | Administrador                        |
| GET    | `/audit-actions`                          | Administrador                        |
| GET    | `/report-reasons`                         | Usuario                              |
| POST   | `/report-reasons`                         | Administrador                        |
| GET    | `/types`                                  | Usuario                              |
| POST   | `/types`                                  | Administrador                        |
| GET    | `/modified-fields`                        | Administrador                        |
| GET    | `/evidence-types`                         | Usuario                              |
| POST   | `/evidence-types`                         | Administrador                        |
| GET    | `/authorities`                            | Administrador                        |
| POST   | `/authorities`                            | Administrador                        |
| PATCH  | `/authorities/:authorityId`               | Administrador                        |
| GET    | `/users`                                  | Administrador                        |
| GET    | `/users/me`                               | Usuario                              |
| GET    | `/users/:userId`                          | Administrador                        |
| PATCH  | `/users/me`                               | Usuario                              |
| PATCH  | `/users/:userId`                          | Administrador                        |
| GET    | `/posts`                                  | Usuario, propietario o administrador |
| GET    | `/posts/me`                               | Usuario                              |
| GET    | `/posts/:postId`                          | Usuario, propietario o administrador |
| POST   | `/posts`                                  | Usuario                              |
| PATCH  | `/posts/:postId`                          | Propietario o administrador          |
| DELETE | `/posts/:postId`                          | Propietario o administrador          |
| GET    | `/reports`                                | Administrador                        |
| GET    | `/posts/:postId/reports`                  | Administrador                        |
| POST   | `/posts/:postId/reports`                  | Usuario                              |
| DELETE | `/posts/:postId/reports/:reportId`        | Administrador                        |
| GET    | `/posts/:postId/evidences`                | Usuario, propietario o administrador |
| POST   | `/evidences`                              | Usuario                              |
| POST   | `/posts/:postId/evidences`                | Propietario o administrador          |
| PATCH  | `/posts/:postId/evidences/:evidenceId`    | Administrador                        |
| DELETE | `/posts/:postId/evidences/:evidenceId`    | Propietario o administrador          |
| GET    | `/comments`                               | Administrador                        |
| POST   | `/posts/:postId/comments`                 | Administrador                        |
| GET    | `/posts/:postId/comments`                 | Usuario                              |
| GET    | `/posts/:postId/reactions`                | Usuario                              |
| POST   | `/posts/:postId/reactions/:reactionId`    | Usuario                              |
| DELETE | `/posts/:postId/reactions`                | Usuario                              |
| GET    | `/types/:typeId/authorities`              | Administrador                        |
| POST   | `/types/:typeId/authorities/:authorityId` | Administrador                        |
| DELETE | `/types/:typeId/authorities/:authorityId` | Administrador                        |
| GET    | `/posts/:postId/authorities`              | Usuario                              |
| POST   | `/posts/:postId/authorities/:authorityId` | Administrador                        |
| PATCH  | `/posts/:postId/authorities/:authorityId` | Administrador                        |
| DELETE | `/posts/:postId/authorities/:authorityId` | Administrador                        |
| GET    | `/audit-logs`                             | Administrador                        |

## 3. Autenticación

### 3.1. Registro de usuario

#### POST /auth/register

Registro de un nuevo usuario.

**Acceso:** Público

##### Body

| Campo    | Tipo   | Obligatorio | Descripción        |
| -------- | ------ | ----------- | ------------------ |
| username | string | Sí          | Nombre de usuario  |
| email    | string | Sí          | Correo del usuario |
| password | string | Sí          | Contraseña         |

##### Ejemplo de solicitud

```json
{
  "username": "andres123",
  "email": "andres123@correo.com",
  "password": "secret"
}
```

##### Respuestas

* 201 Created

```json
{
  "access_token": "asdasiodnasdoiaaas12uvi1no1",
  "refresh_token": "asdinqINOR2I0INiknasonapomn"
}
```

* 400 Bad Request
* 409 Conflict

### 3.2. Inicio de sesión

#### POST /auth/login

Autentica a un usuario.

**Acceso:** Público

##### Body

| Campo      | Tipo   | Obligatorio | Descripción                  |
| ---------- | ------ | ----------- | ---------------------------- |
| identifier | string | Sí          | Nombre o correo del usuario. |
| password   | string | Sí          | Contraseña                   |

##### Ejemplo de solicitud

```json
{
  "identifier": "andres123",
  "password": "secret"
}
```

##### Respuestas

* 200 OK

```json
{
  "access_token": "jwt-access-token",
  "refresh_token": "jwt-refresh-token"
}
```

* 400 Bad Request
* 401 Unauthorized

### 3.3. Renovación del token de acceso

#### POST /auth/refresh

Genera un nuevo `access_token` utilizando un `refresh_token` válido.

**Acceso:** Público

El endpoint se considera público porque no requiere un `access_token` previo.

##### Body

| Campo         | Tipo   | Obligatorio | Descripción            |
| ------------- | ------ | ----------- | ---------------------- |
| refresh_token | string | Sí          | Token de actualización |

##### Ejemplo de solicitud

```json
{
  "refresh_token": "jwt-refresh-token"
}
```

##### Respuestas

* 200 OK

```json
{
  "access_token": "asdasiodnasdoiaaas12uvi1no1"
}
```

* 400 Bad Request
* 401 Unauthorized

### 3.4. Cambiar contraseña

#### PATCH /auth/password

Cambiar la contraseña de usuario

**Acceso:** Público

##### Body

| Campo    | Tipo   | Obligatorio | Descripción                 |
| -------- | ------ | ----------- | --------------------------- |
| password | string | Sí          | Nueva contraseña de usuario |

##### Ejemplo de solicitud

```json
{
  "password": "my_new_password_super_secret"
}
```

##### Respuestas

* 204 No Content
* 400 Bad Request
* 401 Unauthorized

## 4. Catálogos

Los catálogos contienen valores controlados utilizados por el resto de la API. Los usuarios pueden consultar aquellos catálogos necesarios para realizar operaciones, mientras que los administradores pueden registrar nuevos valores cuando sea necesario.

### 4.1. Roles

#### GET /roles

Obtener los roles del sistema.

**Acceso:** Administrador

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "administrador",
    "code": "ADMIN"
  },
  {
    "id": 2,
    "name": "usuario",
    "code": "USER"
  }
]
```

* 401 Unauthorized
* 403 Forbidden

### 4.2. Reacciones

#### GET /reactions

Obtener todas las reacciones de publicaciones de fraude del sistema.

**Acceso:** Usuario

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "like",
    "code": "LIKE"
  },
  {
    "id": 2,
    "name": "dislike",
    "code": "DISLIKE"
  }
]
```

* 401 Unauthorized

#### POST /reactions

Crear una nueva reacción de publicación de fraude.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción           |
| ----- | ------ | ----------- | --------------------- |
| name  | string | Sí          | Nombre de la reacción |
| code  | string | Sí          | Código de la reacción |

##### Ejemplo de solicitud

```json
{
  "name": "sorpresa",
  "code": "SURPRISE_FACE"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "sorpresa",
  "code": "SURPRISE_FACE"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.3. Estados

#### GET /states

Obtener todos los estados de publicación de fraude del sistema.

**Acceso:** Usuario

Los estados actualmente utilizados por el sistema son:

* `DRAFT`: la publicación se encuentra en edición y todavía no ha sido enviada para revisión.
* `UPLOADED`: la publicación fue enviada por el usuario y se encuentra pendiente de revisión.
* `REJECTED`: la publicación contiene contenido inválido o basura y no debe continuar en el flujo normal de publicación. Este estado es terminal y la publicación no puede regresar al flujo normal. Estas publicaciones pueden eliminarse posteriormente.
* `PUBLISHED`: la publicación fue revisada y se encuentra visible para los usuarios.
* `VALIDATED`: la publicación ya fue revisada para determinar si corresponde a un fraude.

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Borrador",
    "code": "DRAFT"
  },
  {
    "id": 2,
    "name": "Subido",
    "code": "UPLOADED"
  },
  {
    "id": 3,
    "name": "Rechazado",
    "code": "REJECTED"
  },
  {
    "id": 4,
    "name": "Publicado",
    "code": "PUBLISHED"
  },
  {
    "id": 5,
    "name": "Validado",
    "code": "VALIDATED"
  }
]
```

* 401 Unauthorized

### 4.4. Categorías

#### GET /categories

Obtener todas las categorías de fraude del sistema.

**Acceso:** Usuario

Una categoría representa el origen o contexto donde se detectó el fraude, por ejemplo, una red social o un marketplace.

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Redes sociales",
    "code": "SOCIAL"
  },
  {
    "id": 2,
    "name": "Marketplace",
    "code": "MARKET"
  }
]
```

* 401 Unauthorized

#### POST /categories

Crear una nueva categoría de fraude del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción            |
| ----- | ------ | ----------- | ---------------------- |
| name  | string | Sí          | Nombre de la categoría |
| code  | string | Sí          | Código de la categoría |

##### Ejemplo de solicitud

```json
{
  "name": "Mensajería",
  "code": "MESSAGE"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "Mensajería",
  "code": "MESSAGE"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.5. Acciones de auditoría

#### GET /audit-actions

Obtener todas las acciones de auditoría del sistema.

**Acceso:** Administrador

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Editar",
    "code": "UPDATE"
  },
  {
    "id": 2,
    "name": "Eliminar",
    "code": "DELETE"
  }
]
```

* 401 Unauthorized
* 403 Forbidden

### 4.6. Razones de reporte

#### GET /report-reasons

Obtener las razones de reporte de una publicación de fraude del sistema.

**Acceso:** Usuario

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Información incorrecta",
    "code": "FALSE_INFO"
  },
  {
    "id": 2,
    "name": "Contenido duplicado",
    "code": "DUPLICATE"
  }
]
```

* 401 Unauthorized
* 403 Forbidden

#### POST /report-reasons

Crear una nueva razón de reporte de una publicación de fraude del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción                   |
| ----- | ------ | ----------- | ----------------------------- |
| name  | string | Sí          | Nombre de la razón de reporte |
| code  | string | Sí          | Código de la razón de reporte |

##### Ejemplo de solicitud

```json
{
  "name": "Información personal",
  "code": "PERS_INFO"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 4,
  "name": "Información personal",
  "code": "PERS_INFO"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.7. Tipos de fraude

#### GET /types

Obtener todos los tipos de fraude del sistema.

**Acceso:** Usuario

Un tipo representa la modalidad o naturaleza del fraude, por ejemplo, un producto falso o un precio engañoso. Una publicación puede tener varios tipos de fraude.

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Producto falso",
    "code": "FAKE_PROD"
  },
  {
    "id": 2,
    "name": "Precio engañoso",
    "code": "BAD_PRICE"
  }
]
```

* 401 Unauthorized

#### POST /types

Crear un nuevo tipo de fraude del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción     |
| ----- | ------ | ----------- | --------------- |
| name  | string | Sí          | Nombre del tipo |
| code  | string | Sí          | Código del tipo |

##### Ejemplo de solicitud

```json
{
  "name": "Promoción falsa",
  "code": "FAKE_PROMO"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "Promoción falsa",
  "code": "FAKE_PROMO"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.8. Campos modificados

#### GET /modified-fields

Obtener todos los campos modificados del sistema.

**Acceso:** Administrador

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Título",
    "code": "TITLE"
  },
  {
    "id": 2,
    "name": "Descripción",
    "code": "DESC"
  }
]
```

* 401 Unauthorized
* 403 Forbidden

### 4.9. Tipos de evidencia

#### GET /evidence-types

Obtener los tipos de evidencia disponibles en el sistema.

**Acceso:** Usuario

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "Imagen"
  },
  {
    "id": 2,
    "name": "PDF"
  },
  {
    "id": 3,
    "name": "Otro"
  }
]
```

* 401 Unauthorized

#### POST /evidence-types

Crear un nuevo tipo de evidencia.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción                  |
| ----- | ------ | ----------- | ---------------------------- |
| name  | string | Sí          | Nombre del tipo de evidencia |

##### Ejemplo de solicitud

```json
{
  "name": "Video"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 4,
  "name": "Video"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.10. Autoridades

#### GET /authorities

Obtener todas las autoridades del sistema.

**Acceso:** Administrador

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "PROFECO",
    "code": "PROFECO",
    "description": "Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor."
  },
  {
    "id": 2,
    "name": "Policía Cibernética",
    "code": "POL_CIB",
    "description": "Brinda orientación y atención ante incidentes, engaños y posibles delitos realizados mediante medios digitales."
  }
]
```

* 401 Unauthorized
* 403 Forbidden

#### POST /authorities

Crear una nueva autoridad en el sistema.

**Acceso:** Administrador

##### Body

| Campo       | Tipo   | Obligatorio | Descripción                 |
| ----------- | ------ | ----------- | --------------------------- |
| name        | string | Sí          | Nombre de la autoridad      |
| code        | string | Sí          | Código de la autoridad      |
| description | string | Sí          | Descripción de la autoridad |

##### Ejemplo de solicitud

```json
{
  "name": "CONDUSEF",
  "code": "CONDUSEF",
  "description": "Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras."
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "CONDUSEF",
  "code": "CONDUSEF",
  "description": "Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras."
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

#### PATCH /authorities/:authorityId

Modificar el nombre o descripción de una autoridad del sistema.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción                    |
| ----------- | ------- | ----------- | ------------------------------ |
| authorityId | Integer | Sí          | ID de la autoridad a modificar |

##### Body

| Campo       | Tipo   | Obligatorio | Descripción                                                                      |
| ----------- | ------ | ----------- | -------------------------------------------------------------------------------- |
| name        | String | Condicional | Nombre de la autoridad. `name` o `description` deben venir en la solicitud.      |
| description | String | Condicional | Descripción de la autoridad. `name` o `description` deben venir en la solicitud. |

##### Ejemplo de solicitud

```json
{
  "name": "PROFECO",
  "description": "Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor."
}
```

##### Respuestas

* 200 OK

```json
{
  "id": 3,
  "name": "PROFECO",
  "code": "PROFECO",
  "description": "Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor."
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 5. Usuarios

### 5.1. Obtener usuarios

#### GET /users

Obtener una página de usuarios.

**Acceso:** Administrador

##### Parámetros de query

| Campo        | Tipo    | Obligatorio | Descripción                                                                |
| ------------ | ------- | ----------- | -------------------------------------------------------------------------- |
| page         | Integer | No          | Página de resultados a obtener. Comienza en 1.                             |
| is_active    | Boolean | No          | Si la cuenta de usuario está activa o no.                                  |
| role_id      | Integer | No          | Rol del usuario.                                                           |
| initial_date | String  | No          | Fecha inicial de la creación de la cuenta de usuario, en formato ISO 8601. |
| final_date   | String  | No          | Fecha final de la creación de la cuenta de usuario, en formato ISO 8601.   |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "andres123",
      "email": "andres123@correo.com",
      "created_at": "2026-09-22T09:58:43.123Z",
      "is_active": true,
      "role_id": 1
    }
  ],
  "page": 1,
  "total_pages": 3,
  "total": 47
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden

### 5.2. Obtener mi usuario

#### GET /users/me

Obtener la información del usuario.

**Acceso:** Usuario

##### Respuestas

* 200 OK

```json
{
  "id": 1,
  "username": "andres123",
  "email": "andres123@correo.com",
  "created_at": "2026-09-22T09:58:43.123Z",
  "is_active": true,
  "role_id": 1
}
```

* 401 Unauthorized

### 5.3. Obtener usuario

#### GET /users/:userId

Obtener la información de un usuario.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo | Obligatorio | Descripción      |
| ------ | ---- | ----------- | ---------------- |
| userId | UUID | Sí          | UUID del usuario |

##### Respuestas

* 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "andres123",
  "email": "andres123@correo.com",
  "created_at": "2026-09-22T09:58:43.123Z",
  "is_active": true,
  "role_id": 1
}
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 5.4. Modificar mi usuario

#### PATCH /users/me

Modificar el nombre de usuario.

**Acceso:** Usuario

##### Body

| Campo    | Tipo   | Obligatorio | Descripción        |
| -------- | ------ | ----------- | ------------------ |
| username | String | No          | Nombre del usuario |

##### Ejemplo de solicitud

```json
{
  "username": "Andres1234",
}
```

##### Respuestas

* 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "Andres1234",
  "email": "andres123@correo.com",
  "created_at": "2026-09-22T09:58:43.123Z",
  "is_active": true,
  "role_id": 1
}
```

* 400 Bad Request
* 401 Unauthorized

### 5.5. Modificar un usuario

#### PATCH /users/:userId

Modificar los datos de un usuario.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo | Obligatorio | Descripción      |
| ------ | ---- | ----------- | ---------------- |
| userId | UUID | Sí          | UUID del usuario |

##### Body

| Campo     | Tipo    | Obligatorio | Descripción                     |
| --------- | ------- | ----------- | ------------------------------- |
| is_active | Boolean | No          | Estado de la cuenta del usuario |
| role_id   | Integer | No          | Rol del usuario                 |

##### Ejemplo de solicitud

```json
{
  "role_id": 2
}
```

##### Respuestas

* 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "andres123",
  "email": "andres123@correo.com",
  "created_at": "2026-09-22T09:58:43.123Z",
  "is_active": true,
  "role_id": 2
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 6. Publicaciones de fraude

Una publicación de fraude representa un posible caso de fraude registrado por un usuario. Su ciclo de vida comienza como borrador o como publicación enviada para revisión.

Una publicación puede pasar por los siguientes estados:

* **DRAFT:** el usuario está elaborando la publicación y puede modificarla.
* **UPLOADED:** el usuario terminó de elaborar la publicación y la envió para revisión.
* **PUBLISHED:** la publicación fue revisada y es visible para los usuarios.
* **VALIDATED:** la publicación ya fue revisada para determinar si corresponde a un fraude.
* **REJECTED:** la publicación contiene contenido inválido o basura y no debe continuar en el flujo normal. Estas publicaciones pueden eliminarse posteriormente. Este estado es terminal y no puede regresar a otro estado.

La revisión permite que el contenido sea modificado antes de hacerse visible cuando sea necesario. El estado `is_fraud` se determina durante la validación.

### 6.1. Obtener publicaciones

#### GET /posts

Obtener una página de publicaciones de fraude. Los usuarios pueden consultar las publicaciones visibles. Los propietarios pueden consultar sus borradores y los administradores pueden consultar también publicaciones con estado `UPLOADED`.

**Acceso:** Usuario, propietario o administrador

##### Parámetros de query

| Campo     | Tipo         | Obligatorio | Descripción                                                                                                         | Restringido |
| --------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| page      | Integer      | No          | Página de resultados a obtener. Comienza en 1.                                                                      | No          |
| category  | Integer list | No          | IDs de las categorías asociadas a las publicaciones.                                                                | No          |
| type      | Integer list | No          | IDs de los tipos asociados a las publicaciones.                                                                     | No          |
| status_id | Integer list | No          | IDs de los estados de las publicaciones. Los estados no públicos están restringidos según los permisos del usuario. | Parcial     |

##### Respuestas

* 200 OK

Si la publicación tiene `is_anonymous` como verdadero, el `author` vendrá vacío.

```json
{
  "data": [
    {
      "id": 1,
      "title": "Ejemplo de publicación",
      "description": "Descripción del posible fraude.",
      "status_id": 5,
      "is_fraud": true,
      "published_at": "2026-09-22T09:58:43.123Z",
	  "author": "Roberto",
      "category": 2,
      "types": [1, 2]
    }
  ],
  "page": 1,
  "total_pages": 3,
  "total": 47
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden

### 6.2. Obtener mis publicaciones

#### GET /posts/me

Obtener una página de publicaciones de fraude del usuario solicitante.

**Acceso:** Usuario

##### Parámetros de query

| Campo    | Tipo    | Obligatorio | Descripción                                    |
| -------- | ------- | ----------- | ---------------------------------------------- |
| page     | Integer | No          | Página de resultados a obtener. Comienza en 1. |
| is_draft | Boolean | Sí          | Sí buscar solo borradores o solo publicaciones |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "id": 1,
      "title": "Ejemplo de publicación",
      "description": "Descripción del posible fraude.",
      "status_id": 2,
      "is_fraud": true,
      "published_at": "2026-09-22T09:58:43.123Z",
      "category": 2,
      "types": [1, 2]
    }
  ]
}
```

* 400 Bad Request
* 401 Unauthorized

### 6.3. Obtener una publicación

#### GET /posts/:postId

Obtener una publicación de fraude. Los usuarios pueden consultar publicaciones públicas, mientras que el propietario puede consultar sus borradores y el administrador puede consultar publicaciones no publicadas.

**Acceso:** Usuario, propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción                                    |
| ------ | ------- | ----------- | ---------------------------------------------- |
| postId | Integer | Sí          | ID de la publicación                           |

##### Respuestas

* 200 OK

```json
{
  "id": 1,
  "title": "Ejemplo de publicación",
  "description": "Descripción del posible fraude.",
  "seller_name": "Vendedor Ejemplo",
  "product": "Producto Ejemplo",
  "phone_number": "8111234567",
  "url": "https://ejemplo.com",
  "platform": "Marketplace",
  "fraudulent_email": "fraude@ejemplo.com",
  "status_id": 5,
  "is_fraud": true,
  "published_at": "2026-09-22T09:58:43.123Z",
  "author": "Roberto",
  "category": 2,
  "reactions": {
    "like": 45,
    "dislike": 50
  },
  "evidences": [
    {
      "id": 1,
      "url": "https://ejemplo.com/evidencia.jpg",
      "evidence_type": 1
    }
  ],
  "types": [1, 2]
}
```

Para administradores, se incluye `is_anonymous` y `deleted_at`:

```json
{
  "id": 1,
  "title": "Ejemplo de publicación",
  "description": "Descripción del posible fraude.",
  "seller_name": "Vendedor Ejemplo",
  "product": "Producto Ejemplo",
  "phone_number": "8111234567",
  "url": "https://ejemplo.com",
  "platform": "Marketplace",
  "fraudulent_email": "fraude@ejemplo.com",
  "status_id": 5,
  "is_fraud": true,
  "published_at": "2026-09-22T09:58:43.123Z",
  "author": "Roberto",
  "category": 2,
  "reactions": {
    "like": 45,
    "dislike": 50
  },
  "evidences": [
    {
      "id": 1,
      "url": "https://ejemplo.com/evidencia.jpg",
      "evidence_type": 1
    }
  ],
  "types": [1, 2],
  "is_anonymous": false,
  "deleted_at": null
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 6.4. Crear una publicación

#### POST /posts

Crear una publicación de fraude.

**Acceso:** Usuario

La publicación puede ser creada como borrador o enviada para revisión. La categoría, los tipos de fraude y las evidencias se asocian durante la creación de la publicación.

Una publicación puede guardarse como `DRAFT` aunque no tenga descripción ni evidencia. Sin embargo, cuando se envía para revisión, debe contar con una descripción o al menos una evidencia.

Las evidencias se suben previamente mediante `POST /evidences`. Ese endpoint crea la evidencia y devuelve su URL. Al crear la publicación, el cliente puede enviar la lista de URLs de las evidencias que desea asociar. De esta manera, `POST /posts` no vuelve a subir los archivos, sino que utiliza las evidencias previamente creadas.

##### Body

| Campo            | Tipo         | Obligatorio | Descripción                                                          |
| ---------------- | ------------ | ----------- | -------------------------------------------------------------------- |
| title            | String       | No          | Título de la publicación                                             |
| description      | String       | No          | Descripción del fraude                                               |
| seller_name      | String       | No          | Nombre del vendedor relacionado con el fraude                        |
| product          | String       | No          | Producto relacionado con el fraude                                   |
| phone_number     | String       | No          | Teléfono relacionado con el fraude                                   |
| url              | String       | No          | URL relacionada con el fraude                                        |
| platform         | String       | No          | Plataforma donde ocurrió el posible fraude                           |
| fraudulent_email | String       | No          | Correo electrónico relacionado con el posible fraude                 |
| category         | Integer      | No          | ID de la categoría de la publicación                                 |
| types            | Integer list | No          | IDs de los tipos de fraude asociados a la publicación                |
| evidences        | Integer list | No          | IDs de las evidencias previamente creadas mediante `/evidences`      |
| is_anonymous     | Boolean      | No          | Indica si la identidad del autor debe mantenerse anónima al publicar |
| status_id        | Integer      | Sí          | Estado inicial de la publicación                                     |

##### Ejemplo de solicitud

```json
{
  "title": "Producto falso en Marketplace",
  "description": "El producto recibido no corresponde con la publicación original.",
  "seller_name": "Vendedor Ejemplo",
  "product": "Teléfono celular",
  "phone_number": "8111234567",
  "url": "https://ejemplo.com/producto",
  "platform": "Marketplace",
  "fraudulent_email": "vendedor@ejemplo.com",
  "category": 2,
  "types": [1],
  "evidences": [
    1,
    2
  ],
  "is_anonymous": true,
  "status_id": 1
}
```

La secuencia esperada para agregar evidencias al crear una publicación es:

1. El cliente utiliza `POST /evidences` para subir cada archivo.
2. Cada solicitud devuelve la URL de la evidencia creada.
3. El cliente reúne las URLs de las evidencias que desea asociar.
4. El cliente envía esas URLs en el campo `evidences` de `POST /posts`.
5. La API crea la publicación y asocia las evidencias indicadas.

##### Respuestas

* 201 Created

```json
{
  "id": 1,
  "title": "Producto falso en Marketplace",
  "status_id": 1,
  "is_fraud": false,
  "author": "550e8400-e29b-41d4-a716-446655440000",
  "evidences": [
    {
      "id": 1,
      "url": "https://ejemplo.com/evidencia1.jpg",
      "evidence_type": 1
    },
    {
      "id": 2,
      "url": "https://ejemplo.com/evidencia2.jpg",
      "evidence_type": 1
    }
  ]
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 6.5. Actualizar una publicación

#### PATCH /posts/:postId

Actualizar un borrador o publicación. El propietario puede actualizar un borrador. El administrador puede actualizar una publicación.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción                      |
| ------ | ------- | ----------- | -------------------------------- |
| postId | Integer | Sí          | ID de la publicación a modificar |

##### Body

| Campo            | Tipo         | Obligatorio | Descripción                                | Restringido |
| ---------------- | ------------ | ----------- | ------------------------------------------ | ----------- |
| title            | String       | No          | Título de la publicación                   | No          |
| description      | String       | No          | Descripción del fraude                     | No          |
| seller_name      | String       | No          | Nombre del vendedor                        | No          |
| product          | String       | No          | Producto relacionado                       | No          |
| phone_number     | String       | No          | Teléfono relacionado                       | No          |
| url              | String       | No          | URL relacionada                            | No          |
| platform         | String       | No          | Plataforma relacionada                     | No          |
| fraudulent_email | String       | No          | Correo relacionado con el fraude           | No          |
| category         | Integer      | No          | Nueva categoría de la publicación          | No          |
| types            | Integer list | No          | Tipos de fraude asociados a la publicación | No          |
| is_anonymous     | Boolean      | No          | Indica si la publicación debe ser anónima  | No          |
| status_id        | Integer      | No          | Nuevo estado de la publicación             | Sí          |
| is_fraud         | Boolean      | No          | Estado de confirmación del fraude          | Sí          |

El campo de estado está sujeto a las siguientes reglas de transición:

| Estado actual | Nuevo estado | Quién puede realizarlo |
| ------------- | ------------ | ---------------------- |
| DRAFT         | UPLOADED     | Propietario            |
| UPLOADED      | PUBLISHED    | Administrador          |
| UPLOADED      | REJECTED     | Administrador          |
| PUBLISHED     | VALIDATED    | Administrador          |

El estado `REJECTED` es terminal y no puede utilizarse como origen de una nueva transición.

El campo `status_id` no se considera un campo de actualización libre. Su valor está sujeto al estado actual de la publicación y a los permisos del usuario autenticado.

Cuando `types` se incluye en la solicitud, representa la lista de tipos que quedará asociada a la publicación. Si el campo se omite, las asociaciones existentes no se modifican.

Las evidencias se gestionan mediante los endpoints de evidencias. Para agregar una evidencia existente a una publicación se utiliza `POST /posts/:postId/evidences`.

`is_fraud` solo puede ser modificado por un administrador al transicionar una publicación con estado `PUBLISHED` a `VALIDATED`.

##### Ejemplo de solicitud

```json
{
  "title": "Producto falso confirmado",
  "description": "Se actualiza la información de la publicación.",
  "is_anonymous": true
}
```

##### Respuestas

* 200 OK

```json
{
  "id": 1,
  "title": "Producto falso confirmado",
  "description": "Se actualiza la información de la publicación.",
  "status_id": 2,
  "is_fraud": true,
  "author": "550e8400-e29b-41d4-a716-446655440000",
  "category": 2
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 6.6. Eliminar una publicación

#### DELETE /posts/:postId

Borrar una publicación o borrador.

El propietario puede borrar sus propios borradores y publicaciones. El administrador puede borrar publicaciones.

La eliminación de una publicación es lógica, por lo que el registro puede conservarse y marcarse como eliminado mediante `deleted_at`. La eliminación de un borrador es definitiva.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción                   |
| ------ | ------- | ----------- | ----------------------------- |
| postId | Integer | Sí          | ID de la publicación a borrar |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 7. Reportes

Los reportes permiten que los usuarios informen sobre publicaciones de fraude. Su consulta y eliminación son operaciones de administración.

### 7.1. Obtener reportes

#### GET /reports

Obtener una página de reportes realizados sobre publicaciones.

**Acceso:** Administrador

##### Parámetros de query

| Campo | Tipo    | Obligatorio | Descripción                                    |
| ----- | ------- | ----------- | ---------------------------------------------- |
| page  | Integer | No          | Página de resultados a obtener. Comienza en 1. |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "id": 1,
      "information": "La información de esta publicación es incorrecta.",
      "report_reason": 1,
      "user": "550e8400-e29b-41d4-a716-446655440000",
      "post": 1
    }
  ]
}
```

Si no existen reportes en la página solicitada:

```json
{
  "data": []
}
```

* 401 Unauthorized
* 403 Forbidden

### 7.2. Obtener reportes de una publicación

#### GET /posts/:postId/reports

Obtener los reportes realizados sobre una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Parámetros de query

| Campo | Tipo    | Obligatorio | Descripción                                    |
| ----- | ------- | ----------- | ---------------------------------------------- |
| page  | Integer | No          | Página de resultados a obtener. Comienza en 1. |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "id": 1,
      "information": "La información de esta publicación es incorrecta.",
      "report_reason": 1,
      "user": "550e8400-e29b-41d4-a716-446655440000",
      "post": 1
    }
  ]
}
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 7.3. Crear un reporte

#### POST /posts/:postId/reports

Crear un reporte sobre una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción                                |
| ------ | ------- | ----------- | ------------------------------------------ |
| postId | Integer | Sí          | ID de la publicación que se desea reportar |

##### Body

| Campo         | Tipo    | Obligatorio | Descripción                                             |
| ------------- | ------- | ----------- | ------------------------------------------------------- |
| information   | String  | No          | Información adicional que explica el motivo del reporte |
| report_reason | Integer | Sí          | ID de la razón por la que se reporta la publicación     |

`information` es opcional. La razón del reporte se determina mediante `report_reason`.

##### Ejemplo de solicitud

```json
{
  "information": "La información presentada no corresponde con mi experiencia.",
  "report_reason": 1
}
```

También es válida una solicitud sin información adicional:

```json
{
  "report_reason": 1
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 1,
  "information": "La información presentada no corresponde con mi experiencia.",
  "report_reason": 1,
  "user": "550e8400-e29b-41d4-a716-446655440000",
  "post": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found

### 7.4. Eliminar un reporte

#### DELETE /posts/:postId/reports/:reportId

Borrar un reporte de una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo    | Tipo    | Obligatorio | Descripción          |
| -------- | ------- | ----------- | -------------------- |
| postId   | Integer | Sí          | ID de la publicación |
| reportId | Integer | Sí          | ID del reporte       |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 8. Evidencias

Una evidencia representa información que respalda una publicación de fraude. Las evidencias pueden existir independientemente de una publicación y posteriormente asociarse a ella.

El `evidence_type` identifica el formato o tipo de evidencia mediante el catálogo `/evidence-types`.

Las evidencias se suben mediante `POST /evidences`. Este endpoint crea el registro de la evidencia y devuelve la URL que posteriormente puede utilizarse para asociarla a una publicación.

Al crear una publicación mediante `POST /posts`, el cliente puede enviar una lista de las URLs de evidencias previamente creadas para asociarlas directamente a la publicación.

Las evidencias también pueden asociarse después de crear una publicación mediante `POST /posts/:postId/evidences`, por ejemplo, cuando una evidencia anterior fue eliminada o necesita ser agregada posteriormente.

### 8.1. Obtener evidencias de una publicación

#### GET /posts/:postId/evidences

Obtener las evidencias asociadas a una publicación.

**Acceso:** Usuario, propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "url": "https://ejemplo.com/evidencia.jpg",
    "evidence_type": 1
  }
]
```

Las respuestas para administradores incluyen información adicional de la evidencia:

```json
[
  {
    "id": 1,
    "url": "https://ejemplo.com/evidencia.jpg",
    "evidence_type": 1,
    "is_visible": true,
    "created_at": "2026-09-22T10:00:00.000Z",
    "deleted_at": null
  }
]
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 8.2. Crear una evidencia
#### POST /evidences

Crear una evidencia que inicialmente no está asociada a una publicación.

**Acceso:** Usuario

La evidencia se crea mediante la subida de un archivo. Una vez creada, el endpoint devuelve su URL. Esta URL puede utilizarse posteriormente en `POST /posts` para asociar la evidencia durante la creación de una publicación, o mediante `POST /posts/:postId/evidences` para asociarla después.

##### Body

La solicitud utiliza `multipart/form-data`.

| Campo         | Tipo    | Obligatorio | Descripción              |
| ------------- | ------- | ----------- | ------------------------ |
| file          | File    | Sí          | Archivo a subir          |
| evidence_type | Integer | No          | ID del tipo de evidencia |

##### Ejemplo de solicitud

```text
Content-Type: multipart/form-data

file: evidencia.jpg
evidence_type: 1
```

##### Respuestas

* 201 Created

```json
{
  "id": 2,
  "url": "https://ejemplo.com/evidencia2.jpg",
  "evidence_type": 1
}
```

* 400 Bad Request
* 401 Unauthorized

### 8.3. Asociar una evidencia a una publicación

#### POST /posts/:postId/evidences

Asociar una evidencia existente a una publicación.

**Acceso:** Propietario o administrador

El propietario puede asociar evidencias mientras la publicación se encuentre en estado `DRAFT` o `UPLOADED`. El administrador puede asociar evidencias cuando la publicación se encuentre en estado `UPLOADED`, `PUBLISHED` o `VALIDATED`. No se permite asociar evidencias cuando la publicación se encuentra en `DRAFT` para administradores.

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Body

| Campo      | Tipo    | Obligatorio | Descripción                  |
| ---------- | ------- | ----------- | ---------------------------- |
| evidenceId | Integer | Sí          | ID de la evidencia a asociar |

##### Ejemplo de solicitud

```json
{
  "evidenceId": 2
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 2,
  "url": "https://ejemplo.com/evidencia2.jpg",
  "evidence_type": 1,
  "post": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 8.4. Actualizar una evidencia

#### PATCH /posts/:postId/evidences/:evidenceId

Actualizar el estado `is_visible` de una evidencia.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo      | Tipo    | Obligatorio | Descripción          |
| ---------- | ------- | ----------- | -------------------- |
| postId     | Integer | Sí          | ID de la publicación |
| evidenceId | Integer | Sí          | ID de la evidencia   |

##### Body

| Campo      | Tipo    | Obligatorio | Descripción                       |
| ---------- | ------- | ----------- | --------------------------------- |
| is_visible | Boolean | Sí          | Indica si la evidencia es visible |

##### Ejemplo de solicitud

```json
{
  "is_visible": true
}
```

##### Respuestas

* 200 OK

```json
{
  "id": 2,
  "url": "https://ejemplo.com/evidencia2.jpg",
  "evidence_type": 1,
  "post": 1,
  "is_visible": true
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 8.5. Eliminar una evidencia

#### DELETE /posts/:postId/evidences/:evidenceId

Borrar una evidencia de una publicación.

**Acceso:** Propietario o administrador

El propietario puede eliminar evidencias mientras la publicación se encuentre en estado `DRAFT` o `UPLOADED`. El administrador puede eliminar evidencias cuando la publicación se encuentre en estado `UPLOADED`, `PUBLISHED` o `VALIDATED`. No se permite modificar evidencias de una publicación `PUBLISHED` o `VALIDATED` al propietario.

##### Parámetros de ruta

| Campo      | Tipo    | Obligatorio | Descripción          |
| ---------- | ------- | ----------- | -------------------- |
| postId     | Integer | Sí          | ID de la publicación |
| evidenceId | Integer | Sí          | ID de la evidencia   |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 9. Comentarios

Los comentarios están destinados a los administradores para registrar información o actualizaciones relevantes sobre una publicación. Por ejemplo, pueden utilizarse para registrar que una página dejó de funcionar o que una empresa ya no existe.

Las confirmaciones o reacciones de los usuarios se representan mediante las reacciones de la publicación.

### 9.1. Obtener comentarios

#### GET /comments

Obtener todos los comentarios del sistema.

**Acceso:** Administrador

##### Parámetros de query

| Campo | Tipo    | Obligatorio | Descripción                                    |
| ----- | ------- | ----------- | ---------------------------------------------- |
| page  | Integer | No          | Página de resultados a obtener. Comienza en 1. |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "user": "550e8400-e29b-41d4-a716-446655440000",
      "post": 1,
      "text": "La publicación fue revisada y validada."
    }
  ]
}
```

* 401 Unauthorized
* 403 Forbidden

### 9.2. Crear un comentario

#### POST /posts/:postId/comments

Crear un comentario sobre una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Body

| Campo | Tipo   | Obligatorio | Descripción              |
| ----- | ------ | ----------- | ------------------------ |
| text  | String | Sí          | Contenido del comentario |

##### Ejemplo de solicitud

```json
{
  "text": "La publicación fue revisada por un administrador."
}
```

##### Respuestas

* 201 Created

```json
{
  "user": "550e8400-e29b-41d4-a716-446655440000",
  "post": 1,
  "text": "La publicación fue revisada por un administrador."
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 9.3. Obtener comentarios de una publicación

#### GET /posts/:postId/comments

Obtener todos los comentarios de una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 200 OK

```json
[
  {
    "user": "550e8400-e29b-41d4-a716-446655440000",
    "post": 1,
    "text": "La publicación fue revisada y validada."
  }
]
```

* 401 Unauthorized
* 404 Not Found

## 10. Reacciones

Cada usuario puede tener como máximo una reacción sobre una publicación. La reacción puede ser `LIKE` o `DISLIKE`.

Si el usuario ya tiene una reacción y envía otra mediante `POST`, la reacción existente se reemplaza por la nueva. Para eliminar su reacción, utiliza `DELETE`.

### 10.1. Obtener reacciones

#### GET /posts/:postId/reactions

Obtener la cantidad de reacciones por tipo de reacción de una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 200 OK

```json
{
  "like": 45,
  "dislike": 50
}
```

* 401 Unauthorized
* 404 Not Found

### 10.2. Crear o cambiar una reacción

#### POST /posts/:postId/reactions/:reactionId

Crear una reacción a una publicación o reemplazar la reacción existente del usuario.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo      | Tipo    | Obligatorio | Descripción          |
| ---------- | ------- | ----------- | -------------------- |
| postId     | Integer | Sí          | ID de la publicación |
| reactionId | Integer | Sí          | ID de la reacción    |

##### Respuestas

* 201 Created

```json
{
  "post": 1,
  "reaction": 1,
  "user": "550e8400-e29b-41d4-a716-446655440000"
}
```

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found

### 10.3. Eliminar una reacción

#### DELETE /posts/:postId/reactions

Borrar la reacción del usuario a una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 404 Not Found

## 11. Autoridades

Una publicación tiene varias autoridades asociadas. La asociación permite indicar qué autoridades resultan pertinentes para atender el caso de acuerdo con los tipos de fraude de la publicación.

### 11.1. Obtener autoridades de un tipo de fraude

#### GET /types/:typeId/authorities

Obtener las autoridades asociadas a un tipo de fraude.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción           |
| ------ | ------- | ----------- | --------------------- |
| typeId | Integer | Sí          | ID del tipo de fraude |

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "PROFECO",
    "code": "PROFECO",
    "description": "Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor."
  }
]
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 11.2. Asociar autoridad a tipo

#### POST /types/:typeId/authorities/:authorityId

Asociar una autoridad a un tipo de fraude.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción           |
| ----------- | ------- | ----------- | --------------------- |
| typeId      | Integer | Sí          | ID del tipo de fraude |
| authorityId | Integer | Sí          | ID de la autoridad    |

##### Respuestas

* 201 Created

```json
{
  "type_id": 1,
  "authority_id": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 11.3. Desasociar autoridad de tipo

#### DELETE /types/:typeId/authorities/:authorityId

Desasociar una autoridad de un tipo de fraude.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción           |
| ----------- | ------- | ----------- | --------------------- |
| typeId      | Integer | Sí          | ID del tipo de fraude |
| authorityId | Integer | Sí          | ID de la autoridad    |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 11.4. Obtener las autoridades de una publicación

#### GET /posts/:postId/authorities

Obtener las autoridades asociadas a una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 200 OK

```json
[
  {
    "id": 1,
    "name": "PROFECO",
    "code": "PROFECO",
    "description": "...",
    "priority": 1
  }
]
```

* 401 Unauthorized
* 404 Not Found

### 11.5. Asociar autoridad a una publicación

#### POST /posts/:postId/authorities/:authorityId

Asociar una autoridad a una publicación. Las autoridades finales solo pueden asociarse a una publicación después de que esta haya sido validada positivamente. Una publicación puede tener múltiples autoridades. Cada autoridad asociada recibe automáticamente una prioridad única, donde 1 representa la recomendación principal.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción                             |
| ----------- | ------- | ----------- | --------------------------------------- |
| postId      | Integer | Sí          | ID de la publicación                    |
| authorityId | Integer | Sí          | ID de la autoridad que se desea asociar |

La prioridad se asigna automáticamente al realizar la asociación. El cliente no necesita enviar una prioridad en esta solicitud.

##### Respuestas

* 201 Created

```json
{
  "post_id": 1,
  "authority_id": 1,
  "priority": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 11.6. Cambiar prioridad de una autoridad asociada a una publicación

#### PATCH /posts/:postId/authorities/:authorityId

Cambiar la prioridad de una autoridad asociada a una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción                             |
| ----------- | ------- | ----------- | --------------------------------------- |
| postId      | Integer | Sí          | ID de la publicación                    |
| authorityId | Integer | Sí          | ID de la autoridad actualmente asociada |

##### Body

| Campo    | Tipo    | Obligatorio | Descripción                     |
| -------- | ------- | ----------- | ------------------------------- |
| priority | Integer | Sí          | Nueva prioridad de la autoridad |

##### Ejemplo de solicitud

```json
{
  "priority": 2
}
```

##### Respuestas

* 200 OK

```json
{
  "post_id": 1,
  "authority_id": 2,
  "priority": 2
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 11.7. Quitar autoridad de una publicación

#### DELETE /posts/:postId/authorities/:authorityId

Quitar una autoridad asociada a una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

## 12. Auditoría

Los registros de auditoría permiten consultar las modificaciones realizadas por administradores sobre los recursos del sistema.

### 12.1. Obtener registros de auditoría

#### GET /audit-logs

Obtener una página de registros de modificación.

**Acceso:** Administrador

##### Parámetros de query

| Campo         | Tipo    | Obligatorio | Descripción                                                                 |
| ------------- | ------- | ----------- | --------------------------------------------------------------------------- |
| page          | Integer | No          | Página de resultados a obtener. Comienza en 1.                              |
| audit-action  | Integer | No          | ID de la acción de auditoría                                                |
| performed-by  | UUID    | No          | UUID del administrador que realizó la acción                                |
| affected-user | UUID    | No          | UUID del usuario afectado por la acción                                     |
| post          | Integer | No          | ID de la publicación de fraude afectada por la acción                       |
| evidence      | Integer | No          | ID de la evidencia afectada por la acción                                   |
| initial_date  | String  | No          | Fecha inicial del periodo de creación de los registros, en formato ISO 8601 |
| final_date    | String  | No          | Fecha final del periodo de creación de los registros, en formato ISO 8601   |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "audit_action": "Editar",
      "performed_by": "AdminPro",
      "affected_user": "Andres123",
      "post": 4,
      "evidences": [
        {
          "id": 17
        },
        {
          "id": 14
        }
      ],
      "created_at": "2026-09-22T09:58:43.123Z",
      "field_changes": [
        {
          "modified_field": "Descripción",
          "old_value": "Esta es una descripción",
          "new_value": "Esta es la nueva descripción"
        },
        {
          "modified_field": "Título",
          "old_value": "Título anterior",
          "new_value": "Título actualizado"
        }
      ]
    }
  ]
}
```

Un registro de auditoría puede contener uno o varios cambios de campos. Cada elemento de `field_changes` representa un registro de `audit_field_change` y contiene el campo modificado, su valor anterior y su nuevo valor.

El campo `created_at` representa la fecha y hora en que se creó el registro de auditoría. Los parámetros `initial_date` y `final_date` se utilizan únicamente como filtros para consultar registros dentro de un periodo determinado.

Los campos `old_value` y `new_value` representan como texto el valor anterior y el nuevo valor del campo modificado.

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
