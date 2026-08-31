# Requisitos del workspace para estudios de tatuaje

_Estado: borrador respaldado por investigación de internet; sujeto a validación continua_

_Última actualización: 2026-08-30_

_La fuente de verdad para los límites entre MVP vendible y futuro es [Especificación del MVP vendible](sellable-mvp-spec.md). Este documento conserva el backlog detallado de requisitos._

La evidencia que origina estos requisitos está en [Voz del usuario](../research/tattoo-artist-voice-of-customer.md). El alcance de entrega se resume en [MVP](mvp.md).

## Objetivo

Como tatuador o responsable de estudio, quiero recibir en un único dashboard las consultas que llegan desde la web, Instagram, WhatsApp Business o una conversación presencial y convertirlas en casos organizados para poder evaluarlas, responder, programar sesiones y preparar el trabajo sin reconstruir información desde varias aplicaciones.

## Contrato de dominio

- **Cliente:** persona que puede tener varios trabajos a lo largo del tiempo.
- **Caso de tatuaje:** proyecto creativo y operativo que conserva brief, conversación, recursos, asignación y progreso.
- **Cita:** bloque de agenda asociado a un caso y un artista. Un caso puede tener cero, una o varias citas.
- **Conversación:** hilo de un canal externo o interno que puede estar pendiente de clasificar o vinculado a un cliente y a un caso.
- **Mensaje:** entrada de una conversación; las notas internas se almacenan y presentan de forma claramente diferenciada.
- **Recurso:** referencia, fotografía de zona, diseño o imagen de progreso privada.
- **Señal:** compromiso económico asociado a una cita; su registro es distinto del procesamiento del pago.

Los estados no se mezclan:

- Caso: `new`, `needs_info`, `reviewing`, `approved`, `declined`, `in_progress`, `completed`, `archived`.
- Cita: `tentative`, `awaiting_deposit`, `confirmed`, `completed`, `cancelled`, `no_show`.
- Señal: `not_required`, `pending`, `paid`, `applied`, `forfeited`, `refunded`.

## Requisitos P0: primera validación vendible

### REQ-01 — Entrada pública

La web de cada estudio puede crear una solicitud mediante una integración identificada, sin credenciales administrativas. El sistema valida datos y archivos, limita abuso y devuelve una confirmación inequívoca de recepción.

### REQ-02 — Captura presencial

Owner, manager o artist puede crear el mismo tipo de caso desde el panel mientras atiende al cliente. El estudio se deriva de su sesión, el origen queda como `in_studio` y el cliente no necesita cuenta.

### REQ-03 — Brief guiado para tatuaje

El intake recoge como núcleo:

- nombre y canal de contacto;
- idea o descripción;
- zona y lado del cuerpo cuando corresponda;
- tamaño aproximado con ayuda visual o ejemplos comprensibles;
- artista preferido o sin preferencia;
- referencias opcionales;
- aceptación de privacidad.

Puede solicitar condicionalmente estilo/color, si es cover-up o rework, fotografía actual, presupuesto orientativo y disponibilidad. Los campos condicionales no deben convertir el formulario inicial en una entrevista interminable.

### REQ-04 — Bandeja de evaluación

Owner y manager ven todos los casos del estudio; artist ve los asignados y los compartidos. La bandeja permite filtrar por estado, artista, origen, fecha y datos pendientes, y realizar las acciones `solicitar información`, `aprobar`, `rechazar`, `asignar` y `archivar`.

### REQ-05 — Ficha única del caso

La ficha presenta juntos brief, cliente, artista, imágenes, conversación, notas internas, citas y señal. Cada cambio relevante conserva autor y fecha. Las notas internas nunca se confunden con mensajes para el cliente.

### REQ-06 — Recepción y estado comunicables

Al enviar una solicitud, el cliente recibe acuse de recibo y próximos pasos por un canal que no exige instalar una aplicación. El panel conserva el historial de comunicaciones y su estado de entrega cuando el proveedor lo permita. El primer transporte recomendado es correo; queda pendiente de confirmación comercial.

### REQ-07 — Cliente e historial

Antes de crear un cliente se buscan coincidencias por nombre, teléfono o correo dentro del mismo estudio. Su perfil muestra casos, citas y notas permitidas, sin mezclar datos de otros estudios. Los usuarios autorizados pueden corregir datos, artista asignado o presupuesto sin borrar el historial del cambio.

### REQ-08 — Agenda controlada por el estudio

Una solicitud personalizada no reserva tiempo automáticamente. Tras aprobarla, un usuario autorizado puede crear citas tentativas o confirmadas. El sistema evita solapamientos del mismo artista y permite varias sesiones para un caso.

### REQ-09 — Registro de señal

La cita indica si requiere señal, su importe, vencimiento y estado. En P0 el pago puede registrarse manualmente; no se guardan datos bancarios ni de tarjeta. Una señal pendiente no se presenta como cita confirmada.

