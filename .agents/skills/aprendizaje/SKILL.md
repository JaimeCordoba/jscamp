---
name: aprendizaje_skill
description: Instrucciones para añadir notas de aprendizaje al proyecto cuando el usuario lo pida.
---

# Gestión de Notas de Aprendizaje (Learning Notes)

Cada vez que el usuario te indique que añadas una nota de aprendizaje, debes automatizar la creación del archivo siguiendo **estrictamente** estas reglas:

## 1. Ubicación y Nomenclatura del Archivo

- **Ruta:** El archivo debe crearse en el directorio `c:\Proyectos\rpr\docs\01_aprendizaje`
- **Nombre:** El formato debe ser `XX_aprendizaje_descripcion_problema.md`
  - `XX` son números secuenciales de dos dígitos con un guion bajo (ej. `01`, `02`, `03`...). Antes de crear el archivo, **debes listar los archivos** de ese directorio para saber cuál es el próximo número que toca.
  - `descripcion_problema` debe ser un nombre corto en kebab-case o snake-case que resuma de qué trata.

## 2. Título (H1)

El H1 principal del archivo markdown debe estar en **español** y describir **muy brevemente** el problema que resuelve el contenido de la nota.

## 3. Estructura Obligatoria del Contenido

El cuerpo de la nota debe comenzar con una breve introducción, seguida exactamente por las siguientes 4 secciones (puedes usar H2 `##`):

- **Introducción**: Párrafo muy corto, justo debajo del título principal, que permita al lector identificar el problema y el contexto general que se va a tratar.

1. **El problema**: Descripción del desafío técnico, error o necesidad original.
2. **La solución seleccionada**: Cuál fue la resolución final implementada, adjuntando código si es pertinente para entenderlo.
3. **Soluciones alternativas descartadas y por qué**: Qué otros enfoques probamos o se consideraron y las razones exactas (rendimiento, limitación de plataforma, etc.) por las que no se implementaron.
4. **Fecha**: La fecha del día en que se registra el aprendizaje.

---

## Plantilla

```markdown
# Toma de decisión para ... (breve resumen)

[Introducción muy corta que permita al lector identificar de inmediato el problema de contexto que vamos a tratar]

## 1. El problema

...

## 2. La solución seleccionada

...

## 3. Soluciones alternativas descartadas y por qué

...

## 4. Fecha

[Fecha Actual, ej: 07/04/2026]
```
