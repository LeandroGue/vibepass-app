# Control de Frecuencia de Publicidad (v1.9.3)

Este plan implementa una lógica de frecuencia para los anuncios intersticiales. El objetivo es mejorar la experiencia del usuario evitando que aparezca publicidad en el primer pase generado tras descargar la app, y estableciendo una frecuencia de 1 anuncio cada 3 pases generados posteriormente.

## Proposed Changes

### [Lógica de Aplicación (JavaScript)]

#### [MODIFY] [js/app.js](file:///C:/Users/leand/OneDrive/Documentos/Generador%20de%20Pases%20VIP/js/app.js)
- **Contador de Generaciones**: Implementar un sistema que guarde en `localStorage` cuántos pases ha creado el usuario.
- **Lógica de Decisión**:
    - Si es el **primer pase** (contador = 1), no se muestra el anuncio.
    - Para los siguientes, el anuncio solo se mostrará cada **3 pases** (ej. en el pase 3, 6, 9...).

### [Sincronización]

#### [ACTION] [Sincronización Nativa]
- Replicar cambios en `www/js/app.js`.
- Ejecutar `npx cap copy`.

## Verification Plan

### Manual Verification
1. Borrar datos de la app (para simular descarga nueva).
2. Generar el **Pase 1**: Confirmar que NO sale anuncio.
3. Generar el **Pase 2**: Confirmar que NO sale anuncio.
4. Generar el **Pase 3**: Confirmar que SÍ sale anuncio.
5. Confirmar que la frecuencia se mantiene (próximo anuncio en el Pase 6).
