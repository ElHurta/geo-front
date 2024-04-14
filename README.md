# README - Proyecto Frontend

## Introducción

Este proyecto frontend es una aplicación web desarrollada con React y TypeScript que consume la API del proyecto backend para mostrar información sobre eventos sismológicos. La aplicación permite visualizar una lista de eventos con paginación y filtros, ver los detalles de un evento específico y crear comentarios asociados a cada evento.

## Instrucciones de ejecución

### Requisitos previos

- Node.js (versión 20.12.2)
- npm (versión 9.8.1)

### Pasos para ejecutar el proyecto

Nota: Es necesario tener el proyecto backend en ejecución para que la aplicación frontend pueda funcionar correctamente.

1. Clonar el repositorio:

```bash
git clone https://github.com/ElHurta/geo-api
```

2. Navegar al directorio del proyecto:

```bash
cd geo-front
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Tecnologías utilizadas

- React: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- TypeScript: Superset de JavaScript que añade tipos estáticos opcionales.
- Material-UI: Biblioteca de componentes de interfaz de usuario para React.
- Axios: Cliente HTTP basado en promesas para realizar peticiones a la API.
