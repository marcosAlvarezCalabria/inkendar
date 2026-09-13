# Plan de validación y lanzamiento

_Estado: fuente de verdad para la fase anterior al desarrollo y los estudios pioneros_

_Última actualización: 2026-09-02_

## Actualización de alcance

El producto se valida como servicio gestionado de **Inkendar**, implantado por **Incamdi**. La oferta inicial incluye chat web, Instagram, Facebook Messenger y conexión con Google Calendar. WhatsApp queda fuera del MVP. El orden y los gates actuales prevalecen en [Especificación de Inkendar](sellable-mvp-spec.md); las referencias posteriores a la promesa original de tres canales con WhatsApp quedan como contexto histórico.

## 1. Decisión

Antes de implementar el SaaS completo se validarán la viabilidad técnica de la promesa omnicanal, el problema, el mensaje comercial y la disposición a pagar. La validación no sustituye el MVP funcional: decide qué parte se construye primero y evita vender integraciones inviables o invertir en capacidades que ningún estudio priorice.

La secuencia aprobada es:

```text
piloto cero técnico del fundador → veredicto de canales
              → descubrimiento → landing independiente → intención cualificada
              → co-diseño → MVP web + workspace
              → piloto real → primera suscripción
              → producción de los canales que superaron el spike
```

El piloto cero se rige por [Plan del piloto cero](founder-pilot-zero-plan.md). Demuestra con cuentas propias si web, Instagram y WhatsApp Business pueden convivir en un mismo motor y conectarse al futuro panel. No sustituye las entrevistas: un `PASS` técnico no demuestra que otros estudios tengan el problema ni que paguen por resolverlo.

## 2. Separación de marcas

- Incandi permanece como agencia y canal de adquisición.
- El producto tendrá una landing y una identidad pública independientes.
- La landing no mezclará servicios generales de agencia con la propuesta del SaaS.
- Incandi puede aparecer discretamente como equipo desarrollador o proveedor de la web, pero no como mensaje principal.
- La agencia puede vender una web a un estudio e incluir el workspace como diferenciador.
- `Inkendar` es el nombre público elegido para la landing de validación. La comprobación de dominio y marca continúa pendiente antes de consolidarlo legalmente.
- La tecnología de las webs no cambia por esta decisión. Las webs React existentes pueden conectarse mediante el contrato de intake.

## 3. Qué se valida

### Problema

- solicitudes repartidas entre DMs, formularios, calendarios y papel;
- referencias difíciles de recuperar;
- briefs incompletos;
- señales y estados de cita controlados manualmente;
- dificultad para saber qué debe preparar cada artista hoy.

### Cliente inicial

El foco continúa en estudios de 2 a 6 artistas. Los artistas independientes pueden aportar evidencia y probar el mensaje, pero no obligarán a diseñar un segundo producto durante el MVP.

### Oferta

> Una web que consigue solicitudes y un workspace privado que las convierte en casos, asignaciones y citas organizadas.

### Precio

- 19 EUR/mes para artista individual puede probarse como mensaje comercial, sin comprometer un plan técnico separado.
- 49 EUR/mes es la hipótesis de precio fundador para un estudio pequeño durante la validación.
- 79–99 EUR/mes continúa como hipótesis de precio normal cuando se conozcan soporte, almacenamiento y costes de canales.
- No se cobra porcentaje sobre tatuajes o señales.
- Un clic en precios mide interés; solo una aceptación explícita del precio o un pago demuestra disposición a pagar.

## 4. Piloto cero técnico

Antes de contactar estudios se ejecuta el spike con cuentas propias y datos sintéticos. Su resultado es:

- `PASS`: los tres canales y la frontera con Inkendar funcionan; comienza el descubrimiento;
- `PARTIAL`: se puede investigar, pero el canal pendiente no se anuncia como disponible;
- `FAIL`: se reduce la promesa o se aprueba una alternativa antes de captar estudios.

La prueba debe confirmar especialmente que el número actual continúa funcionando en la aplicación WhatsApp Business cuando se conecta mediante el flujo oficial de Coexistence. Un número de prueba de Meta no satisface este criterio.

## 5. Validación de siete días

### Días 1–3 — Descubrimiento

Objetivo:

- contactar de forma personalizada con 15 tatuadores o responsables;
- conseguir al menos 3 conversaciones breves;
- observar el proceso actual antes de enseñar una solución.

Preguntas base:

1. ¿Por dónde entran normalmente las solicitudes?
2. Enséñame qué haces desde que recibes una referencia hasta que confirmas la cita.
3. ¿Dónde guardas zona, tamaño, imágenes, presupuesto y señal?
4. ¿Qué ocurre cuando el cliente responde por otro canal?
5. ¿Qué parte te hace perder más tiempo cada semana?
6. ¿Cuándo fue la última vez que no encontraste una referencia o una conversación?
7. ¿Qué herramienta has probado y por qué la dejaste?

No se mencionan Supabase, Chatwoot ni arquitectura. Tampoco se pregunta “¿usarías mi aplicación?”; se buscan hechos recientes y ejemplos concretos.

### Día 4 — Mercado alcanzable

- elegir una ciudad, región o país inicial;
- crear una lista de 100–200 estudios o artistas alcanzables;
- registrar tamaño, web, canal de reserva, Instagram, WhatsApp público y problema visible;
- priorizar estudios multiartista con “reservas por DM”, formularios débiles o procesos repartidos.

La cifra no demuestra demanda; únicamente comprueba que existe un canal de adquisición suficiente para continuar probando.

