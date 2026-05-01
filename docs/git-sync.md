# Guía de Sincronización de Repositorios (Git Sync)

Esta guía explica cómo mantener este proyecto actualizado y cómo configurar proyectos futuros usando la técnica de **Fork + Upstream**.

---

## 1. En este proyecto (Situación Actual)
Ya tienes configurado tu repositorio con los dos mandos: **origin** (tu Fork) y **upstream** (el original de Midudev).

### Para traer actualizaciones de Midudev (Merge)
Cada vez que Midudev suba cambios y quieras traerlos **sin borrar lo tuyo**:
```powershell
# 1. Trae la información del original
git fetch upstream

# 2. Mezcla sus cambios con los tuyos (estando en la rama main)
git merge upstream/main

# 3. Sube el resultado a tu GitHub personal
git push origin main
```

### Para borrarlo todo y dejarlo igual que el original (Reset)
Si te da igual perder tus cambios y solo quieres sincronizar:
```powershell
git fetch upstream
git reset --hard upstream/main
git push origin main --force
```

---

## 2. En el Futuro (Desde Cero)
Si empiezas un proyecto nuevo de otra persona y quieres seguir este flujo, estos son los pasos universales:

### Paso 1: El Fork (En la Web)
Ve al repositorio original en GitHub y pulsa el botón **Fork**. Esto crea una copia en tu cuenta.

### Paso 2: El Clone (Local)
Copia la URL de **TU** fork y clónalo en tu PC:
```powershell
git clone https://github.com/TU_USUARIO/nombre-del-repo.git
cd nombre-del-repo
```

### Paso 3: Configurar el Vínculo Original (Upstream)
Añade la dirección del repositorio de la otra persona como "fuente original":
```powershell
# Usamos el nombre 'upstream' por convención profesional
git remote add upstream https://github.com/AUTOR_ORIGINAL/nombre-del-repo.git
```

### Paso 4: Trabajar con normalidad
*   **Guardar tus cambios:** `git push origin main`
*   **Sincronizar con el autor:** `git fetch upstream` -> `git merge upstream/main`

---

## Glosario Rápido
*   **`origin`**: Tu copia en GitHub. Donde tienes permisos para guardar (`push`).
*   **`upstream`**: El repositorio del autor original. De donde bebes las actualizaciones (`fetch`).
*   **`Fork`**: Copia digital de un proyecto ajeno a tu cuenta personal.
