# Plan del piloto cero de canales

_Estado: resultado parcial registrado; el alcance vigente se rige por `sellable-mvp-spec.md`_

_Última actualización: 2026-09-02_

## Resultado vigente

- Web: `PASS`.
- Instagram: `PASS`.
- Facebook Messenger: conectado, pendiente de prueba bidireccional final.
- Asignación: manual validada; automática pendiente.
- WhatsApp: `DEFERRED` y retirado del MVP.

El plan original de WhatsApp se conserva debajo como evidencia histórica del spike. Ya no constituye un gate para comenzar el MVP gestionado. Google Calendar pasa a ser el siguiente spike técnico.

## 1. Decisión

El fundador será el **piloto cero**. Antes de presentar a otros estudios la conexión de web, Instagram y WhatsApp Business, se comprobará con cuentas propias que los tres canales pueden recibirse y responderse desde un mismo motor de conversaciones y que ese motor puede integrarse con el futuro panel de Inkendar.

Esta prueba valida viabilidad técnica, restricciones, operación y coste. No valida demanda, usabilidad para un estudio multiartista ni disposición a pagar; después de un resultado `PASS` continúa el descubrimiento externo definido en [Plan de validación y lanzamiento](validation-and-launch-plan.md).

La primera opción del spike es **Chatwoot Cloud durante su periodo de prueba**, con datos sintéticos. Chatwoot actuará únicamente como motor temporal de conversaciones. Supabase seguirá siendo la fuente de verdad prevista para casos, clientes, citas, señales y permisos cuando comience el producto.

## 2. Pregunta que debe responder

> ¿Puede una persona recibir una solicitud de la web, un DM de Instagram y un mensaje enviado al número actual de WhatsApp Business, verlos en una sola bandeja, responder por su canal original y trasladar el contexto a una ficha de Inkendar sin perder el uso normal de WhatsApp Business?

La parte “número actual + aplicación WhatsApp Business + Cloud API” se considera un requisito crítico de Coexistence. No se dará por viable a partir de documentación o una demo con el número de prueba de Meta: debe comprobarse con la cuenta propia elegible.

## 3. Alcance y límites

Incluye:

- un formulario web real o de staging conectado como inbox/API;
- una cuenta profesional de Instagram propia y otra cuenta para enviar mensajes de prueba;
- un número propio de WhatsApp Business y otro número para enviar mensajes de prueba;
- texto e imagen entrantes;
- respuesta desde la bandeja y, en el último slice, desde una llamada API controlada por Inkendar;
- estados de envío que el proveedor comunique realmente;
- webhooks de Chatwoot para conversaciones, mensajes y contactos;
- medición de esfuerzo, bloqueos, coste y requisitos para pasar de pruebas a producción.

No incluye:

- datos ni conversaciones de clientes reales;
- agenda, señales, pagos, consentimiento, automatizaciones o IA;
- multi-tenancy de producción;
- construir a la vez integraciones directas de Meta;
- solicitar acceso de producción para estudios externos antes del veredicto.

## 4. Requisitos previos

Antes de iniciar el reloj del spike se confirma, sin guardar credenciales en el repositorio:

- acceso de administrador al portfolio empresarial de Meta;
- una aplicación de Meta para desarrollo;
- Instagram configurado como cuenta profesional;
- WhatsApp Business activo en el número que se desea conservar;
- segundo usuario de Instagram y segundo teléfono para pruebas externas;
- dominio HTTPS y páginas públicas de privacidad y condiciones para los flujos que las exijan;
- cuenta de prueba de Chatwoot y una dirección HTTPS para recibir webhooks;
- inventario privado de IDs y propietarios de los activos; los tokens permanecen en un gestor de secretos.

Si falta un requisito, el resultado es `BLOCKED` con el requisito exacto; no se sustituye silenciosamente por una integración no equivalente.

## 5. Plan incremental

### Slice 0 — Preparación y línea base

Duración objetivo: medio día.

1. Inventariar cuentas, roles, número y dominio sin copiar secretos al repositorio.
2. Confirmar que Instagram es profesional y que el número está actualmente en WhatsApp Business.
3. Abrir el trial de Chatwoot y registrar región de datos, plan necesario y fecha de finalización.
4. Crear una tabla de evidencia con prueba, hora, canal, resultado, captura sin datos personales y bloqueo.

