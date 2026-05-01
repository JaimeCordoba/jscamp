# Mini Guía: Better-SQLite3 (Caveman Style)

Resumen de operaciones esenciales extraídas de `test-sql.ts`.

## 1. Conexión

```typescript
import Database from "better-sqlite3"
const db = new Database("jobs.db") // Crea archivo si no existe
```

## 2. Ejecución Directa (`exec`)

Usa `exec` para comandos que **no** devuelven datos (crear tablas, pragmas).

```typescript
db.exec("CREATE TABLE IF NOT EXISTS units (id TEXT PRIMARY KEY, name TEXT)")
```

## 3. Consultas (`prepare`)

Para todo lo demás, usa `prepare`. Es más seguro y rápido.

### Obtener TODOS (`all`)

```typescript
const rows = db.prepare("SELECT * FROM jobs").all()
```

### Obtener UNO (`get`)

```typescript
const row = db.prepare("SELECT * FROM jobs WHERE id = ?").get("1")
```

## 4. Mutaciones (`run`)

Para `INSERT`, `UPDATE` y `DELETE`. Devuelve info del cambio (`changes`).

```typescript
const result = db.prepare("INSERT INTO jobs (title) VALUES (?)").run("Dev")
console.log(result.changes) // 1 si funcionó
```

## 5. Seguridad: SQL Injection

**NUNCA** uses variables directamente en el string: `` `... WHERE id = ${id}` `` ❌.
**SIEMPRE** usa `?`: `... WHERE id = ?` ✅.

## 6. Cerrar

```typescript
db.close()
```
