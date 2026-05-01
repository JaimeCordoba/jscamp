# Estructura Recomendada: Backend Modular (Nivel 3)

Esta estructura es el "punto dulce" para el 90% de los proyectos backend (APIs, SaaS, Microservicios). Separa responsabilidades sin añadir complejidad excesiva.

## Árbol de Carpetas

```text
src/
├── app.ts          # Punto de entrada y config del servidor
├── routes/         # Definición de URLs y métodos (GET, POST...)
├── controllers/    # Orquestación: recibe Request, llama al Model, envía Response
├── models/         # Lógica de datos: Queries SQL y manipulación de datos
├── middlewares/    # Filtros de seguridad (CORS, Auth) y validación previa
├── schemas/        # Esquemas de validación de datos (Zod)
├── db/             # Inicialización de la base de datos y scripts de carga (Seed)
├── types.ts        # Definiciones de tipos TypeScript globales
└── utils/          # (Opcional) Funciones de ayuda generales (fechas, crypto...)
```

## ¿Por qué funciona?

1.  **Escalabilidad**: Puedes añadir 50 tablas más siguiendo el mismo patrón.
2.  **Mantenibilidad**: Si falla el SQL, vas a `models`. Si falla la URL, vas a `routes`.
3.  **Seguridad**: Los `middlewares` y `schemas` actúan como escudos antes de tocar la lógica.
4.  **Testeo**: Es fácil testear un `model` o un `controller` por separado.

> [!TIP]
> No pases al Nivel 4 (Services) a menos que un controlador tenga demasiada lógica de negocio o necesites integrar muchos servicios externos (Stripe, Emails, etc).
