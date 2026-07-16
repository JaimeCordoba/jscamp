---
name: commit
description: Generar un mensaje de commit descriptivo y formateado en español a partir de los cambios realizados.
---

# Commit Message Generation Skill

## Process

1. Analyze the changes made to the project since the last commit (avoiding repeating changes already committed previously).
2. Identify the purpose of the changes and select the appropriate type:
    - ✨ **feat**: Nueva funcionalidad
    - 🐛 **fix**: Corrección de errores
    - ♻️ **refactor**: Refactor sin cambiar funcionalidad
    - 🎨 **style**: Cambios de formato/estilos (no lógica)
    - 📝 **docs**: Actualizar README o documentación
    - ⚡ **perf**: Mejora de rendimiento
    - 🧪 **test**: Añadir tests
    - 🏗️ **build**: Cambios en build, dependencias, tooling
    - 🤖 **ci**: Configuración de CI/CD
    - ⬆️ **update**: Actualizaciones (dependencias, contenido, etc.)
3. Write the commit message following the format: `emoji tipo: descripción` (e.g., `✨ feat: añadir formulario de contacto`).
4. The description must be written in **Spanish**.
5. Present the final result in a code block marked as `text`.
