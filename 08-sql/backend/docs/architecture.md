# Arquitectura Detallada (Caveman Style)

## Flujo Datos

SQL DB → `db/database.ts` (Conn) → `models/job.ts` (Queries) → `controllers/job.ts` (Logic) → `routes/jobs.ts` (Routes) → `app.ts` (Server)

---

## Resumen por ficheros

- `db/database.ts`: SQLite init. WAL (veloz) + FK (orden).
- `db/seed.ts`: Script carga. Crea tablas + inserts. `npm run seed`.
- `schemas/job.ts`: Reglas Zod. Filtra basura en `req.body`.
- `middlewares/validation.ts`: Portero. Frena req si no cumple schema.
- `models/job.ts`: Cerebro datos. `better-sqlite3` inside. Mapea row → JSON.
- `controllers/job.ts`: Glue. Recibe req → Llama model → Responde res.
- `types.ts`: Contrato TS. Evita sustos.
- `test-sql.ts`: Sandbox. Prueba queries rápidas sin server.

---

## Capa Base de Datos (DB)

### `db/database.ts`

- **Qué:** Instancia global `better-sqlite3`.
- **Aporte:** Punto único conn.
- **WAL Mode:** Escribe en log → Lectura no bloqueada → +Velocidad.
- **Foreign Keys:** Obliga integridad. No borrar job si tiene techs asociadas.

### `db/seed.ts`

- **Qué:** Script purga e inicio.
- **Aporte:** Entorno reproducible. Crea esquema: `jobs` (base), `job_technologies` (n:m), `job_content` (1:1).
- **Dummy Data:** 3 jobs listos para test.

## Capa de Validación (Zod)

### `schemas/job.ts`

- **Qué:** Contrato de datos runtime.
- **Aporte:** Define qué campos son obligatorios. Infiere tipos TS directamente. Evita basura en DB.
- **SafeParse:** No lanza error → Devuelve objeto `{ success, data/error }`. Limpio.

## Capa de Aplicación (Backend)

### `models/job.ts`

- **Qué:** Lógica SQL pura.
- **Aporte:** Aísla DB del resto.
- **getAll:** Construye `WHERE` dinámico según filtros. `LEFT JOIN` para no perder jobs sin tech.
- **getById:** Une 3 tablas para objeto completo.
- **Mapeo:** Convierte `tech1,tech2` (string DB) → `['tech1', 'tech2']` (JSON API).
- **Transaction:** `create` / `update` usan transacciones. O se guarda todo o nada.

### `controllers/job.ts`

- **Qué:** Orquestador Req/Res.
- **Aporte:** Limpia `req.query`, `req.params`. Decide status HTTP: 200 (OK), 201 (Created), 404 (Not Found), 204 (No Content).

### `routes/jobs.ts`

- **Qué:** Registro endpoints.
- **Aporte:** Mapeo URL → Controlador. Define qué verbos (GET, POST...) acepta cada ruta.

### `app.ts`

- **Qué:** Manifiesto servidor.
- **Aporte:** Carga Express. Inyecta JSON parser. Arranca loop de escucha en puerto (default 3000).

## Capa de Middlewares (Filtros)

### `middlewares/cors.ts`

- **Qué:** Security gate.
- **Aporte:** Define quién puede llamar a la API (Browser security).

### `middlewares/validation.ts`

- **Qué:** Interceptor de tráfico.
- **Aporte:** Llama a `schemas/job.ts`. Si data mala → 400 Bad Request. Si data buena → Inyecta en `req.body` y sigue.

## Miscelánea

### `test-sql.ts`

- **Qué:** Script de pruebas SQL.
- **Aporte:** Debugging rápido. No necesita levantar todo el server Express para probar una query compleja.

### `types.ts`

- **Qué:** Diccionario tipos.
- **Aporte:** Seguridad. Evita bugs por typos. Define DTOs (Data Transfer Objects) para creación y edición parcial.

---

## Tests Manuales (Curl/Bruno)

### 1. Ver todos

`GET http://localhost:3000/jobs`

### 2. Filtrar por Tech

`GET http://localhost:3000/jobs?tech=React`

### 3. Ver detalle (includes content)

`GET http://localhost:3000/jobs/1`

### 4. Crear Job

`POST http://localhost:3000/jobs`
JSON:

```json
{
	"title": "Caveman Dev",
	"company": "Rock Corp",
	"location": "Cave",
	"description": "Hunt bugs",
	"data": {
		"technology": ["Club", "Fire"],
		"modality": "onsite",
		"level": "senior"
	}
}
```

### 5. Borrar

`DELETE http://localhost:3000/jobs/1`
