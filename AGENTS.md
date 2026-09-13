# Instrucciones principales del proyecto

- Para cualquier feature, corrección, refactorización, cambio arquitectónico, API, base de datos o trabajo de pruebas, carga y sigue `$staff-software-engineer` como skill principal.
- La arquitectura aprobada de Inkendar es un monolito modular TypeScript. Conserva las dependencias hacia el dominio y aísla Supabase, Chatwoot, Google Calendar y otros proveedores mediante adaptadores.
- Aplica siempre TDD a cambios de comportamiento: prueba RED primero, implementación mínima GREEN y REFACTOR con la suite verde. Toda corrección reproducible debe empezar con una prueba de regresión. No inventes pruebas para cambios exclusivamente documentales o mecánicos sin comportamiento.
- Usa dos roles secuenciales para entregar código: el agente de implementación trabaja en una rama `codex/*` y no integra; el agente de integración revisa el diff, ejecuta la validación completa, gestiona el Pull Request y vigila GitHub Actions hasta un resultado final.
- Una vez activo el CI, no integres código directamente en `main`: exige Pull Request y checks verdes. Devuelve al agente de implementación los fallos de producto; el agente de integración corrige únicamente problemas del pipeline o de integración dentro de su responsabilidad.
- Limita cada chat de agente a un único slice y a un presupuesto operativo máximo de 32.000 tokens. Crea agentes sin historial heredado y proporciona un paquete inicial de hasta 1.500 palabras con objetivo, aceptación, rutas de fuentes de verdad, estado Git y pruebas relevantes.
- Si un agente se acerca al límite de contexto o descubre otro objetivo, estabiliza el slice, registra las decisiones y produce un handoff de hasta 1.500 palabras. El agente siguiente debe verificarlo contra repositorio, pruebas y documentación; nunca tratar el handoff como fuente de verdad independiente.
- Usa Engram como memoria auxiliar del proyecto: al iniciar un slice recupera solo las memorias relacionadas; al terminar guarda únicamente decisiones duraderas, descubrimientos y el handoff. No guardes conversaciones completas, salidas crudas, código, secretos ni datos de clientes. Verifica siempre lo recuperado contra Git, pruebas y documentos vivos.
- Aplica el proceso con proporcionalidad: una modificación trivial no necesita la misma ceremonia que un cambio de dominio, seguridad o persistencia.
- Respeta las instrucciones explícitas del usuario y cualquier `AGENTS.md` más cercano al archivo que se esté modificando.
- Trata los documentos vivos que el proyecto designe como fuentes de verdad y mantenlos sincronizados cuando cambien decisiones, alcance, stack o estado.
- No incluyas secretos ni datos personales o comerciales sensibles en `AGENTS.md` ni en documentación técnica destinada al repositorio.
