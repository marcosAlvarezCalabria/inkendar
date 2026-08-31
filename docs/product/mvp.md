# MVP del panel para estudios de tatuaje

_Última actualización: 2026-08-30_

_Este documento conserva el detalle funcional descubierto. La fuente de verdad para el alcance comercial actual y las fases es [Especificación del MVP vendible](sellable-mvp-spec.md)._

## Propuesta de producto

El producto final es un SaaS multi-tenant que conecta web, Instagram y WhatsApp Business con un workspace privado. El MVP vendible empieza con web y captura presencial; Instagram y WhatsApp llegan en la siguiente fase. Su unidad principal no es la cita ni el cliente, sino el **caso de tatuaje**: una ficha que reúne solicitud, artista, imágenes, citas y estado del trabajo.

Este alcance deriva de la [investigación de voz del usuario](../research/tattoo-artist-voice-of-customer.md). Los contratos detallados y prioridades están en [Requisitos del producto](requirements.md).

La diferencia defendible no será añadir un calendario genérico. El mercado ya ofrece booking, depósitos, consentimientos, perfiles e imágenes. La oportunidad es entregar una experiencia white-label centrada en el trabajo real del artista:

- entrada integrada en la web propia del estudio, sin enviar al cliente a un marketplace;
- mensajes de Instagram y WhatsApp Business recibidos y respondidos desde el mismo dashboard;
- captura presencial asistida desde el mismo panel cuando el cliente ya está en el estudio;
- inbox omnicanal que conserva la conversación y el brief visual;
- ficha visual por tatuaje, no una nota perdida dentro del perfil del cliente;
- vista "Hoy" con el material que el artista necesita preparar;
- evolución posterior hacia un espacio del cliente mediante enlace seguro, sin obligarlo a crear una cuenta.

## Glosario

- **Solicitud:** información inicial recibida desde la web o capturada presencialmente. Todavía no reserva tiempo en agenda.
- **Caso de tatuaje:** expediente de trabajo que nace de una solicitud y acumula todo su contexto.
- **Cita:** bloque de agenda tentativo o confirmado asociado a un caso y a un artista.
- **Conversación:** hilo procedente de la web, Instagram, WhatsApp Business o el estudio; puede estar pendiente de clasificar o vinculado a un caso.
- **Mensaje:** entrada o respuesta dentro de una conversación; una nota interna no se envía al cliente.
- **Recurso:** imagen o documento privado asociado a una conversación o a un caso.
- **Origen de entrada:** canal que inició el caso: `website`, `instagram`, `whatsapp` o `in_studio`.
- **Señal:** compromiso económico asociado a una cita; registrar su estado no implica procesar el pago dentro de la plataforma.

## Alcance funcional por fases

El MVP vendible comprende web, captura presencial, casos, clientes, recursos, agenda, señales manuales y “Hoy”. Las subsecciones de Instagram y WhatsApp describen la siguiente fase conectada y no bloquean la primera venta.

### 1. Estudios, usuarios y roles

- Un estudio puede tener uno o varios usuarios.
- Roles iniciales: `owner`, `manager` y `artist`.
- Owner y manager ven todo el estudio; artist ve sus casos y citas, además de elementos compartidos explícitamente.
- Existe un rol de operador de plataforma separado para dar de alta estudios y diagnosticar integraciones sin acceder por defecto al contenido privado.

### 2. Canales de entrada

En el MVP, web y captura presencial crean directamente la misma clase de caso. En la fase conectada, Instagram y WhatsApp crean primero una conversación pendiente que el equipo puede asociar a un caso existente o convertir en uno nuevo. Ningún canal confirma automáticamente una cita.

#### Formulario público de la web

El formulario actual contiene cinco datos, aunque se describiera como cuatro:

1. nombre;
2. idea o descripción del tatuaje;
3. zona del cuerpo;
4. artista preferido;
5. tamaño aproximado.

Para que el estudio pueda responder, el contrato mínimo debe añadir:

