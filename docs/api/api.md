# Documentación API Cero Fraude

## 1. Introducción

### 1.1. Propósito

Esta sección proporciona una vista general de los endpoints disponibles. La especificación detallada de cada endpoint se encuentra en las secciones correspondientes.

### 1.2. Tipos de acceso

- **Público:** no requiere autenticación.
- **Usuario:** cualquier usuario autenticado.
- **Propietario:** usuario autenticado propietario del recurso.
- **Administrador:** usuario autenticado con rol de administrador.

### 1.3. Abreviaturas

Ob: Obligatorio
Op: Opcional

## 2. Resumen de endpoints

| Metódo | Endpoint                             | Acceso                                                                                                     | Descripción                                                              |
| ------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| POST   | /auth/register                       | Público                                                                                                    | Registro de un usuario                                                   |
| POST   | /auth/login                          | Público                                                                                                    | Login de un usuario                                                      |
| POST   | /auth/refresh                        | Público                                                                                                    | Obtener nuevo token de acceso con token de actualización                 |
| POST   | /auth/logout                         | Usuario                                                                                                    | Logout de un usuario                                                     |
| GET    | /roles                               | Administrador                                                                                              | Obtener los roles de usuario del sistema                                 |
| POST   | /roles                               | Administrador                                                                                              | Crear un nuevo rol de usuario                                            |
| GET    | /reactions                           | Administrador                                                                                              | Obtener todas las reacciones                                             |
| POST   | /reactions                           | Administrador                                                                                              | Crear una reacción nueva                                                 |
| GET    | /states                              | Usuario                                                                                                    | Obtener los estados posibles de una publicación del sistema              |
| POST   | /states                              | Administrador                                                                                              | Crear un nuevo estado de publicación                                     |
| GET    | /categories                          | Usuario                                                                                                    | Obtener todas las categorías posibles de una publicación del sistema     |
| POST   | /categories                          | Administrador                                                                                              | Crear una nueva categoría de publicación                                 |
| GET    | /audit-actions                       | Administrador                                                                                              | Obtener una página de acciones de moderación                             |
| POST   | /audit-actions                       | Administrador                                                                                              | Realizar una acción de moderación                                        |
| GET    | /reports-reasons                     | Usuario                                                                                                    | Obtener las posibles razones para reportar una publicación               |
| POST   | /reports-reasons                     | Administrador                                                                                              | Crear una razón para reportar una publicación                            |
| GET    | /types                               | Usuario                                                                                                    | Obtener todos los tipos posibles de una publicación del sistema          |
| POST   | /types                               | Administrador                                                                                              | Crear un nuevo tipo de publicación                                       |
| GET    | /modified-fields                     | Administrador                                                                                              | Obtener los posibles campos de modificación de una publicación           |
| POST   | /modified-fields                     | Administrador                                                                                              | Crear un posible campo de modificación de una publicación                |
| GET    | /authorities                         | Administrador                                                                                              | Obtener las autoridades registradas en el sistema                        |
| POST   | /authorities                         | Administrador                                                                                              | Registrar una nueva autoridad al sistema                                 |
| PATCH  | /authorities                         | Administrador                                                                                              | Modificar el nombre o descripción de una autoridad                       |
| GET    | /users                               | Administrador                                                                                              | Obtener una página de usuarios                                           |
| GET    | /users/:id                           | Administrador o propietario.                                                                               | Obtener un usuario                                                       |
| PATCH  | /users/:id                           | Propietario para modificar username y password_hash. Administrador para is_active y role_id.               | Modificar el nombre, estado, rol o contraseña de un usuario              |
| GET    | /posts                               | Usuario para todas las publicaciones visibles. Administrador para recibir también los posts no publicados. | Obtener una página de publicaciones                                      |
| GET    | /users/:id/posts                     | Propietario o administrador.                                                                               | Obtener una página de publicaciones visibles y no visibles de un usuario |
| GET    | /posts/:id                           | Propietario o administrador. Usuario si la publicación es pública.                                         | Obtener una publicación                                                  |
| POST   | /posts                               | Usuario                                                                                                    | Crear una publicación                                                    |
| PATCH  | /posts/:id                           | Propietario para actualizar borrador. Administrador para actualizar post.                                  | Actualizar un borrador/ publicación                                      |
| DELETE | /posts/:id                           | Propietario para borrar borrador. Administrador para borrar publicación.                                   | Borrar una publicación o borrador                                        |
| GET    | /reports                             | Administrador                                                                                              | Obtener una página de reportes realizados                                |
| GET    | /posts/:postId/reports               | Administrador                                                                                              | Obtener los reportes de una publicación                                  |
| POST   | /posts/:postId/reports               | Usuario                                                                                                    | Crear un reporte de una publicación                                      |
| DELETE | /posts/:postId/reports/:reportId     | Administrador                                                                                              | Borrar un reporte de una publicación                                     |
| GET    | /evidences                           | Administrador                                                                                              | Obtener una página de evidencias                                         |
| GET    | /posts/:postId/evidences             | Propietario o administrador. Usuario si la publicación es pública.                                         | Obtener las evidencias de una publicación                                |
| POST   | /evidences                           | Usuario.                                                                                                   | Crear una evidencia para una publicación nueva                           |
| POST   | /posts/:postId/evidences             | Propietario                                                                                                | Crear una evidencia para una publicación ya existente                    |
| DELETE | /evidences/:eviId                    | Propietario                                                                                                | Borrar una evidencia                                                     |
| DELETE | /posts/:postId/evidences/:eviId      | Propietario o administrador                                                                                | Borrar una evidencia                                                     |
| GET    | /comments                            | Administrador                                                                                              | Obtener todos los comentarios                                            |
| POST   | /posts/:postId/comments              | Administrador                                                                                              | Crear un comentario sobre una publicación                                |
| GET    | /posts/:postId/comments              | Usuario                                                                                                    | Obtener todos los comentarios de una publicación                         |
| GET    | /posts/:postId/reactions             | Usuario                                                                                                    | Obtener la cantidad de reacciones por reacción de una publicación        |
| POST   | /posts/:postId/reactions/:reactionId | Usuario                                                                                                    | Crear una nueva reacción a una publicación                               |
| DELETE | /posts/:postId/reactions             | Usuario                                                                                                    | Borrar una reacción a una publicación                                    |
| GET    | /subscriptions                       | Usuario                                                                                                    | Obtener una página las suscripciones                                     |
| GET    | /users/:userId/subscriptions         | Usuario                                                                                                    | Obtener una página de suscripciones de un usuario                        |
| POST   | /subscriptions                       | Usuario                                                                                                    | Suscribirse a un tipo de publicación                                     |
| DELETE | /subscriptions/:tipoId               | Usuario                                                                                                    | Desuscribrse a un tipo de publicación                                    |
| GET    | /types/:typeId/authorities           | Administrador                                                                                              | Obtener las autoridades asociadas a un tipo de publicación               |
| POST   | /types/:typeId/authorities           | Administrador                                                                                              | Asociar una autoridad a un tipo de fraude                                |
| DELETE | /types/:typeId/authorities           | Administrador                                                                                              | Desasociar una autoridad de un tipo de fraude                            |
| GET    | /posts/:postId/authority             | Usuario                                                                                                    | Obtener la autoridad asociada a una publicación                          |
| POST   | /posts/:postId/authority             | Administrador                                                                                              | Asociar una autoridad a una publicación                                  |
| PATCH  | /posts/:postId/authority             | Administrador                                                                                              | Cambiar la autoridad asociada a una publicación                          |
| DELETE | /posts/:postId/authority             | Administrador                                                                                              | Quitar la autoridad asociada a una publicación                           |
| GET    | /audit-logs                          | Administrador                                                                                              | Obtener una página de registros de modificación                          |
| POST   | /audit-logs                          | Administrador                                                                                              | Crear un registro de modificación                                        |
