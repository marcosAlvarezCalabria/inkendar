# MVP vigente de Inkendar

_Estado: resumen activo_

_Última actualización: 2026-09-13_

La fuente de verdad del alcance, los estados y los criterios es la [Especificación de Inkendar](sellable-mvp-spec.md). El detalle anterior de este archivo se retiró porque conservaba roles y canales descartados; permanece disponible en el historial de Git.

## Resultado que se construye

Inkendar será una PWA multi-tenant entregada como servicio gestionado. El owner opera conversaciones, clientes, casos, agenda, ofertas de fecha, citas y contenido. Cada artista dispone de una vista privada de solo lectura con sus citas y el contexto necesario para preparar el tatuaje.

El cliente conversa por web, Instagram o Facebook y usa enlaces seguros para elegir fechas sin crear una cuenta. Chatwoot funciona detrás de Inkendar. Google Calendar conserva la disponibilidad y los eventos; Supabase conserva el dominio, permisos, archivos y auditoría.

El owner puede publicar la galería general y portfolios por artista. Las webs nuevas o existentes consumen únicamente contenido publicado mediante un contrato público de solo lectura.

## Límites vigentes

- No existe rol `manager` en el MVP.
- Los artistas no responden clientes, crean casos, confirman citas ni modifican contenido.
- WhatsApp, pagos, consentimientos médicos, POS, inventario, marketing masivo y onboarding autoservicio quedan fuera.
- La landing comercial es independiente de la PWA y de las webs de los estudios.
- El desarrollo sigue TDD dentro de un monolito modular TypeScript.

El orden ejecutable está en la sección «Orden inmediato» de la especificación viva.