### REQ-10 — Vista “Hoy”

Cada artista ve sus citas ordenadas, con cliente, horario, zona, tamaño, resumen, referencias, estado de señal y avisos de información pendiente. Desde cada elemento abre el caso completo con una acción.

### REQ-11 — Imágenes privadas

Cliente y estudio pueden adjuntar referencias válidas. Los recursos se aíslan por estudio y caso, se sirven mediante acceso temporal y muestran estados claros de subida, error y eliminación.

### REQ-12 — Uso móvil y tablet

Las tareas de captura presencial, revisión rápida, subida desde cámara y consulta de “Hoy” funcionan sin depender de una pantalla de escritorio. La navegación no expone datos de otros clientes cuando el dispositivo se usa delante de uno.

### REQ-13 — Multi-tenancy y auditoría

Toda lectura y escritura se autoriza por membresía y rol. Ningún identificador enviado por el navegador basta para cambiar de estudio. Se prueban explícitamente accesos permitidos y denegados para tablas y recursos.

### REQ-14 — Confianza operativa y recuperación

Los formularios largos y el modo presencial guardan borradores. Un fallo de red o de subida permite reintentar sin volver a escribir ni perder archivos ya confirmados. Los errores son visibles y recuperables; no se acepta pérdida silenciosa de datos. El estudio puede buscar y exportar sus datos esenciales.

### REQ-15 — Presupuesto y decisión artística bajo control humano

El sistema recopila presupuesto orientativo, tamaño, estilo, zona y notas internas de precios, pero solo un artista o responsable autorizado puede aceptar el trabajo y fijar o modificar el presupuesto. El P0 no calcula precios ni acepta encargos automáticamente.

## Requisitos P1: estudio conectado

Estos requisitos no bloquean la primera venta. Se implementan después de validar el recorrido web → caso → cita y de superar el spike de Chatwoot y Meta definido en la especificación principal.

### REQ-16 — Inbox de Instagram

Owner conecta la cuenta profesional de Instagram del estudio mediante la autorización oficial de Meta. Desde ese momento:

- cada mensaje entrante compatible crea o actualiza una única conversación del estudio de forma idempotente;
- se conservan canal, remitente externo, texto, recursos compatibles, fecha y estado de entrega;
- una conversación nueva aparece como pendiente de clasificar y no crea por sí sola un caso ni una cita;
- un miembro autorizado puede asociarla a un cliente o caso existente, o convertirla explícitamente en un caso nuevo con origen instagram;
- el equipo puede responder desde el dashboard cuando la API lo permita;
- si la ventana de respuesta ha vencido, falta un permiso o Meta rechaza el envío, el panel muestra el estado real y una alternativa, nunca una falsa confirmación;
- tokens y secretos de Meta solo se usan en backend, se almacenan protegidos y quedan aislados por estudio.

### REQ-17 — WhatsApp Business conectado

Owner conecta el número del estudio mediante Embedded Signup v4. Cuando la cuenta sea elegible se usa Coexistence para conservar el número y seguir utilizando la aplicación WhatsApp Business.

- cada mensaje individual entrante compatible crea o actualiza una única conversación del estudio de forma idempotente;
- los mensajes enviados desde la aplicación WhatsApp Business se reflejan en el dashboard cuando Meta entregue el webhook correspondiente;
- la sincronización inicial de contactos o historial es opcional, requiere autorización explícita y muestra progreso o error;
- la conversación aparece pendiente de clasificar y puede asociarse a un cliente o caso, o convertirse en un caso con origen whatsapp;
- dentro de la ventana de atención el equipo puede responder libremente desde el dashboard;
- fuera de esa ventana solo se ofrece una plantilla aprobada y permitida o la continuación desde la aplicación; nunca se marca como entregado un envío rechazado;
- grupos, campañas masivas y tipos de mensaje no soportados quedan fuera de la fase conectada inicial;
- los cargos de Meta por mensajes de Cloud API se distinguen del precio del SaaS;
- credenciales, WABA y phone number ID se protegen en backend y se aíslan por estudio.

## Requisitos P2: después del núcleo conectado

- cobro de señales mediante Stripe, vencimiento y liberación del hueco;
- recordatorios configurables y políticas de cancelación/reprogramación;
- consentimiento y cuestionario de salud versionados según región;
- lista de espera y oferta de huecos liberados;
- enlace privado para que el cliente complete información sin crear cuenta;
- configuración limitada de campos del intake por estudio;
- sincronización de calendario y detección de conflictos externos;
- fotografías de progreso y seguimiento de piezas de varias sesiones.

## Requisitos P3: expansión condicionada por uso

- instrucciones de cuidado y solicitud de fotografía curada;
- informes de conversión, no-shows y carga por artista;
- comisiones, caja/POS e inventario;
- automatizaciones de reseñas y marketing;
- soporte offline completo;
- herramientas de IA para clasificación o resumen, nunca para decidir viabilidad artística automáticamente.

