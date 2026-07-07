// ===== DATOS DE PASES DIVERTIDOS Y FAMILIARES =====
const categories = [
    { id: 'all', name: 'Todos', icon: 'confirmation_number' },
    { id: 'casa', name: 'Casa 🏠', icon: 'home' },
    { id: 'trabajo', name: 'Trabajo 💼', icon: 'work' },
    { id: 'gym', name: 'Gym 💪', icon: 'fitness_center' },
    { id: 'pareja', name: 'Pareja ❤️', icon: 'favorite' },
    { id: 'amigos', name: 'Amigos 🍻', icon: 'sports_bar' },
    { id: 'escuela', name: 'Escuela 📚', icon: 'school' },
    { id: 'gaming', name: 'Gaming 🎮', icon: 'sports_esports' }
];

const passesData = [
    // ===== CATEGORÍA: CASA (10 pases) =====
    { id: 'casa1', category: 'casa', emoji: '🍳', title: 'Desayuno en la Cama', desc: 'Válido por un desayuno completo servido en la cama. Incluye café, tostadas y mucho cariño.', subtitle: 'Favor de Cocina Especial', vibe: 'Familiar', badge: 'PASO LIBRE' },
    { id: 'casa2', category: 'casa', emoji: '🛏️', title: 'Dormir hasta el Mediodía', desc: 'Queda prohibido hacer ruido o levantar al titular antes de las 12:00.', subtitle: 'Licencia de Descanso Completo', vibe: 'Familiar', gold: true, badge: 'PASE DORADO' },
    { id: 'casa3', category: 'casa', emoji: '🧺', title: 'Exención de Limpieza', desc: 'Hoy no limpias, no recoges y no ordenas nada en la casa.', subtitle: 'Sindicato del Hogar', vibe: 'Familiar', badge: 'PASO LIBRE' },
    { id: 'casa4', category: 'casa', emoji: '🧽', title: 'Vale por No Lavar Platos', desc: 'Alguien más se encarga de lavar los platos después de la cena hoy. ¡Disfruta!', subtitle: 'Evadir Cocina', vibe: 'Familiar', badge: 'VIP PASSPORT' },
    { id: 'casa5', category: 'casa', emoji: '👵', title: 'Excusa de la Abuela', desc: 'Pase supremo que te libra de cualquier obligación alegando mimos.', subtitle: 'Firmado por la Abuela', vibe: 'Familiar', gold: true, badge: 'PASE DE LA ABUELA' },
    { id: 'casa6', category: 'casa', emoji: '🐶', title: 'Librarse del Perro', desc: 'Transfiere el deber de pasear a la mascota o limpiar sus cosas a otro familiar.', subtitle: 'Pase Canino Oficial', vibe: 'Familiar', badge: 'VIP ACCESS' },
    { id: 'casa7', category: 'casa', emoji: '🧺', title: 'Día Libre de Lavandería', desc: 'Alguien más se encarga de doblar, planchar y guardar tu ropa hoy.', subtitle: 'Servicio de Ropa Privado', vibe: 'Familiar', badge: 'PASO LIBRE' },
    { id: 'casa8', category: 'casa', emoji: '🛒', title: 'Súper Exento', desc: 'Evita ir de compras al supermercado esta semana. Alguien más hace la lista.', subtitle: 'Licencia de Compras', vibe: 'Familiar', badge: 'VIP ACCESS' },
    { id: 'casa9', category: 'casa', emoji: '🪴', title: 'Regado Automático', desc: 'Traspasa la responsabilidad de regar las plantas y cuidar el jardín por 3 días.', subtitle: 'Jardinería Delegada', vibe: 'Familiar', badge: 'PASO LIBRE' },
    { id: 'casa10', category: 'casa', emoji: '🚿', title: 'Prioridad de Baño Mañanero', desc: 'Garantiza acceso prioritario al baño principal en la hora punta sin quejas.', subtitle: 'Pase de Ducha Express', vibe: 'Familiar', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: TRABAJO (10 pases) =====
    { id: 'trab1', category: 'trabajo', emoji: '⏰', title: 'Salir Temprano Hoy', desc: 'Salida autorizada antes del horario laboral oficial.', subtitle: 'Aprobación Mental Absoluta', vibe: 'Laboral', badge: 'VIP EXIT' },
    { id: 'trab2', category: 'trabajo', emoji: '📵', title: 'Sin Reuniones Inútiles', desc: 'Exención de llamadas que bien pudieron ser un correo electrónico.', subtitle: 'Salvavidas de Tiempo', vibe: 'Laboral', badge: 'PASE ESPECIAL' },
    { id: 'trab3', category: 'trabajo', emoji: '☕', title: 'Café Ilimitado', desc: 'Café gratis y prioritario en la oficina durante todo el día.', subtitle: 'Cortesía de Cafeína', vibe: 'Laboral', gold: true, badge: 'PASE DORADO' },
    { id: 'trab4', category: 'trabajo', emoji: '🥪', title: 'Almuerzo Extendido', desc: 'Duplica la hora de almuerzo para disfrutar de una buena comida o siesta.', subtitle: 'Receso Ampliado', vibe: 'Laboral', badge: 'VIP RECESO' },
    { id: 'trab5', category: 'trabajo', emoji: '🚪', title: 'Home Office Prioritario', desc: 'Derecho a trabajar desde el sofá en pijama y con la cámara apagada hoy.', subtitle: 'Trabajo Remoto Total', vibe: 'Laboral', gold: true, badge: 'PASE SUPREMO' },
    { id: 'trab6', category: 'trabajo', emoji: '🔇', title: 'Modo No Molestar', desc: 'Válido por 4 horas de silencio absoluto. Nadie puede hablarte.', subtitle: 'Concentración Total', vibe: 'Laboral', badge: 'PASO LIBRE' },
    { id: 'trab7', category: 'trabajo', emoji: '🚗', title: 'Estacionamiento VIP', desc: 'Derecho a estacionar en el mejor puesto disponible cerca de la entrada.', subtitle: 'Acceso Vehicular VIP', vibe: 'Laboral', badge: 'VIP ACCESS' },
    { id: 'trab8', category: 'trabajo', emoji: '🧁', title: 'Postre de Oficina Gratis', desc: 'El colega que reciba este pase debe invitarte un pastelito en el descanso.', subtitle: 'Impuesto de Dulce', vibe: 'Laboral', badge: 'VALE DE ANTOJO' },
    { id: 'trab9', category: 'trabajo', emoji: '👔', title: 'Casual Friday a Diario', desc: 'Permiso para vestir de forma ultra cómoda cualquier día de la semana.', subtitle: 'Licencia de Vestuario', vibe: 'Laboral', badge: 'COMPACT SUIT' },
    { id: 'trab10', category: 'trabajo', emoji: '🗣️', title: 'Delegar Tarea Aburrida', desc: 'Transfiere una tarea administrativa menor a un colega con una sonrisa.', subtitle: 'Asignación Express', vibe: 'Laboral', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: GYM (10 pases) =====
    { id: 'gym1', category: 'gym', emoji: '🛋️', title: 'Saltarse el Gym Hoy', desc: 'El descanso es sagrado. Hoy se permite sofá, mantita y series.', subtitle: 'Recuperación Mental', vibe: 'Deportivo', gold: true, badge: 'PASE DORADO' },
    { id: 'gym2', category: 'gym', emoji: '🍕', title: 'Cheat Meal Oficial', desc: 'Las calorías de esta comida no se cuentan. ¡A disfrutar sin culpas!', subtitle: 'Licencia de Comida', vibe: 'Deportivo', badge: 'VIP PASS' },
    { id: 'gym3', category: 'gym', emoji: '🥤', title: 'Proteína Gratis', desc: 'Válido por un batido de proteína preparado por tu compañero.', subtitle: 'Corte de Suplemento', vibe: 'Deportivo', badge: 'VIP DRINK' },
    { id: 'gym4', category: 'gym', emoji: '🎵', title: 'Control de Playlist', desc: 'Derecho a elegir la música durante el entrenamiento grupal de hoy.', subtitle: 'DJ de Entrenamiento', vibe: 'Deportivo', badge: 'MUSIC PASS' },
    { id: 'gym5', category: 'gym', emoji: '🏋️‍♂️', title: 'Spotter de Confianza', desc: 'Tu compañero de gym debe cuidarte en todas las repeticiones pesadas.', subtitle: 'Asistencia de Carga', vibe: 'Deportivo', badge: 'VIP SPOTTER' },
    { id: 'gym6', category: 'gym', emoji: '🚶‍♂️', title: 'Cardio Suave', desc: 'Licencia para caminar despacio en la cinta mientras ves videos.', subtitle: 'Cardio Sin Esfuerzo', vibe: 'Deportivo', badge: 'VIP RECOV' },
    { id: 'gym7', category: 'gym', emoji: '😴', title: 'Exención de Piernas', desc: 'Permiso oficial para saltarse el día de pierna sin remordimientos.', subtitle: 'Skip Leg Day', vibe: 'Deportivo', gold: true, badge: 'PASE SUPREMO' },
    { id: 'gym8', category: 'gym', emoji: '💧', title: 'Cargador de Agua', desc: 'Tu compañero debe rellenar tu botella de agua cada vez que se vacíe.', subtitle: 'Hidratación Asistida', vibe: 'Deportivo', badge: 'VIP WATER' },
    { id: 'gym9', category: 'gym', emoji: '🧖‍♂️', title: 'Spa Post-Gym', desc: 'Válido por una sesión extendida de sauna o ducha relajante sin prisas.', subtitle: 'Relajación Total', vibe: 'Deportivo', badge: 'SPA ACCESS' },
    { id: 'gym10', category: 'gym', emoji: '🥇', title: 'Campeón de la Siesta', desc: 'Exención total de actividad física hoy. El músculo crece descansando.', subtitle: 'Crecimiento Pasivo', vibe: 'Deportivo', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: PAREJA (10 pases) =====
    { id: 'pareja1', category: 'pareja', emoji: '🎮', title: 'Gaming Ininterrumpido', desc: 'Bloque de 3 horas de juego libre en consola o PC sin quejas.', subtitle: 'Licencia de Videojuegos', vibe: 'Romántico', badge: 'ALL ACCESS' },
    { id: 'pareja2', category: 'pareja', emoji: '💝', title: 'Pase de \"Tienes Razón\"', desc: 'Gana cualquier discusión menor inmediatamente. No requiere argumentos.', subtitle: 'Certificado de Paz', vibe: 'Romántico', gold: true, badge: 'PASE DORADO' },
    { id: 'pareja3', category: 'pareja', emoji: '🍿', title: 'Control del Mando', desc: 'Eliges la película o serie de hoy en streaming sin debates.', subtitle: 'Poder de Pantalla', vibe: 'Romántico', badge: 'VIP PASS' },
    { id: 'pareja4', category: 'pareja', emoji: '🍽️', title: 'Cena a Elección', desc: 'Tú eliges el restaurante para cenar hoy sin negociaciones.', subtitle: 'Cena a tu Gusto', vibe: 'Romántico', badge: 'VIP FOOD' },
    { id: 'pareja5', category: 'pareja', emoji: '💆‍♂️', title: 'Masaje de 20 Minutos', desc: 'Válido por un masaje relajante de espalda o pies sin preguntas.', subtitle: 'Licencia de Spa', vibe: 'Romántico', gold: true, badge: 'PASE SUPREMO' },
    { id: 'pareja6', category: 'pareja', emoji: '🎬', title: 'Cine VIP en Pareja', desc: 'Tu pareja compra las palomitas y refrescos para la función de hoy.', subtitle: 'Corte de Butaca', vibe: 'Romántico', badge: 'MOVIE PASS' },
    { id: 'pareja7', category: 'pareja', emoji: '🧼', title: 'Libre de Cocinar', desc: 'Hoy tu pareja cocina y tú solo disfrutas de la comida.', subtitle: 'Chef Privado hoy', vibe: 'Romántico', badge: 'VIP PASS' },
    { id: 'pareja8', category: 'pareja', emoji: '🎁', title: 'Favor Sorpresa', desc: 'Canjeable por un favor espontáneo (un café, un dulce a domicilio, etc.).', subtitle: 'Vale de Amor', vibe: 'Romántico', badge: 'VALE REGALO' },
    { id: 'pareja9', category: 'pareja', emoji: '🛌', title: 'Robo de Manta Permitido', desc: 'Derecho a acaparar el 70% de la manta durante la noche sin quejas.', subtitle: 'Monopolio Térmico', vibe: 'Romántico', badge: 'WARM PASS' },
    { id: 'pareja10', category: 'pareja', emoji: '🗺️', title: 'Día de Cita de Ensueño', desc: 'Planificas la cita perfecta y tu pareja te acompaña con la mejor actitud.', subtitle: 'Cita VIP Planificada', vibe: 'Romántico', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: AMIGOS (10 pases) =====
    { id: 'amigos1', category: 'amigos', emoji: '🍺', title: 'Ronda Gratis', desc: 'La siguiente ronda de bebidas corre a cuenta de tus amigos.', subtitle: 'Canje de Amistad', vibe: 'Social', badge: 'VIP CARD' },
    { id: 'amigos2', category: 'amigos', emoji: '💰', title: 'Invitan los Amigos', desc: 'Tus amigos financian tu cuenta de hoy por tu excelente presencia.', subtitle: 'Compañía de Oro', vibe: 'Social', gold: true, badge: 'PASE DORADO' },
    { id: 'amigos3', category: 'amigos', emoji: '🚗', title: 'Conductor Designado', desc: 'Hoy te llevan y te traen a casa de tu salida grupal de forma segura.', subtitle: 'Servicio de Chofer', vibe: 'Social', badge: 'VIP DRIVER' },
    { id: 'amigos4', category: 'amigos', emoji: '🍕', title: 'Última Porción de Pizza', desc: 'Derecho indiscutible a comer la última porción de pizza del grupo.', subtitle: 'Derecho del Bocado', vibe: 'Social', badge: 'VIP PASS' },
    { id: 'amigos5', category: 'amigos', emoji: '🍔', title: 'Invitan la Hamburguesa', desc: 'Tus amigos pagan tu comida en la siguiente salida de fin de semana.', subtitle: 'Hamburguesa Gratis', vibe: 'Social', gold: true, badge: 'PASE DORADO' },
    { id: 'amigos6', category: 'amigos', emoji: '🎤', title: 'Exención de Karaoke', desc: 'Licencia para negarse a cantar sin ser presionado por el grupo.', subtitle: 'Pase de Silencio', vibe: 'Social', badge: 'SILENT PASS' },
    { id: 'amigos7', category: 'amigos', emoji: '🎮', title: 'Jugador 1 Garantizado', desc: 'Derecho a elegir el mejor mando y jugar primero en la consola.', subtitle: 'Prioridad de Mando', vibe: 'Social', badge: 'VIP GAMER' },
    { id: 'amigos8', category: 'amigos', emoji: '🤫', title: 'Guardar Secreto', desc: 'Obliga a tus amigos a omitir esa historia vergonzosa hoy.', subtitle: 'Código de Silencio', vibe: 'Social', badge: 'VIP CODE' },
    { id: 'amigos9', category: 'amigos', emoji: '⏰', title: 'Tolerancia de Tardanza', desc: 'Se te perdonan hasta 30 minutos de retraso en la próxima quedada.', subtitle: 'Excusa de Tiempo', vibe: 'Social', badge: 'LATE EXIT' },
    { id: 'amigos10', category: 'amigos', emoji: '🌟', title: 'Rey de la Fiesta', desc: 'Tus amigos deben tratarte como el rey de la fiesta toda la noche.', subtitle: 'Festejo Dorado', vibe: 'Social', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: ESCUELA (10 pases) =====
    { id: 'escuela1', category: 'escuela', emoji: '✍️', title: 'Copiador Autorizado', desc: 'Permiso para revisar los apuntes del compañero de al lado.', subtitle: 'Apoyo Académico', vibe: 'Escolar', badge: 'VIP NOTES' },
    { id: 'escuela2', category: 'escuela', emoji: '📓', title: 'Préstamo de Cuaderno', desc: 'Tu compañero te presta su libreta limpia para ponerte al día.', subtitle: 'Libreta Prestada', vibe: 'Escolar', badge: 'STUDY PASS' },
    { id: 'escuela3', category: 'escuela', emoji: '🍫', title: 'Traficante de Dulces', desc: 'Válido por un dulce o golosina compartida durante el recreo.', subtitle: 'Merienda de Patio', vibe: 'Escolar', badge: 'SWEET VALE' },
    { id: 'escuela4', category: 'escuela', emoji: '🥪', title: 'Sándwich Compartido', desc: 'Válido por la mitad del delicioso sándwich de tu compañero.', subtitle: 'Almuerzo de Amigo', vibe: 'Escolar', badge: 'VIP FOOD' },
    { id: 'escuela5', category: 'escuela', emoji: '🤫', title: 'Silencio Cómplice', desc: 'Tu compañero no dirá nada si te quedas dormido un momento.', subtitle: 'Alerta Silenciosa', vibe: 'Escolar', badge: 'VIP SILENCE' },
    { id: 'escuela6', category: 'escuela', emoji: '✏️', title: 'Préstamo de Estuche', desc: 'Derecho a usar lápiz, bolígrafo o borrador del compañero hoy.', subtitle: 'Útiles Escolares', vibe: 'Escolar', badge: 'VIP PEN' },
    { id: 'escuela7', category: 'escuela', emoji: '👥', title: 'Grupo de Trabajo VIP', desc: 'Garantiza un puesto en el mejor grupo para el proyecto escolar.', subtitle: 'Equipo de Éxito', vibe: 'Escolar', gold: true, badge: 'PASE DORADO' },
    { id: 'escuela8', category: 'escuela', emoji: '🏃‍♂️', title: 'Fila Prioritaria', desc: 'Derecho a salir de clase primero cuando suene el timbre.', subtitle: 'Salida Rápida', vibe: 'Escolar', badge: 'VIP EXIT' },
    { id: 'escuela9', category: 'escuela', emoji: '⚽', title: 'Capitán del Recreo', desc: 'Eliges equipo primero en el partido de fútbol del patio.', subtitle: 'Líder de Cancha', vibe: 'Escolar', badge: 'CAPTAIN CARD' },
    { id: 'escuela10', category: 'escuela', emoji: '🎓', title: 'Exención de Tarea', desc: 'Tus compañeros redactan el trabajo mientras tú aportas ideas.', subtitle: 'Idea Creativa', vibe: 'Escolar', gold: true, badge: 'PASE SUPREMO' },

    // ===== CATEGORÍA: GAMING (10 pases) =====
    { id: 'gaming1', category: 'gaming', emoji: '🎮', title: 'Jugador 1 Indiscutible', desc: 'Eliges el primer mando y juegas la primera partida sin protestas.', subtitle: 'Prioridad de Control', vibe: 'Gamer', badge: 'PLAYER 1' },
    { id: 'gaming2', category: 'gaming', emoji: '🤫', title: 'Silencio en el Lobby', desc: 'Nadie en casa puede hablarte o pedirte favores en partida clasificatoria (ranked).', subtitle: 'Lobby Silencioso', vibe: 'Gamer', gold: true, badge: 'PASE SUPREMO' },
    { id: 'gaming3', category: 'gaming', emoji: '🥤', title: 'Entrega de Snacks', desc: 'Tu compañero de partida debe traerte agua, refresco o patatas sin interrumpir tu juego.', subtitle: 'Soporte de Snacks', vibe: 'Gamer', badge: 'VIP SNACK' },
    { id: 'gaming4', category: 'gaming', emoji: '🛡️', title: 'Carry Garantizado', desc: 'Tu amigo/pareja debe jugar de soporte y protegerte para ganar la partida.', vibe: 'Gamer', subtitle: 'Carry de Equipo', badge: 'VIP SUPPORT' },
    { id: 'gaming5', category: 'gaming', emoji: '💰', title: 'Vale por Skin', desc: 'Tus compañeros de juego financian tu próxima compra cosmética o Pase de Batalla.', subtitle: 'Finanzas Gaming', vibe: 'Gamer', gold: true, badge: 'VALE REGALO' },
    { id: 'gaming6', category: 'gaming', emoji: '🔌', title: 'Una Partida Más', desc: 'Válido para extender tu sesión de juego por una partida extra de 30 minutos.', subtitle: 'Tiempo Extra', vibe: 'Gamer', badge: 'EXTRA PLAY' },
    { id: 'gaming7', category: 'gaming', emoji: '⚔️', title: 'Elección de Mapa', desc: 'Tú eliges el mapa, modo de juego o personajes en la sesión de hoy.', subtitle: 'Control de Lobby', vibe: 'Gamer', badge: 'HOST CARD' },
    { id: 'gaming8', category: 'gaming', emoji: '🚫', title: 'Sin Espejo', desc: 'Nadie puede decirte cómo jugar o criticar tus jugadas (No Backseat Gaming).', subtitle: 'Silencio Crítico', vibe: 'Gamer', badge: 'FREE PLAY' },
    { id: 'gaming9', category: 'gaming', emoji: '🛌', title: 'Día Libre de Carga', desc: 'Derecho a jugar todo el domingo sin sentir culpa ni tener que hacer tareas domésticas.', subtitle: 'Domingo Gaming', vibe: 'Gamer', badge: 'ALL ACCESS' },
    { id: 'gaming10', category: 'gaming', emoji: '🏆', title: 'Revancha Obligatoria', desc: 'Tu rival está obligado a concederte una revancha inmediata tras haberte ganado.', subtitle: 'Duelo de Honor', vibe: 'Gamer', gold: true, badge: 'PASE SUPREMO' }
];

let activeVibe = 'all';

// ===== RENDERIZAR CATEGORÍAS (VIBES) =====
function renderVibeFilters() {
    const container = document.getElementById('vibeFilters');
    if (!container) return;
    container.innerHTML = categories.map(cat => {
        const isActive = activeVibe === cat.id;
        const activeClasses = isActive 
            ? "bg-primary text-on-primary font-bold shadow-sm" 
            : "bg-surface-container-high text-on-surface-variant border-2 border-outline-variant/30 hover:bg-surface-container-highest transition-colors";
        
        return `
            <button onclick="setVibe('${cat.id}')" class="snap-start shrink-0 px-4 py-2 rounded-full font-label-sm text-label-sm ${activeClasses}">
                ${cat.name}
            </button>
        `;
    }).join('');
}

function setVibe(vibeId) {
    activeVibe = vibeId;
    renderVibeFilters();
    renderPassesFeed();
}

// ===== RENDERIZAR FEED DE PASES =====
function renderPassesFeed() {
    const feed = document.getElementById('passesFeed');
    if (!feed) return;
    const queryInput = document.getElementById('searchInput');
    const query = queryInput ? queryInput.value.toLowerCase().trim() : '';
    
    const filtered = passesData.filter(p => {
        const matchesVibe = activeVibe === 'all' || p.category === activeVibe;
        const matchesQuery = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
        return matchesVibe && matchesQuery;
    });

    if (filtered.length === 0) {
        feed.innerHTML = `
            <div class="text-center py-10 text-on-surface-variant flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-4xl">search_off</span>
                <p class="text-sm font-medium">No se encontraron pases en esta categoría.</p>
            </div>
        `;
        return;
    }

    feed.innerHTML = filtered.map(p => {
        const isGold = p.gold;
        const cardBorderClass = isGold ? 'border-primary shadow-sm shadow-primary/10' : 'border-outline-variant/30';
        const tagColorClass = isGold ? 'bg-primary-fixed text-[#783115]' : 'bg-secondary-container text-[#0a200c]';
        const cardBgClass = isGold ? 'bg-surface-container-high' : 'bg-surface-container-low';
        
        return `
            <article onclick="openEditor('${p.id}')" class="${cardBgClass} rounded-2xl border-2 overflow-hidden flex flex-col soft-shadow hover-lift cursor-pointer active:scale-[0.98] transition-transform ${cardBorderClass}">
                <div class="p-6 pb-2 relative z-10 flex gap-4">
                    <span class="text-4xl flex-shrink-0 filter drop-shadow-md select-none">${p.emoji}</span>
                    <div class="flex flex-col gap-1 pr-6 text-left">
                        <span class="text-[9px] font-caps tracking-widest uppercase font-bold text-on-surface-variant">${p.vibe} Vibe</span>
                        <h3 class="font-headline text-[16px] font-bold text-on-surface leading-tight">${p.title}</h3>
                        <p class="text-xs text-on-surface-variant leading-snug mt-1">${p.desc}</p>
                    </div>
                </div>

                <!-- Perforated Bottom Edge Effect -->
                <div class="relative w-full h-6 mt-auto">
                    <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-r-2 border-outline-variant/30"></div>
                    <div class="border-t-2 border-dashed border-outline-variant/30 w-[calc(100%-48px)] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-l-2 border-outline-variant/30"></div>
                </div>

                <div class="px-6 pb-4 pt-3 flex items-center justify-between relative z-10">
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${tagColorClass}">
                        <span class="material-symbols-outlined text-[12px]">local_fire_department</span>
                        ${isGold ? 'DORADO' : 'POPULAR'}
                    </span>
                    <button class="w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary/95 transition-colors">
                        <span class="material-symbols-outlined text-[16px]">add</span>
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

function filterPasses() {
    renderPassesFeed();
}
