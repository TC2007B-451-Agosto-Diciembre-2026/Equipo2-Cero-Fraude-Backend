# Documentación API Cero Fraude

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

| Método | Endpoint                                | Acceso                               | Descripción                                                          |
| ------ | --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| POST   | /auth/register                          | Público                              | Registro de un usuario                                               |
| POST   | /auth/login                             | Público                              | Login de un usuario                                                  |
| POST   | /auth/refresh                           | Público                              | Obtener nuevo token de acceso con token de actualización             |
| POST   | /auth/logout                            | Usuario                              | Logout de un usuario                                                 |
| GET    | /roles                                  | Administrador                        | Obtener los roles de usuario del sistema                             |
| POST   | /roles                                  | Administrador                        | Crear un nuevo rol de usuario                                        |
| GET    | /reactions                              | Usuario                              | Obtener todas las reacciones posibles de una publicación del sistema |
| POST   | /reactions                              | Administrador                        | Crear una reacción nueva                                             |
| GET    | /states                                 | Usuario                              | Obtener los estados posibles de una publicación del sistema          |
| POST   | /states                                 | Administrador                        | Crear un nuevo estado de publicación                                 |
| GET    | /categories                             | Usuario                              | Obtener todas las categorías posibles de una publicación del sistema |
| POST   | /categories                             | Administrador                        | Crear una nueva categoría de publicación                             |
| GET    | /audit-actions                          | Administrador                        | Obtener todas las posibles acciones de auditoría                     |
| POST   | /audit-actions                          | Administrador                        | Crear una acción de auditoría                                        |
| GET    | /report-reasons                         | Usuario                              | Obtener las posibles razones para reportar una publicación           |
| POST   | /report-reasons                         | Administrador                        | Crear una razón para reportar una publicación                        |
| GET    | /types                                  | Usuario                              | Obtener todos los tipos posibles de una publicación del sistema      |
| POST   | /types                                  | Administrador                        | Crear un nuevo tipo de publicación                                   |
| GET    | /modified-fields                        | Administrador                        | Obtener los posibles campos de modificación de una publicación       |
| POST   | /modified-fields                        | Administrador                        | Crear un posible campo de modificación de una publicación            |
| GET    | /evidence-types                         | Usuario                              | Obtener los tipos de evidencia disponibles                           |
| POST   | /evidence-types                         | Administrador                        | Crear un nuevo tipo de evidencia                                     |
| GET    | /authorities                            | Administrador                        | Obtener las autoridades registradas en el sistema                    |
| POST   | /authorities                            | Administrador                        | Registrar una nueva autoridad al sistema                             |
| PATCH  | /authorities/:authorityId               | Administrador                        | Modificar los datos de una autoridad                                 |
| GET    | /users                                  | Administrador                        | Obtener una página de usuarios                                       |
| GET    | /users/:userId                          | Propietario o administrador          | Obtener un usuario                                                   |
| PATCH  | /users/:userId                          | Propietario o administrador          | Modificar los datos de un usuario                                    |
| GET    | /posts                                  | Usuario, propietario o administrador | Obtener una página de publicaciones                                  |
| GET    | /posts/:postId                          | Usuario, propietario o administrador | Obtener una publicación                                              |
| POST   | /posts                                  | Usuario                              | Crear una publicación                                                |
| PATCH  | /posts/:postId                          | Propietario o administrador          | Actualizar un borrador o publicación                                 |
| DELETE | /posts/:postId                          | Propietario o administrador          | Borrar una publicación o borrador                                    |
| GET    | /reports                                | Administrador                        | Obtener una página de reportes realizados                            |
| GET    | /posts/:postId/reports                  | Administrador                        | Obtener los reportes de una publicación                              |
| POST   | /posts/:postId/reports                  | Usuario                              | Crear un reporte de una publicación                                  |
| DELETE | /posts/:postId/reports/:reportId        | Administrador                        | Borrar un reporte de una publicación                                 |
| GET    | /evidences                              | Administrador                        | Obtener una página de evidencias                                     |
| GET    | /posts/:postId/evidences                | Usuario, propietario o administrador | Obtener las evidencias de una publicación                            |
| POST   | /posts/:postId/evidences                | Propietario                          | Crear una evidencia para una publicación ya existente                |
| DELETE | /posts/:postId/evidences/:evidenceId    | Propietario o administrador          | Borrar una evidencia de una publicación                              |
| GET    | /comments                               | Administrador                        | Obtener todos los comentarios                                        |
| POST   | /posts/:postId/comments                 | Administrador                        | Crear un comentario sobre una publicación                            |
| GET    | /posts/:postId/comments                 | Usuario                              | Obtener todos los comentarios de una publicación                     |
| GET    | /posts/:postId/reactions                | Usuario                              | Obtener la cantidad de reacciones por reacción de una publicación    |
| POST   | /posts/:postId/reactions/:reactionId    | Usuario                              | Crear o cambiar una reacción a una publicación                       |
| DELETE | /posts/:postId/reactions                | Usuario                              | Borrar una reacción a una publicación                                |
| GET    | /subscriptions                          | Usuario                              | Obtener una página de suscripciones                                  |
| GET    | /users/:userId/subscriptions            | Propietario o administrador          | Obtener una página de suscripciones de un usuario                    |
| POST   | /subscriptions                          | Usuario                              | Suscribirse a un tipo de publicación                                 |
| DELETE | /subscriptions/:typeId                  | Usuario                              | Desuscribirse de un tipo de publicación                              |
| GET    | /types/:typeId/authorities              | Administrador                        | Obtener las autoridades asociadas a un tipo de publicación           |
| POST   | /types/:typeId/authorities/:authorityId | Administrador                        | Asociar una autoridad a un tipo de fraude                            |
| DELETE | /types/:typeId/authorities/:authorityId | Administrador                        | Desasociar una autoridad de un tipo de fraude                        |
| GET    | /posts/:postId/authority                | Usuario                              | Obtener la autoridad asociada a una publicación                      |
| POST   | /posts/:postId/authority/:authorityId   | Administrador                        | Asociar una autoridad a una publicación                              |
| PATCH  | /posts/:postId/authority/:authorityId   | Administrador                        | Cambiar la autoridad asociada a una publicación                      |
| DELETE | /posts/:postId/authority                | Administrador                        | Quitar la autoridad asociada a una publicación                       |
| GET    | /audit-logs                             | Administrador                        | Obtener una página de registros de modificación                      |

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