## Criterios de aceptación transversales

```gherkin
Given una solicitud pública válida
When el sistema la acepta
Then crea un único caso en el estudio correcto
And conserva brief, origen y referencias
And confirma recepción al cliente
And no crea ninguna cita
```

```gherkin
Given una cuenta profesional de Instagram conectada a un estudio
When Meta entrega dos veces el mismo evento de mensaje
Then existe una sola conversación y un solo mensaje en ese estudio
And la conversación aparece pendiente de clasificar
And no se crea automáticamente ningún caso ni cita
```

```gherkin
Given una conversación de Instagram pendiente de clasificar
When un miembro autorizado la convierte en caso
Then el caso conserva origen instagram
And la conversación y sus recursos quedan vinculados al caso
And el miembro puede completar o solicitar el brief que falta
```

```gherkin
Given una respuesta de Instagram fuera de la ventana permitida por Meta
When un miembro intenta enviarla desde el dashboard
Then el sistema no la marca como entregada
And muestra el motivo y una alternativa disponible
```

```gherkin
Given un número existente conectado mediante Coexistence
When un cliente envía un mensaje y el estudio responde desde WhatsApp Business
Then existe una sola conversación en el estudio correcto
And la respuesta enviada desde la aplicación aparece también en el dashboard
And no se crea automáticamente ningún caso ni cita
```

```gherkin
Given una conversación de WhatsApp fuera de la ventana de atención
When un miembro intenta responder desde el dashboard
Then solo puede usar una plantilla aprobada y permitida
And el sistema no marca como entregado un envío rechazado
And ofrece continuar desde la aplicación cuando no haya plantilla disponible
```

```gherkin
Given un caso con información insuficiente
When el artista lo marca como needs_info
Then el caso sigue visible en la bandeja
And queda registrada la información solicitada
And no ocupa agenda
```

```gherkin
Given un caso aprobado que requiere dos sesiones
When un usuario autorizado crea dos citas sin conflicto
Then ambas citas pertenecen al mismo caso
And cada cita conserva su propio estado
And el historial del caso muestra las dos sesiones
```

```gherkin
Given una cita que requiere señal
When la señal continúa pendiente
Then la cita no aparece como confirmed
And el panel muestra el vencimiento y la acción necesaria
```

```gherkin
Given dos estudios distintos
When un miembro intenta acceder a un caso o recurso del otro estudio
Then la operación se deniega
And no se revela si el recurso existe
```

## Dependencias y límites de los canales de Meta

### Instagram

- Solo se conectan cuentas profesionales compatibles con la API oficial de Instagram.
- El SaaS necesitará Advanced Access y superar la revisión de Meta para servir cuentas que no sean propiedad del desarrollador.
- La conversación debe haber sido iniciada por el usuario de Instagram; el producto no usará esta integración para enviar mensajes fríos.
- La ventana ordinaria indicada por Meta es de 24 horas desde el mensaje del usuario. Cualquier excepción para atención humana se implementará solo si la cuenta, el permiso y la política vigentes la permiten.
- Las carpetas Primary, General y Requests y el estado de lectura no se sincronizan exactamente con la aplicación de Instagram; el dashboard mantendrá su propio estado operativo.

### WhatsApp Business

- Se usa WhatsApp Cloud API y Embedded Signup v4 con los permisos whatsapp_business_management y whatsapp_business_messaging aprobados.
- Coexistence exige que seamos Tech Provider o Solution Partner y que el número y la aplicación del estudio sean elegibles.
- Los chats individuales y los mensajes compatibles se reflejan; los grupos y algunas funciones exclusivas de la aplicación no se sincronizan.
- La respuesta libre mediante Cloud API usa una ventana de atención de 24 horas. Fuera de ella solo se envían plantillas aprobadas a usuarios con el consentimiento exigido.
- Con autorización del estudio se puede sincronizar historial reciente y contactos durante el alta; rechazarlo no impide recibir mensajes futuros.
- Los mensajes enviados mediante Cloud API están sujetos a precios de Meta; los enviados directamente desde la aplicación WhatsApp Business continúan bajo sus propias condiciones.
- El estudio conserva la propiedad de sus activos y, como Tech Provider, añade el método de pago requerido a su cuenta de WhatsApp Business.

## Decisiones abiertas antes de implementación completa

1. Confirmar correo o enlace seguro como primer canal de respuesta para las solicitudes de la web; SMS queda como integración futura.
2. Definir moneda, impuestos y reglas de señal de la primera región.
3. Definir límites de cantidad, tamaño y formato de imágenes.
4. Definir retención, borrado y exportación de datos personales.
5. Contrastar el vocabulario de estados mediante repetición en fuentes públicas y uso de pilotos.
6. Decidir qué campos del intake serán configurables en P0.
7. Decidir si los cargos de WhatsApp Cloud API se repercuten por consumo o se incluyen con límites en cada plan.
