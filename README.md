# Api Cero Fraude

API backend para el sistema Cero Fraude, una plataforma para el registro y consulta de reportes de fraude.

## Contribuidores

- Armando Vásquez
- Diego Martínez
- Hugo Rodríguez
- Mariana González

## Descripción

## Requisitos

* Node.js
* npm

## Instalación

```bash
$ git clone https://github.com/TC2007B-451-Agosto-Diciembre-2026/Equipo2-Cero-Fraude-Backend.git
$ cd cero-fraude-api
$ npm install
```

## Configuración de .env
Crear archivo .env

Pegar el siguiente contenido en el archivo:
DB_USER=[usuario]
DB_PASSWORD=[contraseña]
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cero_fraude
SECRET_KEY=[secreto]

Remplazar usuario, contraseña y secreto.

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

src/
├── database/
├── users/
├── users/
├── users/
├── users/



├── config/
├── app.service.ts
└── main.ts