### Días 5–6 — Landing independiente

La landing incluye:

- propuesta de valor dedicada exclusivamente a tatuadores;
- problema: solicitudes, referencias y señales dispersas;
- flujo visual mensaje/formulario → caso → artista → cita;
- mockups claramente presentados como vista previa si aún no son producto funcional;
- explicación de web + workspace;
- planes de precio usados como hipótesis;
- CTA “Solicitar acceso a la beta”;
- formulario con nombre, estudio, ciudad, número de artistas, web/Instagram, canales actuales y plan de interés;
- aviso claro de que la beta está en selección y aún no es autoservicio.

La landing debe estar separada de Incandi. No se fija Astro como requisito: se puede reutilizar el stack React existente o cualquier implementación rápida que permita medir correctamente.

### Día 7 — Decisión

Se revisa la evidencia y se elige uno de estos resultados:

1. **Continuar:** el problema se repite y existe al menos un estudio cualificado dispuesto a pilotar y pagar el precio fundador si el flujo funciona.
2. **Ajustar:** existe dolor, pero el canal, la oferta o el precio no generan intención suficiente.
3. **Detener:** las conversaciones no confirman el problema o ningún estudio acepta probarlo después de entender la propuesta.

Un 10% de clics puede ser una señal direccional, pero no ofrece “certeza absoluta”. Se analizarán visitas únicas cualificadas, solicitudes de beta, demos aceptadas y compromiso de piloto.

## 6. Programa de estudios pioneros

Se seleccionan como máximo diez estudios pioneros. “Estudio pionero” o “design partner” no implica sociedad mercantil, participación ni propiedad del producto.

### Fase A — Co-diseño

- conversación de 15–30 minutos;
- mapa del proceso actual;
- revisión de un prototipo del flujo principal;
- selección de los problemas que entran en el MVP;
- ninguna obligación de pago durante esta fase.

### Fase B — Beta privada funcional

- alta manual del estudio y sus artistas;
- integración de su web con el formulario;
- casos, clientes, referencias, asignación, agenda, señal manual y “Hoy”;
- uso con solicitudes reales y soporte directo;
- registro de fallos, bloqueos y trabajo manual evitado.

No se promete Instagram o WhatsApp dentro de una fecha fija. Solo se incorporan a la beta después del spike de Chatwoot/Meta y si la evidencia los sitúa por delante de otras necesidades.

### Fase C — Estabilización y pago

- corrección de defectos que bloquean el uso;
- revisión de métricas y feedback;
- confirmación del alcance contratado;
- comienzo de la suscripción si el estudio decide continuar.

## 7. Oferta para pioneros

Se puede ofrecer:

- uso gratuito durante un periodo de beta definido por escrito;
- onboarding realizado personalmente;
- contacto directo durante el piloto;
- precio fundador mientras mantengan una suscripción continua y permanezcan dentro de los límites acordados;
- posibilidad de exportar sus datos y abandonar el piloto.

No se ofrecerá:

- desarrollo ilimitado a medida;
- soporte “al instante” las 24 horas;
- descuento superior al 50% de por vida sin límites;
- funciones de Meta antes de comprobar elegibilidad y revisión;
- promesa de lanzamiento en 2–4 semanas antes de estimar el backlog validado;
- tratamiento del estudio como “socio fundador” con implicaciones legales.

## 8. Mensaje de aproximación

```text
Hola, estoy investigando cómo los estudios organizan las solicitudes que llegan
por la web y los mensajes. No intento venderte una aplicación terminada.

Estoy hablando con unos pocos estudios para entender el recorrido real desde
que un cliente envía una referencia hasta que se confirma la cita.

¿Podrías enseñarme durante 15 minutos cómo lo hacéis ahora? Si el problema
encaja, podréis probar primero la herramienta y decidir qué parte merece
construirse.
```

Después de confirmar el problema se enseña la landing o el prototipo. No se empieza con una demostración que pueda condicionar todas las respuestas.

## 9. Evidencia que debe conservarse

Por cada conversación:

- rol y tipo de estudio;
- proceso actual;
- ejemplo reciente del problema;
- herramientas usadas;
- impacto en tiempo, dinero o cliente;
- prioridad declarada;
- reacción al prototipo;
- plan y precio elegido;
- aceptación o rechazo del piloto y motivo.

No se almacenan conversaciones privadas, datos de clientes del estudio ni capturas con información personal sin autorización.

## 10. Gate para empezar a implementar

El desarrollo del MVP comienza cuando se cumplen estas condiciones:

- el piloto cero termina en `PASS`, o el alcance comercial se corrige explícitamente tras un resultado `PARTIAL/FAIL`;
- al menos 3 conversaciones de descubrimiento completadas;
- el mismo problema operativo aparece de manera espontánea en más de un estudio;
- al menos un estudio acepta ser piloto con solicitudes reales;
- ese estudio entiende el precio fundador y acepta considerarlo si el flujo funciona;
- el primer slice está limitado a web + workspace y no depende de Meta;
- la especificación se actualiza con cualquier hallazgo que cambie campos, estados o flujo.

Si el gate no se cumple, se modifica mensaje, segmento o problema antes de construir infraestructura adicional.

## 11. Métrica de éxito del lanzamiento inicial

La validación termina con éxito cuando un estudio:

1. conecta una web real;
2. recibe solicitudes reales;
3. las revisa y convierte en casos/citas desde el workspace;
4. utiliza el producto de manera repetida;
5. decide continuar con una suscripción pagada.

Registros, clics o elogios sin uso y pago son señales intermedias, no la validación final.
