# Product

_La visión general se conserva aquí. La fuente de verdad para el alcance vendible, las fases y la Definition of Done es `docs/product/sellable-mvp-spec.md`; ante una contradicción prevalece esa especificación._

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Propietario o administrador de un estudio de tatuaje que recibe consultas desde su web, Instagram, WhatsApp Business o el propio estudio y las convierte en casos y citas.
- Tatuador independiente dentro de un estudio que necesita ver su trabajo del día, las solicitudes asignadas y el material enviado por cada cliente.
- Tatuador que atiende a un cliente presencialmente y necesita registrar con rapidez el brief, el contacto y las referencias desde un móvil o una tablet.
- Un estudio puede tener un único usuario o varios artistas con espacios y permisos separados.

## Product Purpose

Ofrecer a cada estudio de tatuaje un panel conectado a su web, Instagram y WhatsApp Business que reúna solicitudes, conversaciones, citas e imágenes en un solo lugar. El producto debe convertir formularios públicos, mensajes de Instagram y WhatsApp y consultas atendidas dentro del estudio en trabajo organizado, y dar a cada artista una vista clara de lo que tiene que atender hoy.

El éxito significa que el estudio puede recibir y responder consultas desde el dashboard sin alternar entre el formulario de su web, Instagram, WhatsApp Business, correo, calendario y carpetas de imágenes separadas.

## Positioning

El panel se entrega como una mejora integrada con las webs y los canales de los estudios, no como una agenda genérica independiente. Cada consulta relevante debe poder convertirse explícitamente en una ficha de trabajo útil para el artista, conservando conversación, asignación, cita e imágenes del cliente en el mismo contexto.

## Operating Context

- Varias webs de estudios enviarán información a una plataforma común, manteniendo aislados los datos de cada estudio.
- Cada estudio puede conectar una cuenta profesional de Instagram. Los nuevos mensajes llegan al dashboard y pueden asociarse a un cliente o caso, sin asumir que todo saludo sea una solicitud completa.
- Cada estudio puede conectar su número actual de WhatsApp Business mediante Coexistence cuando sea elegible, seguir usando la aplicación y reflejar sus chats individuales en el dashboard.
- El mismo proceso también se iniciará presencialmente: un tatuador autenticado podrá completar el brief con el cliente delante desde el panel, especialmente en móvil o tablet.
- Los formularios actuales pueden incluir nombre del cliente, idea del tatuaje, zona del cuerpo, artista preferido y tamaño aproximado.
- Una solicitud inicial no equivale necesariamente a una cita confirmada; el estudio debe poder revisarla, asignarla y convertirla en cita.
- Los artistas necesitan consultar agenda diaria, imágenes de referencia y datos asociados a su trabajo.
- El stack habitual del propietario es MERN. Las webs públicas pueden utilizar tecnologías distintas, incluido Astro, siempre que puedan conectarse al panel.

## Capabilities and Constraints

Capacidades confirmadas:

- multi-tenancy por estudio;
- uno o varios usuarios/artistas por estudio;
- entrada de solicitudes desde formularios web y recepción de conversaciones desde Instagram y WhatsApp Business;
- captura asistida de solicitudes dentro del estudio, optimizada para móvil y tablet;
- bandeja central omnicanal para solicitudes, conversaciones y mensajes pendientes;
- agenda y vista "Hoy" por artista;
- almacenamiento y consulta de imágenes enviadas por clientes o guardadas por artistas;
- asignación de solicitudes y citas a artistas.

Decisiones técnicas confirmadas:

- Supabase Cloud como backend gestionado del MVP, en un único proyecto multi-tenant;
- React y TypeScript para el panel; las webs públicas permanecen desacopladas y pueden usar Astro u otro stack;
- el MVP recibe solicitudes desde la web y la captura presencial y crea el mismo tipo de caso;
- la fase conectada usa Chatwoot como primera opción para Instagram y WhatsApp Business, condicionada a un spike técnico, comercial y de Coexistence;
- la integración directa mediante las APIs oficiales de Meta queda como fallback detrás de un puerto de canal aislado del dominio;
- la agenda y las citas se gestionan de forma nativa en el MVP; la sincronización con calendarios externos queda para una fase posterior.

Decisiones comerciales confirmadas para la landing de validación:

- nombre público utilizado en la validación: `Inkendar`; la comprobación de dominio y marca continúa pendiente;
- hipótesis de precio visibles: 19 EUR/mes para artista independiente y 49 EUR/mes para estudio;
- la landing ofrece una selección piloto limitada y deja claro que la beta todavía no es autoservicio;
- identidad visual oscura, móvil primero, con logo mecánico y naranja corporativo `#FF7000`; permanece separada de Incandi, que aparece únicamente como equipo desarrollador.

Decisiones abiertas:

- canal inicial para responder solicitudes de la web: correo o enlace seguro; Instagram y WhatsApp conservan sus canales cuando sus APIs permitan responder;
- procesamiento de pagos de señal, formularios de consentimiento y seguimiento de curación quedan fuera del primer slice; P0 sí registra el estado manual de la señal.
- tratamiento comercial de los cargos de Meta por mensajes enviados mediante WhatsApp Cloud API;
- límites definitivos por plan, impuestos, condiciones contractuales del precio fundador y costes de terceros.

## Evidence on Hand

- Existe al menos una web con un formulario que recoge nombre, idea del tatuaje, zona del cuerpo, artista y tamaño aproximado.
- La investigación exploratoria en conversaciones de tatuadores, clientes y reseñas de software respalda como problemas repetidos la fragmentación de contexto, la diferencia entre solicitud y cita, los briefs incompletos, la incertidumbre de comunicación y el control de señales/no-shows. La síntesis está en `docs/research/tattoo-artist-voice-of-customer.md`.
- No se han aportado todavía repositorios de las webs, diseños, identidad visual, datos reales de uso ni pilotos. La investigación de internet descubre patrones cualitativos, no porcentajes; las decisiones se revisarán con nueva evidencia pública y con el comportamiento y feedback voluntario de los pilotos.

## Product Principles

1. Una sola ficha debe reunir todo el contexto necesario para realizar un tatuaje, aunque la conversación haya empezado en la web, Instagram, WhatsApp Business o presencialmente.
2. Cada artista debe poder entender su día con una mirada.
3. La integración con una web existente debe ser sencilla y desacoplada de su tecnología.
4. Registrar una consulta delante del cliente debe ser rápido y no exigirle crear una cuenta.
5. Los datos de cada estudio deben permanecer aislados y sus permisos ser explícitos.
6. La plataforma debe poder empezar gestionada en cloud sin cerrar la puerta a self-hosting posterior.
7. Una herramienta usada delante del cliente debe conservar el trabajo, explicar los fallos y permitir recuperarse sin empezar de nuevo.

## Accessibility & Inclusion

El panel debe ser utilizable con teclado, conservar contraste suficiente y comunicar estados sin depender únicamente del color. El nivel normativo objetivo queda por confirmar.
