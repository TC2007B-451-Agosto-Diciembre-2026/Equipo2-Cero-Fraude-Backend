# Catálogos de la base de datos

En esta documento se describen los catálogos utilizados por Cero Fraude y el significado de los valores definidos para cada uno.


## `user_role`

Indica el rol al que está asociado un usuario dentro del sistema.

| **Código** | **Nombre**    | **Descripción**                                                                                                                             |
| :--------: | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| USER       | Usuario       | Usuario que puede consultar, crear y gestionar sus propias publicaciones e interactuar con el contenido de la aplicación                    |
| ADMIN      | Administrador | Usuario encargado de revisar publicaciones, validar contenido, administrar el sistema y gestionar las funciones administrativas disponibles |


## `post_status`

Indica el estado en el que se encuentra actualmente una publicación dentro del sistema.

| **Código** | **Nombre** | **Descripción**                                                                                        |
| :--------: | :--------- | :----------------------------------------------------------------------------------------------------- |
| DRAFT      | Borrador   | Indica que la publicación aún está siendo elaborada y no ha sido enviada                               |
| UPLOADED   | Subido     | Indica que la publicación fue enviada al sistema y está pendiente de publicación                       |
| PUBLISHED  | Publicado  | Indica que la publicación se encuentra disponible para los usuarios                                    |
| VALIDATED  | Validado   | Indica que la publicación fue revisada por un administrador y determinó si correspone o no a un fraude |


## `reaction_type`

Indica el tipo de reacción que tuvo un usuario respecto a una publicación.

| **Código** | **Nombre** | **Descripción**                                    |
| :--------: | :--------- | :------------------------------------------------- |
| LIKE       | Like       | Indica una reacción positiva hacia una publicación |
| DISLIKE    | Dislike    | Indica una reacción negativa hacia una publicación |


## `fraud_category`

Indica el medio o contexto del que provino o en el que apareció la oferta reportada.

| **Código** | **Nombre**         | **Descripción**                                                                                     |
| :--------: | :----------------- | :-------------------------------------------------------------------------------------------------- |
| SOCIAL     | Redes Sociales     | La oferta fue encontrada o recibida a través de una red social                                      |
| MARKET     | Marketplace        | La oferta fue encontrada en una plataforma de compraventa entre usuarios                            |
| MESSAGE    | Mensajería         | La oferta fue recibida a través de una aplicación o servicio de mensajería                          |
| EMAIL      | Correo electrónico | La oferta fue recibida a través de correo electrónico                                               |
| WEBSITE    | Sitio web          | La oferta fue encontrada en un sitio web                                                            |
| OTHER      | Otro               | La oferta provino de un medio o contexto que no corresponde a ninguna de las categorías disponibles |


## `fraud_type`

Indica el tipo de fraude al que pertenece la situación que el usuario quiere reportar.

| **Código** | **Nombre**            | **Descripción**                                                                                    |
| :--------: | :-------------------- | :------------------------------------------------------------------------------------------------- |
| FAKE_PROD  | Producto falso        | Indica que el producto ofrecido no existe o no corresponde con lo anunciado                        |
| BAD_PRICE  | Precio engañoso       | Indica que el precio anunciado no corresponde con el precio real de la oferta                      |
| FAKE_PROMO | Promoción falsa       | Indica que la promoción anunciada no existe o que sus condiciones son engañosas                    |
| FAKE_SELL  | Vendedor falso        | Indica que el vendedor no existe o utiliza una identidad falsa para realizar la oferta             |
| FAKE_STORE | Tienda falsa          | Indica que la tienda desde la que se realiza la oferta no existe o es fraudulenta                  |
| BRAND_IMP  | Suplantación de marca | Indica que quien realiza la oferta se hace pasar por una marca o negocio legítimo                  |
| OTHER      | Otro                  | Indica que la oferta presenta otro tipo de irregularidad no contemplada en las opciones anteriores |


## `audit_action`

Indica la acción registrada sobre un determinado elemento del sistema.

