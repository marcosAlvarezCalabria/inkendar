# Instrucciones principales del proyecto

- Para cualquier feature, corrección, refactorización, cambio arquitectónico, API, base de datos o trabajo de pruebas, carga y sigue `$staff-software-engineer` como skill principal.
- La arquitectura aprobada de Inkendar es un monolito modular TypeScript. Conserva las dependencias hacia el dominio y aísla Supabase, Chatwoot, Google Calendar y otros proveedores mediante adaptadores.
- Aplica siempre TDD a cambios de comportamiento: prueba RED primero, implementación mínima GREEN y REFACTOR con la suite verde. Toda corrección reproducible debe empezar con una prueba de regresión. No inventes pruebas para cambios exclusivamente documentales o mecánicos sin comportamiento.
- Aplica el proceso con proporcionalidad: una modificación trivial no necesita la misma ceremonia que un cambio de dominio, seguridad o persistencia.
- Respeta las instrucciones explícitas del usuario y cualquier `AGENTS.md` más cercano al archivo que se esté modificando.
- Trata los documentos vivos que el proyecto designe como fuentes de verdad y mantenlos sincronizados cuando cambien decisiones, alcance, stack o estado.
- No incluyas secretos ni datos personales o comerciales sensibles en `AGENTS.md` ni en documentación técnica destinada al repositorio.
