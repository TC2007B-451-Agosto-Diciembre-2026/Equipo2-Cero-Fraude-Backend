# Api Cero Fraude

API backend para el sistema Cero Fraude, una plataforma para el registro y consulta de reportes de fraude.

## Contribuidores

- Armando Vásquez
- Diego Martínez
- Hugo Rodríguez
- Mariana González

## Requisitos

* Node.js
* npm
* MySQL

## Instalación

```bash
$ git clone https://github.com/TC2007B-451-Agosto-Diciembre-2026/Equipo2-Cero-Fraude-Backend.git
$ cd cero-fraude-api
$ npm install
```

## Iniciar base de datos

Entrar al entorno de MySQL y ejecutar los siguientes archivos en orden:
```sql
SOURCE [path_to_schema.sql];

SOURCE [path_to_seed.sql];
```

## Configuración de .env

Renombrar el archivo .env.example a .env.

Configurar las credenciales y parámetros de conexión a la base de datos:

DB_USER=[usuario]<br>
DB_PASSWORD=[contraseña]<br>
DB_HOST=localhost<br>
DB_PORT=3306<br>
DB_NAME=cero_fraude<br>

DB_USER y DB_PASSWORD deben corresponder a un usuario de MySQL con permisos sobre la base de datos cero_fraude.

## Ejecución

```bash
# Desarrollo
$ npm run start

# Desarrollo con cambios automáticos
$ npm run start:dev

# Producción
$ npm run start:prod
```

## Pruebas

```bash
$ npm run test
$ npm run test:e2e
$ npm run test:cov
```

## Estructura del proyecto