- un canal de contacto: correo o teléfono;
- tamaño con ayuda comprensible, no únicamente una categoría ambigua;
- aceptación de la política de privacidad;
- imágenes de referencia opcionales;
- identificador público de la integración del estudio.

Según el caso, el formulario puede preguntar estilo/color, cover-up o rework, fotografía actual, presupuesto orientativo y disponibilidad. Debe usar campos condicionales para no sobrecargar todas las solicitudes.

El formulario envía la solicitud a un endpoint común. El endpoint valida, limita abuso y crea el caso, el primer mensaje y los recursos; la web nunca recibe credenciales administrativas. El cliente recibe confirmación de recepción y próximos pasos sin necesidad de crear una cuenta.

#### Captura asistida dentro del estudio

- Owner, manager o artist autenticado puede iniciar una solicitud desde una acción visible de "Nuevo caso".
- La interfaz se optimiza para móvil y tablet, con controles táctiles y el mínimo de navegación mientras se habla con el cliente.
- El estudio se deriva de la membresía de la persona autenticada; nunca se acepta un `studio_id` elegido libremente por el navegador.
- Se puede localizar un cliente existente por nombre, teléfono o correo antes de crear uno nuevo, para reducir duplicados.
- El cliente no necesita una cuenta. El miembro del estudio registra el brief y puede adjuntar referencias o tomar una foto desde el dispositivo.
- La aceptación de privacidad se registra también en este canal, indicando que fue confirmada en presencia del cliente.
- La captura conserva el origen `in_studio` y quién la creó para auditoría.
- Registrar el caso no confirma automáticamente una cita. La aprobación y la ocupación de agenda siguen siendo acciones explícitas.
- El artista o responsable fija manualmente la viabilidad y el presupuesto; el sistema no inventa precios ni acepta trabajos automáticamente.

La entrada presencial usa una operación autenticada distinta del endpoint público, pero ambas delegan en el mismo caso de uso para evitar reglas divergentes.

#### Instagram

- Owner conecta una cuenta profesional mediante el flujo oficial de autorización de Meta.
- Los mensajes nuevos llegan por webhook a la bandeja del estudio con texto, remitente, fecha y recursos compatibles.
- Los eventos repetidos no duplican conversaciones ni mensajes.
- La conversación aparece inicialmente como pendiente de clasificar.
- El equipo puede buscar un cliente existente y vincular la conversación a su caso, o convertirla en un caso nuevo con origen instagram.
- Las imágenes compatibles se muestran dentro de la conversación y acompañan al caso cuando se vincula.
- Owner, manager o el artista autorizado pueden responder desde el dashboard mientras Meta permita el envío.
- El panel muestra enviado, entregado, leído o error solo cuando el proveedor aporte ese estado; nunca supone que un mensaje salió correctamente.
- Si la ventana de respuesta ha vencido, el panel bloquea la falsa confirmación y ofrece continuar por otro canal disponible.
- Desconectar Instagram detiene la recepción futura sin borrar el historial que el estudio deba conservar.

Limitaciones conocidas de la API oficial:

- solo admite cuentas profesionales compatibles;
- el cliente de Instagram debe iniciar la conversación;
- la ventana ordinaria de respuesta es de 24 horas;
- las carpetas y el estado de lectura no coinciden completamente con la aplicación de Instagram;
- servir cuentas de estudios externos exige Advanced Access y revisión de la aplicación por Meta.

#### WhatsApp Business