**Acceso:** Refresh token válido

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

### 3.4. Cierre de sesión

#### POST /auth/logout

Finaliza la sesión del usuario e invalida los tokens asociados a ella.

**Acceso:** Usuario

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

#### POST /roles

Crear un nuevo rol de usuario.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción    |
| ----- | ------ | ----------- | -------------- |
| name  | string | Sí          | Nombre del rol |
| code  | string | Sí          | Código del rol |

##### Ejemplo de solicitud

```json
{
  "name": "moderador",
  "code": "MODERATOR"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 4,
  "name": "moderador",
  "code": "MODERATOR"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

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
* `REJECTED`: la publicación contiene contenido inválido o basura y no debe continuar en el flujo normal de publicación. Estas publicaciones pueden eliminarse posteriormente.
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

#### POST /states

Crear un nuevo estado de publicación del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción       |
| ----- | ------ | ----------- | ----------------- |
| name  | string | Sí          | Nombre del estado |
| code  | string | Sí          | Código del estado |

##### Ejemplo de solicitud

```json
{
  "name": "Rechazado",
  "code": "REJECTED"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "Rechazado",
  "code": "REJECTED"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

### 4.4. Categorías

#### GET /categories

Obtener todas las categorías de fraude del sistema.

**Acceso:** Usuario

Una categoría representa el **origen o contexto donde se detectó el fraude**, por ejemplo, una red social o un marketplace.

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

#### POST /audit-actions

Crear una acción de auditoría del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción                      |
| ----- | ------ | ----------- | -------------------------------- |
| name  | string | Sí          | Nombre de la acción de auditoría |
| code  | string | Sí          | Código de la acción de auditoría |

##### Ejemplo de solicitud

```json
{
  "name": "Validar",
  "code": "VALIDATE"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 4,
  "name": "Validar",
  "code": "VALIDATE"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

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

#### POST /modified-fields

Crear un nuevo campo modificado del sistema.

**Acceso:** Administrador

##### Body

| Campo | Tipo   | Obligatorio | Descripción                 |
| ----- | ------ | ----------- | --------------------------- |
| name  | string | Sí          | Nombre del campo modificado |
| code  | string | Sí          | Código del campo modificado |

##### Ejemplo de solicitud

```json
{
  "name": "Vendedor",
  "code": "SELLER"
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 3,
  "name": "Vendedor",
  "code": "SELLER"
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 409 Conflict

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

Asociar una nueva autoridad al sistema.

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
| role         | Integer | No          | Rol del usuario.                                                           |
| initial-date | String  | No          | Fecha inicial de la creación de la cuenta de usuario, en formato ISO 8601. |
| final-date   | String  | No          | Fecha final de la creación de la cuenta de usuario, en formato ISO 8601.   |

##### Respuestas

* 200 OK

```json
{
  "data": [
    {
      "id": 1,
      "username": "andres123",
      "email": "andres123@correo.com",
      "created_at": "2026-09-22T09:58:43.123Z",
      "is_active": true,
      "role_id": 1
    }
  ]
}
```

Si la página solicitada no contiene resultados, se devuelve una lista vacía:

```json
{
  "data": []
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden

#### GET /users/:userId

Obtener la información de un usuario.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción    |
| ------ | ------- | ----------- | -------------- |
| userId | Integer | Sí          | ID del usuario |

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
* 403 Forbidden
* 404 Not Found

#### PATCH /users/:userId

Modificar los datos de un usuario. El propietario puede modificar su nombre de usuario y contraseña. El administrador puede modificar el estado de la cuenta y el rol.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción    |
| ------ | ------- | ----------- | -------------- |
| userId | Integer | Sí          | ID del usuario |

##### Body

| Campo     | Tipo    | Obligatorio | Descripción                     |
| --------- | ------- | ----------- | ------------------------------- |
| username  | String  | Condicional | Nombre del usuario              |
| password  | String  | Condicional | Contraseña a cambiar            |
| is_active | Boolean | Condicional | Estado de la cuenta del usuario |
| role_id   | Integer | Condicional | Rol del usuario                 |

##### Ejemplo de solicitud

```json
{
  "username": "Andres1234",
  "password": "superSecret"
}
```

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
* **REJECTED:** la publicación contiene contenido inválido o basura y no debe continuar en el flujo normal. Estas publicaciones pueden eliminarse posteriormente.

La revisión permite que el contenido sea modificado antes de hacerse visible cuando sea necesario. El estado `is_fraud` se determina durante la validación.

### 6.1. Obtener publicaciones

#### GET /posts

Obtener una página de publicaciones de fraude. Los usuarios pueden consultar las publicaciones visibles. Los propietarios pueden consultar sus borradores y los administradores pueden consultar también publicaciones no publicadas.

**Acceso:** Usuario, propietario o administrador

##### Parámetros de query

| Campo        | Tipo         | Obligatorio | Descripción                                                                                                         | Restringido |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| page         | Integer      | No          | Página de resultados a obtener. Comienza en 1.                                                                      | No          |
| category     | Integer list | No          | IDs de las categorías asociadas a las publicaciones.                                                                | No          |
| type         | Integer list | No          | IDs de los tipos asociados a las publicaciones.                                                                     | No          |
| phone        | String       | No          | Teléfono asociado a la publicación.                                                                                 | No          |
| url          | String       | No          | URL asociada a la publicación.                                                                                      | No          |
| platform     | String       | No          | Plataforma asociada a la publicación.                                                                               | No          |
| email        | String       | No          | Correo asociado a la publicación.                                                                                   | No          |
| is-fraud     | Boolean      | No          | Indica si la publicación corresponde a un fraude confirmado.                                                        | No          |
| state        | Integer list | No          | IDs de los estados de las publicaciones. Los estados no públicos están restringidos según los permisos del usuario. | Parcial     |
| initial-date | String       | No          | Fecha inicial del periodo de publicación, en formato ISO 8601.                                                      | Sí          |
| final-date   | String       | No          | Fecha final del periodo de publicación, en formato ISO 8601.                                                        | Sí          |
| author       | Integer list | No          | IDs de los usuarios que realizaron las publicaciones.                                                               | Sí          |
| deleted      | Boolean      | No          | Indica si se deben consultar publicaciones eliminadas.                                                              | Sí          |

##### Respuestas

* 200 OK

Para usuarios:

```json
{
  "data": [
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
      "status_id": 2,
      "is_fraud": true,
      "published_at": "2026-09-22T09:58:43.123Z",
      "author": 1,
      "category": 2,
      "types": [1, 2]
    }
  ]
}
```

Para administradores, se incluye `is_anonymous` y `deleted_at`:

```json
{
  "data": [
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
      "status_id": 2,
      "is_fraud": true,
      "published_at": "2026-09-22T09:58:43.123Z",
      "author": 1,
      "category": 2,
      "types": [1, 2],
      "is_anonymous": false,
      "deleted_at": null
    }
  ]
}
```

Si la página solicitada no contiene resultados:

```json
{
  "data": []
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden

### 6.2. Obtener una publicación

#### GET /posts/:postId

Obtener una publicación de fraude. Los usuarios pueden consultar publicaciones públicas, mientras que el propietario puede consultar sus borradores y el administrador puede consultar publicaciones no publicadas.

**Acceso:** Usuario, propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

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
  "status_id": 2,
  "is_fraud": true,
  "published_at": "2026-09-22T09:58:43.123Z",
  "author": 1,
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
  "status_id": 2,
  "is_fraud": true,
  "published_at": "2026-09-22T09:58:43.123Z",
  "author": 1,
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

### 6.3. Crear una publicación

#### POST /posts

Crear una publicación de fraude.

**Acceso:** Usuario

La publicación puede ser creada como borrador o enviada para revisión. La categoría y los tipos de fraude se asocian durante la creación de la publicación.

Una publicación puede guardarse como `DRAFT` aunque no tenga descripción ni evidencia. Sin embargo, cuando se envía para revisión, debe contar con una descripción o al menos una evidencia.

##### Body

| Campo            | Tipo         | Obligatorio | Descripción                                                          |
| ---------------- | ------------ | ----------- | -------------------------------------------------------------------- |
| title            | String       | Sí          | Título de la publicación                                             |
| description      | String       | No          | Descripción del fraude                                               |
| seller_name      | String       | No          | Nombre del vendedor relacionado con el fraude                        |
| product          | String       | No          | Producto relacionado con el fraude                                   |
| phone_number     | String       | No          | Teléfono relacionado con el fraude                                   |
| url              | String       | No          | URL relacionada con el fraude                                        |
| platform         | String       | No          | Plataforma donde ocurrió el posible fraude                           |
| fraudulent_email | String       | No          | Correo electrónico relacionado con el posible fraude                 |
| category         | Integer      | Sí          | ID de la categoría de la publicación                                 |
| types            | Integer list | Sí          | IDs de los tipos de fraude asociados a la publicación                |
| is_anonymous     | Boolean      | Sí          | Indica si la identidad del autor debe mantenerse anónima al publicar |
| state            | Integer      | Sí          | Estado inicial de la publicación                                     |
| evidences        | Object list  | No          | Evidencias que se desean asociar durante la creación                 |

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
  "is_anonymous": true,
  "state": 1,
  "evidences": [
    {
      "url": "https://ejemplo.com/evidencia.jpg",
      "evidence_type": 1
    }
  ]
}
```

##### Respuestas

* 201 Created

```json
{
  "id": 1,
  "title": "Producto falso en Marketplace",
  "status_id": 1,
  "is_fraud": false,
  "author": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 6.4. Actualizar una publicación

#### PATCH /posts/:postId

Actualizar un borrador o publicación. El propietario puede actualizar un borrador. El administrador puede actualizar una publicación.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción                      |
| ------ | ------- | ----------- | -------------------------------- |
| postId | Integer | Sí          | ID de la publicación a modificar |

##### Body

| Campo            | Tipo         | Obligatorio | Descripción                                |
| ---------------- | ------------ | ----------- | ------------------------------------------ |
| title            | String       | No          | Título de la publicación                   |
| description      | String       | No          | Descripción del fraude                     |
| seller_name      | String       | No          | Nombre del vendedor                        |
| product          | String       | No          | Producto relacionado                       |
| phone_number     | String       | No          | Teléfono relacionado                       |
| url              | String       | No          | URL relacionada                            |
| platform         | String       | No          | Plataforma relacionada                     |
| fraudulent_email | String       | No          | Correo relacionado con el fraude           |
| category         | Integer      | No          | Nueva categoría de la publicación          |
| types            | Integer list | No          | Tipos de fraude asociados a la publicación |
| is_anonymous     | Boolean      | No          | Indica si la publicación debe ser anónima  |
| state            | Integer      | No          | Nuevo estado de la publicación             |
| is_fraud         | Boolean      | No          | Estado de confirmación del fraude          |

Cuando `types` se incluye en la solicitud, representa la lista de tipos que quedará asociada a la publicación. Si el campo se omite, las asociaciones existentes no se modifican.

El cambio de estado se utiliza para controlar el flujo de revisión de la publicación según los permisos correspondientes.

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
  "author": 1,
  "category": 2
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 6.5. Eliminar una publicación

#### DELETE /posts/:postId

Borrar una publicación o borrador.

El propietario puede borrar sus propios borradores. El administrador puede borrar publicaciones.

La eliminación de una publicación es lógica, por lo que el registro puede conservarse y marcarse como eliminado mediante `deleted_at`.

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
      "user": 2,
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
      "user": 2,
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
| information   | String  | Sí          | Información adicional que explica el motivo del reporte |
| report_reason | Integer | Sí          | ID de la razón por la que se reporta la publicación     |

##### Ejemplo de solicitud

```json
{
  "information": "La información presentada no corresponde con mi experiencia.",
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
  "user": 2,
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

Una evidencia representa información que respalda una publicación de fraude. Las evidencias se crean siempre asociadas a una publicación, evitando la existencia de evidencias sin una publicación relacionada.

El `evidence_type` identifica el formato o tipo de evidencia mediante el catálogo `/evidence-types`.

Las evidencias pueden agregarse después de crear una publicación, por ejemplo, cuando una evidencia anterior fue eliminada o necesita ser reemplazada por una versión modificada.

### 8.1. Obtener evidencias

#### GET /evidences

Obtener una página de evidencias.

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
      "url": "https://ejemplo.com/evidencia.jpg",
      "evidence_type": 1,
      "post": 1
    }
  ]
}
```

* 401 Unauthorized
* 403 Forbidden

### 8.2. Obtener evidencias de una publicación

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

### 8.3. Crear una evidencia

#### POST /posts/:postId/evidences

Crear una evidencia para una publicación existente.

**Acceso:** Propietario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Body

| Campo         | Tipo    | Obligatorio | Descripción                         |
| ------------- | ------- | ----------- | ----------------------------------- |
| url           | String  | Sí          | URL donde se encuentra la evidencia |
| evidence_type | Integer | Sí          | ID del tipo de evidencia            |

##### Ejemplo de solicitud

```json
{
  "url": "https://ejemplo.com/evidencia2.jpg",
  "evidence_type": 1
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

### 8.4. Eliminar una evidencia

#### DELETE /posts/:postId/evidences/:evidenceId

Borrar una evidencia de una publicación.

**Acceso:** Propietario o administrador

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
      "user": 1,
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
  "user": 1,
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
    "user": 1,
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
  "user": 2
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

## 11. Suscripciones

Las suscripciones permiten que un usuario indique interés en recibir posteriormente notificaciones relacionadas con determinados tipos de fraude. En esta versión de la API únicamente se registra la suscripción; el mecanismo de notificaciones se implementará posteriormente.

### 11.1. Obtener suscripciones

#### GET /subscriptions

Obtener una página de suscripciones del usuario autenticado.

**Acceso:** Usuario

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
      "type_id": 1,
      "type": {
        "id": 1,
        "name": "Producto falso",
        "code": "FAKE_PROD"
      }
    }
  ]
}
```

* 401 Unauthorized

### 11.2. Obtener suscripciones de un usuario

#### GET /users/:userId/subscriptions

Obtener una página de suscripciones de un usuario.

**Acceso:** Propietario o administrador

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción    |
| ------ | ------- | ----------- | -------------- |
| userId | Integer | Sí          | ID del usuario |

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
      "type_id": 1,
      "type": {
        "id": 1,
        "name": "Producto falso",
        "code": "FAKE_PROD"
      }
    }
  ]
}
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 11.3. Crear una suscripción