Salida: entorno de prueba preparado o lista cerrada de prerrequisitos ausentes.

### Slice 1 — Web

Duración objetivo: medio día a un día.

1. Crear un inbox de sitio/API en Chatwoot.
2. Enviar nombre de prueba, contacto ficticio, descripción, zona, tamaño, artista y una imagen.
3. Confirmar que una repetición con el mismo identificador no crea dos solicitudes.
4. Confirmar recepción y respuesta sin mostrar un éxito falso si falla el envío.

Salida: solicitud web visible con origen y campos recuperables.

### Slice 2 — Instagram

Duración objetivo: un día, sin contar esperas externas.

1. Conectar la cuenta profesional mediante Instagram Business Login.
2. Enviar desde una cuenta externa un DM con texto y una imagen; el cliente debe iniciar la conversación.
3. Responder desde Chatwoot y comprobar recepción en Instagram.
4. Registrar qué estados, adjuntos y carpetas no coinciden con la aplicación nativa.
5. Separar el acceso de prueba mediante roles de Meta del acceso de producción, que puede requerir App Review y permisos avanzados.

Salida: conversación bidireccional demostrada y requisitos de producción documentados.

### Slice 3 — WhatsApp Business Coexistence

Duración objetivo: uno a tres días, sin contar revisión o elegibilidad externa.

1. Intentar el onboarding oficial de WhatsApp Cloud mediante Embedded Signup/Chatwoot con el número que ya usa WhatsApp Business.
2. Rechazar cualquier flujo que migre o desconecte el número sin una advertencia y un rollback comprobado.
3. Enviar texto e imagen desde otro teléfono y responder desde la bandeja.
4. Confirmar que la aplicación WhatsApp Business continúa enviando y recibiendo.
5. Confirmar si los mensajes enviados desde la aplicación aparecen como echoes en la bandeja.
6. Comprobar estados `sent`, `delivered`, `read` y `failed` solo cuando lleguen del proveedor.
7. Registrar ventanas de atención, plantillas necesarias, cargos de Meta y limitaciones de sincronización de historial.

Salida: Coexistence real demostrada o un `FAIL/BLOCKED` con la restricción exacta. Probar con el número gratuito de Meta no satisface este slice.

### Slice 4 — Frontera Chatwoot ↔ Inkendar

Duración objetivo: uno a dos días.

1. Suscribir un endpoint de prueba a `conversation_created`, `message_created`, `message_updated`, `contact_created` y `contact_updated`.
2. Normalizar cada evento a un contrato mínimo con `provider`, `external_conversation_id`, `external_message_id`, `direction`, `sender`, `occurred_at`, `text`, `attachments` y estado.
3. Demostrar idempotencia repitiendo el mismo webhook.
4. Enviar una respuesta mediante la API de Chatwoot desde una prueba controlada por Inkendar.
5. Confirmar que un fallo queda visible y no se representa como entrega correcta.

Salida: evidencia de que Inkendar puede usar Chatwoot como adaptador sin convertirlo en fuente de verdad del dominio.

### Slice 5 — Recorrido completo y decisión

Duración objetivo: un día.

1. Recibir una entrada por cada canal.
2. Ver los tres orígenes en una sola bandeja.
3. Responder a Instagram y WhatsApp desde la misma interfaz.
4. Asociar manualmente una conversación a una ficha de prueba sin duplicarla.
5. Repetir con caída de red, webhook duplicado, adjunto no compatible y respuesta fuera de ventana.
6. Completar la matriz de decisión y conservar costes observados.

## 6. Criterios de aceptación

### Entrada omnicanal

```gherkin
Given que web, Instagram y WhatsApp están conectados con identidades de prueba
When llega una entrada con texto desde cada canal
Then las tres aparecen en una única bandeja con su origen correcto
And ninguna se convierte automáticamente en cita
```

### Adjuntos y respuesta

```gherkin
Given una conversación iniciada por un usuario externo en Instagram o WhatsApp
When envía una imagen y se responde desde el panel
Then el texto y la imagen se conservan en la conversación correcta
And la respuesta llega por el canal original
And el panel solo muestra estados confirmados por el proveedor
```

### Coexistence

```gherkin
Given un número activo en la aplicación WhatsApp Business
When se conecta mediante el flujo oficial de Coexistence
Then el mismo número recibe y envía desde la aplicación y desde Cloud API
And no se pierde el historial existente aceptado por el flujo
```