- Owner conecta el número mediante Embedded Signup v4.
- Cuando sea elegible, Coexistence permite conservar el número y seguir utilizando la aplicación WhatsApp Business.
- Los mensajes individuales entrantes y las respuestas enviadas desde la aplicación se reflejan en el mismo hilo del dashboard.
- El estudio puede autorizar la sincronización inicial de contactos e historial reciente; el alta sigue funcionando si decide no compartir el historial.
- Los webhooks repetidos no duplican mensajes y cada número conectado resuelve el estudio correcto.
- La conversación queda pendiente de clasificar hasta que se vincula o convierte en un caso con origen whatsapp.
- Dentro de la ventana de atención se puede responder libremente desde el dashboard.
- Fuera de la ventana solo se ofrece una plantilla aprobada o continuar desde la aplicación WhatsApp Business.
- Los estados enviado, entregado, leído o error se actualizan únicamente desde webhooks de Meta.
- Desconectar el canal detiene la recepción futura sin borrar el historial sujeto a retención.

Limitaciones conocidas de WhatsApp:

- el P0 centraliza chats individuales, no grupos;
- algunos tipos de mensaje y funciones exclusivas de la aplicación no se sincronizan;
- la ventana de atención de Cloud API es de 24 horas;
- los mensajes enviados mediante Cloud API están sujetos a precios de Meta;
- Coexistence requiere elegibilidad, alta como Tech Provider o Solution Partner y revisión de la aplicación;
- la sincronización opcional del historial debe comenzar dentro del plazo operativo indicado por Meta durante el alta.

Instagram y WhatsApp Business forman parte de la fase “Estudio conectado”. No bloquean el primer piloto ni la primera venta del MVP web + workspace; se incorporan después de validar el núcleo y superar el spike técnico y comercial.

### 3. Inbox y bandeja de solicitudes

- filtros por canal, estado, artista, fecha, pendiente de clasificar y sin asignar;
- estados del caso: `new`, `needs_info`, `reviewing`, `approved`, `declined`, `in_progress`, `completed`, `archived`;
- asignación a artista;
- acciones para solicitar información, aprobar, rechazar y archivar;
- notas internas separadas de los mensajes visibles para el cliente;
- vista de imágenes sin abandonar el caso;
- conversión explícita de solicitud aprobada en cita.

### 4. Vista del artista

La página inicial del artista responde primero a "¿qué me toca hoy?":

- citas del día en orden;
- nombre del cliente, zona, tamaño y descripción corta;
- imágenes de referencia;
- avisos sobre información pendiente;
- acceso rápido al caso completo.

### 5. Agenda

- vistas día y semana;
- creación, edición y cancelación manual de citas;
- artista, inicio, fin, estado y caso vinculados;
- varias citas pueden pertenecer al mismo caso;
- estados de cita separados del caso: `tentative`, `awaiting_deposit`, `confirmed`, `completed`, `cancelled`, `no_show`;
- prevención de solapamientos para el mismo artista;
- las solicitudes personalizadas requieren aprobación antes de ocupar agenda.

### 6. Señales

- registrar si una cita requiere señal, importe, vencimiento y estado;
- estados: `not_required`, `pending`, `paid`, `applied`, `forfeited`, `refunded`;
- P0 permite registro manual y nunca almacena datos bancarios o de tarjeta;
- una cita con señal pendiente no se muestra como confirmada.

### 7. Recursos privados

- subida de imágenes desde el formulario y desde el panel;
- bucket privado y URLs temporales;
- límites configurables de tipo y tamaño;
- rutas aisladas por estudio y por conversación o caso;
- borrado lógico del caso y política de retención pendiente de definir.

### 8. Confianza operativa

- los formularios largos y la captura presencial conservan borradores;
- una caída de red o error de subida permite reintentar sin volver a escribir;
- no se confirma una operación hasta que los datos y archivos necesarios hayan quedado guardados;
- los errores indican qué ocurrió y cómo continuar;
- las correcciones sensibles conservan autor y fecha;
- el estudio puede exportar clientes, conversaciones, casos, citas y referencias de recursos.

## Fuera del primer slice

- procesamiento integrado de pagos; el estado manual de la señal sí forma parte del MVP;
- consentimiento legal y firma;
- sincronización bidireccional con Google Calendar;
- SMS;
- campañas masivas o automatizaciones de marketing por WhatsApp;
- generación o edición de diseños con IA;
- inventario, comisiones, POS y contabilidad;
- automatizaciones de curación y reseñas.