| **Código** | **Nombre**        | **Descripción**                                                                                   |
| :--------: | :---------------- | :------------------------------------------------------------------------------------------------ |
| CREATE     | Crear             | Indica la creación de un elemento relevante                                                       |
| UPDATE     | Editar            | Indica la modificación de un elemento relevante en el sistema                                     |
| DELETE     | Eliminar          | Indica la eliminación de un elemento en el sistema                                                |
| VALIDATE   | Validar           | Indica la validación de una publicación                                                           |
| HIDE_EVID  | Ocultar evidencia | Indica que un administrador decidió ocultar una evidencia de una publicación determinada          |
| SHOW_EVID  | Mostrar evidencia | Indica que un administrador decidió volver a mostrar una evidencia de una publicación determinada |
| DEACT_USER | Desactivar usuario | Indica que un administrador decidió desactivar la cuenta de un usuario |
| ACT_USER | Activar usuario | Indica que un administrador decidió volver a activar la cuenta de un usuario |


## `report_reason`

Indica la razón por la que una determinada publicación fue reportada por otro usuario.

| **Código** | **Nombre**                     | **Descripción**                                                                                  |
| :--------: | :----------------------------- | :----------------------------------------------------------------------------------------------- |
| FALSE_INFO | Información incorrecta         | Indica que la publicación reportada contiene información falsa sobre la supuesta oferta o fraude |
| DUPLICATE  | Contenido duplicado            | Indica que ya existe la misma publicación                                                        |
| PERS_INFO  | Información personal           | Indica que la publicación reportada expone información personal que no debería mostrarse         |
| INAPPROP   | Contenido inapropiado          | Indica que la publicación reportada contiene material inapropiado                                |
| NOT_FRAUD  | No está relacionado con fraude | Indica que el contenido de la publicación no corresponde a una situación de fraude               |
| OTHER      | Otro                           | Indica que la razón del reporte no coincide con ninguna de las anteriores                        |


## `evidence_type`

Indica el formato en el que se encuentra una evidencia.

| **Nombre** | **Descripción**                                                            |
| :--------: | :------------------------------------------------------------------------- |
| Imagen     | Indica que la evidencia corresponde a un archivo de imagen                 |
| PDF        | Indica que la evidencia corresponde a un archivo PDF                       |
| Otro       | Indica que la evidencia corresponde a otro formato admitido por el sistema |


## `modified_field`

Indica un campo que ha sido modificado.

| **Código** | **Nombre**               | **Descripción**                                                                |
| :--------: | :----------------------- | :----------------------------------------------------------------------------- |
| TITLE      | Título                   | Indica que el título de una publicación ha sido modificado                     |
| DESC       | Descripción              | Indica que la descripción de una publicación ha sido modificada                |
| SELLER     | Vendedor                 | Indica que el vendedor asociado a una publicación ha sido modificado           |
| PRODUCT    | Producto                 | Indica que el producto asociado a una publicación ha sido modificado           |
| PHONE      | Teléfono                 | Indica que el número de teléfono asociado a una publicación ha sido modificado |
| URL        | URL                      | Indica que la URL asociada a una publicación ha sido modificada                |
| PLATFORM   | Plataforma               | Indica que la plataforma asociada a una publicación ha sido modificada         |
| FRAUD_MAIL | Correo fraudulento       | Indica que el correo fraudulento asociado a una publicación ha sido modificado |
| STATUS     | Estado                   | Indica que el estado de la publicación ha sido modificado                      |
| IS_FRAUD   | Validación de fraude     | Indica que la validación del fraude en una publicación ha sido modificada      |
| ANONYMOUS  | Publicación anónima      | Indica que se modificó si la publicación se muestra de forma anónima o no      |
| CATEGORY   | Categoría                | Indica que la categoría asociada a una publicación cambió                      |
| FRAUD_TYPE | Tipo de fraude           | Indica que el tipo de fraude asociado a una publicación cambió                 |
| EVID_VIS   | Visibilidad de evidencia | Indica que la visibilidad de las evidencias de una publicación cambió          |


## `authority`

Indica las autoridades a las que se puede recurrir dependiendo del tipo de fraude asociado a una publicación o del criterio del evaluador.

| **Código** | **Nombre**          |
| :--------: | :------------------ |
| PROFECO    | PROFECO             |
| POL_CIB    | Policía cibernética |
| CONDUSEF   | CONDUSEF            |