### Idempotencia

```gherkin
Given un webhook ya procesado
When Chatwoot lo entrega de nuevo
Then Inkendar conserva un solo mensaje por proveedor e identificador externo
And responde con éxito sin duplicar efectos
```

## 7. Veredicto

### `PASS`

Se cumplen todos estos puntos:

- web, Instagram y el número actual de WhatsApp Business llegan a una sola bandeja;
- Instagram y WhatsApp permiten responder y recibir al menos texto e imagen;
- WhatsApp Business sigue funcionando en el teléfono después de conectar Cloud API;
- los webhooks y la API de Chatwoot permiten integrar el recorrido sin duplicados ni falsos estados;
- se conocen requisitos de producción, residencia de datos, coste por agente, costes de Meta y trabajo operativo;
- no existe un bloqueo legal, de privacidad o de revisión que invalide ofrecerlo a pequeños estudios.

Con `PASS`, se continúa con entrevistas externas y se presenta la capacidad como “validada técnicamente; activación sujeta a elegibilidad del canal”.

### `PARTIAL`

Web e Instagram funcionan, pero WhatsApp Coexistence está pendiente de elegibilidad, revisión o una prueba equivalente. Se puede continuar descubrimiento, pero la landing y la oferta no presentan WhatsApp como disponible; se marca como acceso condicionado.

### `FAIL`

Un canal crítico no puede conservar la experiencia prometida, la integración exige una operación desproporcionada o el coste/privacidad no encaja. Antes de contactar estudios se elige explícitamente entre:

1. reducir la promesa comercial;
2. probar Chatwoot self-hosted en región adecuada;
3. crear un adaptador directo únicamente para el canal que falló;
4. exigir un número nuevo para WhatsApp y comunicar la limitación sin llamarla Coexistence.

No se construyen Chatwoot y adaptadores directos en paralelo.

## 8. Coste y privacidad que deben confirmarse

Datos consultados el 2026-08-31:

- Chatwoot ofrece un trial de 15 días; su plan Cloud Startups anuncia todos los canales por 19 USD por agente/mes con facturación anual.
- Chatwoot Cloud declara alojamiento en AWS Estados Unidos; antes de conversaciones reales debe resolverse la base legal, el acuerdo de tratamiento y la residencia aceptable.
- Chatwoot Community Edition no tiene coste de licencia por agente, pero añade infraestructura, actualizaciones, correo, backups y operación.
- Meta cobra determinados mensajes de WhatsApp según categoría, país y reglas vigentes; el spike registra el coste observado y no fija una cifra permanente en el producto.

Durante el piloto cero solo se usan personas y datos ficticios. Los tokens no se registran en Git, capturas ni logs; se rotan al cerrar el spike si fueron temporales.

## 9. Evidencia mínima del cierre

- matriz `PASS/PARTIAL/FAIL` por canal;
- vídeo o capturas redactadas del recorrido completo;
- lista de permisos y revisiones necesarias para producción;
- resultado específico de Coexistence con el número actual;
- muestra de webhook y contrato normalizado sin tokens ni datos personales;
- coste mensual estimado para 1, 5 y 10 estudios;
- decisión: Chatwoot Cloud, Chatwoot self-hosted, adaptador directo limitado o reducción de alcance.

## 10. Fuentes técnicas

- [Instagram API oficial de Meta](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api)
- [WhatsApp Business Platform oficial de Meta](https://www.postman.com/meta/whatsapp-business-platform/overview)
- [Webhooks de WhatsApp Cloud API](https://www.postman.com/meta/whatsapp-business-platform/folder/lboq68h/webhooks)
- [Instagram Business Login en Chatwoot](https://developers.chatwoot.com/self-hosted/configuration/features/integrations/instagram-via-instagram-business-login/)
- [WhatsApp Embedded Signup en Chatwoot](https://developers.chatwoot.com/self-hosted/configuration/features/integrations/whatsapp-embedded-signup)
- [Webhooks de Chatwoot](https://developers.chatwoot.com/api-reference/webhooks/add-a-webhook)
- [Funciones soportadas por canal en Chatwoot](https://developers.chatwoot.com/self-hosted/supported-features)
- [Precios Cloud de Chatwoot](https://www.chatwoot.com/pricing)
- [Precios self-hosted de Chatwoot](https://www.chatwoot.com/pricing/self-hosted-plans)