#### POST /subscriptions

Suscribirse a un tipo de fraude.

**Acceso:** Usuario

##### Body

| Campo   | Tipo    | Obligatorio | Descripción                                     |
| ------- | ------- | ----------- | ----------------------------------------------- |
| type_id | Integer | Sí          | ID del tipo de fraude al que se desea suscribir |

##### Ejemplo de solicitud

```json
{
  "type_id": 1
}
```

##### Respuestas

* 201 Created

```json
{
  "user": 2,
  "type_id": 1
}
```

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 409 Conflict

### 11.4. Eliminar una suscripción

#### DELETE /subscriptions/:typeId

Desuscribirse de un tipo de fraude.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción           |
| ------ | ------- | ----------- | --------------------- |
| typeId | Integer | Sí          | ID del tipo de fraude |

##### Respuestas

* 204 No Content
* 401 Unauthorized
* 404 Not Found

## 12. Autoridades

Una publicación tiene una sola autoridad asociada. La asociación permite indicar qué autoridad resulta pertinente para atender el caso de acuerdo con los tipos de fraude de la publicación.

### 12.1. Obtener autoridades de un tipo de fraude

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

### 12.2. Asociar autoridad a tipo

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

### 12.3. Desasociar autoridad de tipo

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

### 12.4. Obtener autoridad de una publicación