Estas capacidades pueden añadirse después, pero no deben retrasar la validación de la bandeja, el caso visual y la vista "Hoy".

## User stories y aceptación

### Recibir una solicitud

Como responsable de un estudio, quiero recibir en el panel las solicitudes de mi web para no depender de mensajes dispersos.

```gherkin
Given una integración activa para un estudio
When un cliente envía datos válidos desde la web
Then se crea un caso nuevo dentro de ese estudio
And la descripción se conserva como primer mensaje
And las imágenes válidas quedan asociadas al caso
And ningún usuario de otro estudio puede leerlo
```

### Recibir una consulta de Instagram

Como responsable de un estudio, quiero recibir y responder los mensajes de Instagram desde el dashboard para no perder el contexto al convertir una conversación en trabajo.

```gherkin
Given una cuenta profesional de Instagram conectada
When un cliente inicia una conversación
Then el mensaje aparece una sola vez en el estudio correcto
And la conversación queda pendiente de clasificar
And no se crea una cita
And un miembro autorizado puede vincularla o convertirla en caso
And puede responder desde el dashboard si Meta permite el envío
```

### Recibir una consulta de WhatsApp Business

Como responsable de un estudio, quiero recibir y responder los chats de WhatsApp desde el dashboard sin dejar de utilizar la aplicación habitual.

```gherkin
Given un número de WhatsApp Business conectado mediante Coexistence
When un cliente escribe y el estudio responde desde la aplicación
Then el mensaje entrante aparece una sola vez en el estudio correcto
And la respuesta de la aplicación aparece en el mismo hilo del dashboard
And la conversación queda pendiente de clasificar
And no se crea ninguna cita
And un miembro autorizado puede vincularla o convertirla en caso
```

### Registrar una solicitud presencial

Como tatuador, quiero registrar el brief mientras atiendo al cliente para conservar la información sin trasladarla después desde papel o mensajería.

```gherkin
Given un miembro autenticado de un estudio
When completa una solicitud presencial válida
Then se crea un caso con origen in_studio dentro de su estudio
And se registra quién creó el caso
And las referencias quedan asociadas al mismo caso
And no se reserva tiempo de agenda automáticamente
And ningún usuario de otro estudio puede leerlo
```

### Revisar el trabajo de hoy

Como artista, quiero ver mis citas de hoy con sus referencias para preparar cada sesión sin buscar en otras aplicaciones.

```gherkin
Given un artista autenticado con citas para hoy
When abre su panel
Then ve únicamente sus citas ordenadas por hora
And cada cita muestra el resumen del caso y sus imágenes
And puede abrir el caso completo con una acción
```

### Convertir una solicitud en cita

Como manager, quiero aprobar una solicitud y asignarle una cita para separar claramente interés inicial de tiempo confirmado.

```gherkin
Given un caso en estado approved y un artista asignado
And la cita no requiere señal
When el manager crea una cita en un intervalo libre
Then la cita queda vinculada al caso y al artista
And la cita queda en estado confirmed
And el caso permanece approved hasta que empieza el trabajo
And el intervalo aparece en la vista del artista
```

```gherkin
Given un artista con una cita existente
When el manager intenta crear otra cita que se solapa
Then la operación se rechaza sin modificar la agenda
And se identifica el conflicto
```

## Métricas iniciales de producto

- porcentaje de solicitudes que el estudio revisa desde el panel;
- conversaciones, casos y conversión a cita desglosados por origen website, instagram, whatsapp o in_studio;
- tiempo desde recepción hasta primera revisión;
- porcentaje de solicitudes convertidas en cita;
- porcentaje de solicitudes que requieren pedir información adicional;
- citas canceladas y no-shows;
- casos del día con información o imágenes pendientes;
- número de herramientas externas que el estudio deja de usar para preparar una sesión.
