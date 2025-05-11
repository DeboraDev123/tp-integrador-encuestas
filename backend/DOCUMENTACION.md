# Documentación de la API - Sistema de Encuestas Anónimas

## Descripción General

Este sistema permite crear, responder y visualizar encuestas anónimas, cumpliendo con los requisitos del Trabajo Final Integrador. La API está desarrollada en NestJS, utiliza TypeORM y PostgreSQL.

---

## Endpoints Principales

### 1. Crear una encuesta

- **Metodo:**  `POST`
- **Ruta:** ` http://localhost:3000/api/v1/encuestas`
- **Body:**
```json
{
  "nombre": "Encuesta de Satisfacción",
  "preguntas": [
    {
      "numero": 1,
      "texto": "¿Cómo calificarías nuestro servicio?",
      "tipo": "OPCION_MULTIPLE_SELECCION_SIMPLE", // o "OPCION_MULTIPLE_SELECCION_MULTIPLE" o "ABIERTA"
      "opciones": [
        { "texto": "Excelente", "numero": 1 },
        { "texto": "Bueno", "numero": 2 }
      ]
    },
    {
      "numero": 2,
      "texto": "¿Qué mejorarías?",
      "tipo": "ABIERTA"
    }
  ]
}
```
- **Tipos de pregunta posibles:**
  - `"ABIERTA"`: El usuario responde con texto libre.
  - `"OPCION_MULTIPLE_SELECCION_SIMPLE"`: El usuario puede elegir **una sola** opción.
  - `"OPCION_MULTIPLE_SELECCION_MULTIPLE"`: El usuario puede elegir **varias** opciones.
- **Notas:**
  - Si el tipo es `"ABIERTA"`, el campo `"opciones"` puede omitirse.
  - Si el tipo es de opción múltiple, el campo `"opciones"` es obligatorio y debe tener al menos dos opciones.
- **Respuesta:**
```json
{
  "id": 1,
  "codigoRespuesta": "uuid-para-responder",
  "codigoResultados": "uuid-para-resultados"
}
```
- `codigoRespuesta`: Enlace para responder la encuesta (compartir con los participantes)
- `codigoResultados`: Enlace para visualizar las respuestas (solo para el creador)

---

### 2. Obtener encuesta para responder o ver resultados
- **Metodo:**  `GET`
- **Ruta:** ` http://localhost:3000/api/v1/encuestas/:id?codigo=...&tipo=...`
- **Respuesta:**
  - Objeto encuesta con preguntas y opciones.

---

### 3. Obtener solo preguntas para responder
- **Metodo:**  `GET`
- **Ruta:** ` http://localhost:3000/api/v1/encuestas/:id/participar?codigo=...`
- **Respuesta:**
  - Objeto encuesta con preguntas y opciones.

---

### 4. Eliminar encuesta
- **Metodo:**  `DELETE`
- **Ruta:** ` http://localhost:3000/api/v1/encuestas/eliminar/:id`

---

### 5. Responder encuesta
- **Metodo:**  `POST`
- **Ruta:** ` http://localhost:3000/api/v1/respuestas`
- **Body:**
```json
{
  "idEncuesta": 1,
  "respuestas": [
    { "idPregunta": 1, "idOpciones": [1] },
    { "idPregunta": 2, "texto": "Mejorar la atención" }
  ]
}
```

---

## Notas importantes
- El sistema es **anónimo**: no requiere login.
- Si se pierde el enlace de resultados, **no se puede recuperar**.
- Los enlaces se generan automáticamente al crear la encuesta.
- Las preguntas pueden ser abiertas o de opción múltiple (simple o múltiple).

---

## Ejemplo de uso en Postman

1. **Crear encuesta:**
   - Método: POST
   - URL: `http://localhost:3000/api/v1/encuestas`
   - Body: (ver ejemplo arriba)

2. **Obtener encuesta para responder:**
   - Método: GET
   - URL: `http://localhost:3000/api/v1/encuestas/1?codigo=uuid-para-responder&tipo=RESPUESTA`

3. **Obtener encuesta para ver resultados:**
   - Método: GET
   - URL: `http://localhost:3000/api/v1/encuestas/1?codigo=uuid-para-resultados&tipo=RESULTADOS`

4. **Eliminar encuesta:**
   - Método: DELETE
   - URL: `http://localhost:3000/api/v1/encuestas/eliminar/1`

5. **Responder encuesta:**
   - Método: POST
   - URL: `http://localhost:3000/api/v1/respuestas`
   - Body: (ver ejemplo arriba)

---

## Tecnologías utilizadas
- NestJS
- TypeORM
- PostgreSQL
- Swagger 

---

## Funcionalidades adicionales

Cada integrante debe documentar aca la funcionalidad extra que agregó al sistema. Utilizar el siguiente formato:

### Funcionalidad adicional: [Nombre de la funcionalidad]
- **Descripción:** Explica brevemente qué hace.
- **Endpoint (si aplica):** Indica la ruta y método.
- **Ejemplo de uso:** Muestra cómo se usa (puede ser un ejemplo de body, respuesta, etc).

---

## Autoría y créditos
Trabajo realizado por el grupo K para la materia Desarrollo de Aplicaciones Web - 2025, Tecnicatura Universitaria en Desarrollo Web. 