#### GET /posts/:postId/authority

Obtener la autoridad asociada a una publicación.

**Acceso:** Usuario

##### Parámetros de ruta

| Campo  | Tipo    | Obligatorio | Descripción          |
| ------ | ------- | ----------- | -------------------- |
| postId | Integer | Sí          | ID de la publicación |

##### Respuestas

* 200 OK

```json
{
  "id": 1,
  "name": "PROFECO",
  "code": "PROFECO",
  "description": "Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor."
}
```

* 401 Unauthorized
* 404 Not Found

### 12.5. Asociar autoridad a una publicación

#### POST /posts/:postId/authority/:authorityId

Asociar una autoridad a una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción                             |
| ----------- | ------- | ----------- | --------------------------------------- |
| postId      | Integer | Sí          | ID de la publicación                    |
| authorityId | Integer | Sí          | ID de la autoridad que se desea asociar |

##### Respuestas

* 201 Created

```json
{
  "post_id": 1,
  "authority_id": 1
}
```

* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict

### 12.6. Cambiar autoridad de una publicación

#### PATCH /posts/:postId/authority/:authorityId

Cambiar la autoridad asociada a una publicación.

**Acceso:** Administrador

##### Parámetros de ruta

| Campo       | Tipo    | Obligatorio | Descripción                             |
| ----------- | ------- | ----------- | --------------------------------------- |
| postId      | Integer | Sí          | ID de la publicación                    |
| authorityId | Integer | Sí          | ID de la autoridad actualmente asociada |

##### Body

| Campo        | Tipo    | Obligatorio | Descripción              |
| ------------ | ------- | ----------- | ------------------------ |
| authority_id | Integer | Sí          | ID de la nueva autoridad |

##### Ejemplo de solicitud

```json
{
  "authority_id": 2
}
```

##### Respuestas

* 200 OK

```json
{
  "post_id": 1,
  "authority_id": 2
}
```

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found

### 12.7. Quitar autoridad de una publicación

#### DELETE /posts/:postId/authority

Quitar la autoridad asociada a una publicación.

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

## 13. Auditoría

Los registros de auditoría permiten consultar las modificaciones realizadas por administradores sobre los recursos del sistema.

### 13.1. Obtener registros de auditoría

#### GET /audit-logs

Obtener una página de registros de modificación.

**Acceso:** Administrador

##### Parámetros de query

| Campo         | Tipo    | Obligatorio | Descripción                                                                 |
| ------------- | ------- | ----------- | --------------------------------------------------------------------------- |
| page          | Integer | No          | Página de resultados a obtener. Comienza en 1.                              |
| audit-action  | Integer | No          | ID de la acción de auditoría                                                |
| performed-by  | Integer | No          | ID del administrador que realizó la acción                                  |
| affected-user | Integer | No          | ID del usuario afectado por la acción                                       |
| post          | Integer | No          | ID de la publicación de fraude afectada por la acción                       |
| evidence      | Integer | No          | ID de la evidencia afectada por la acción                                   |
| initial-date  | String  | No          | Fecha inicial del periodo de creación de los registros, en formato ISO 8601 |
| final-date    | String  | No          | Fecha final del periodo de creación de los registros, en formato ISO 8601   |

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
      "initial_date": "2026-09-22T09:58:43.123Z",
      "final_date": "2026-09-22T09:58:43.123Z",
      "modified_field": "Descripción",
      "old_value": "Esta es una descripción",
      "new_value": "Esta es la nueva descripción"
    }
  ]
}
```

Los campos `old_value` y `new_value` representan como texto el valor anterior y el nuevo valor del campo modificado.

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
