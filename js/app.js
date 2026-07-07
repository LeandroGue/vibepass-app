// ===== AUDIO SINTETIZADO PROCEDURAL (Web Audio API) =====
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClickSound() {
    try {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) { console.warn(e); }
}

function playSuccessSound() {
    try {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const now = audioCtx.currentTime;
        const playNote = (freq, delay, duration) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + delay);
            gain.gain.setValueAtTime(0.06, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.005, now + delay + duration);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + duration);
        };
        
        // Fanfarria feliz
        playNote(523.25, 0, 0.12);      // C5
        playNote(659.25, 0.09, 0.12);    // E5
        playNote(783.99, 0.18, 0.12);    // G5
        playNote(1046.50, 0.27, 0.35);   // C6
    } catch (e) { console.warn(e); }
}

// ===== UTILIDADES =====
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Safe Storage Helper to handle browsers blocking localStorage
const SafeStorage = {
    getItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn("localStorage.getItem blocked:", e);
            return this.fallbackStore[key] || null;
        }
    },
    setItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn("localStorage.setItem blocked:", e);
            this.fallbackStore[key] = value;
        }
    },
    fallbackStore: {}
};

// ===== VARIABLES DE ESTADO LOCAL =====
let navigationHistory = ['home'];

// ===== NAVEGACIÓN Y TOASTS =====
function showScreen(screenId, isBack = false) {
    playClickSound();
    if (!isBack && navigationHistory[navigationHistory.length - 1] !== screenId) {
        navigationHistory.push(screenId);
    }

    // Ocultar pantallas
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const targetScreen = document.getElementById('screen-' + screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.style.display = 'flex';
    }

    if (screenId === 'saved') renderSavedList();
}

function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        const previous = navigationHistory[navigationHistory.length - 1];
        showScreen(previous, true);
    } else {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        if (page === 'ruleta.html') {
            showScreen('roulette', true);
        } else if (page === 'coleccion.html') {
            showScreen('saved', true);
        } else {
            showScreen('home', true);
        }
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = toast.className.replace('opacity-0 pointer-events-none', 'opacity-100 pointer-events-auto');
    setTimeout(() => {
        toast.className = toast.className.replace('opacity-100 pointer-events-auto', 'opacity-0 pointer-events-none');
    }, 3000);
}

function highlightNav() {
    const path = window.location.pathname;
    let page = path.split("/").pop() || 'index.html';
    
    // Si la ruta termina en / vacía, asume index.html
    if (page === '') page = 'index.html';
    
    let activeId = 'navBtn-home';
    if (page === 'ruleta.html') activeId = 'navBtn-roulette';
    else if (page === 'coleccion.html') activeId = 'navBtn-saved';
    
    document.querySelectorAll('nav button').forEach(btn => {
        btn.className = "flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all active:scale-90 transition-transform duration-150";
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    });
    
    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        activeBtn.className = "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 translate-y-[-2px] transition-transform";
        const icon = activeBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    }
}

// ===== ACCIONES: GUARDAR, COMPARTIR, DESCARGAR =====
function savePass(showNotification = true) {
    if (!currentPassData) return;

    let saved = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    
    // Evitar duplicados
    const exists = saved.some(p => p.ticketNumber === currentPassData.ticketNumber);
    if (exists) {
        if (showNotification) showToast('ℹ️ Este pase ya está en tu Colección');
        return;
    }

    const entry = {
        ...currentPassData,
        savedAt: new Date().toISOString(),
        localId: Date.now()
    };
    saved.unshift(entry);
    SafeStorage.setItem('savedPasses', JSON.stringify(saved));
    
    if (showNotification) {
        showToast('💾 ¡Pase guardado en tu Colección!');
    }
}

let isProcessingImg = false;
async function sharePass() {
    const card = document.getElementById('finalPassCardEl');
    if (!card || isProcessingImg) return;

    isProcessingImg = true;
    showToast('📸 Preparando pase para compartir...');

    try {
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2.5,
            useCORS: true,
            logging: false
        });

        const isCapacitor = window.Capacitor && window.Capacitor.isNativePlatform();

        if (isCapacitor) {
            const { Share, Filesystem } = window.Capacitor.Plugins;
            const base64Data = canvas.toDataURL('image/jpeg', 0.9);
            const base64String = base64Data.split(',')[1];
            const fileName = `pase-familiar-${Date.now()}.jpg`;

            // 1. Guardar temporalmente en el caché nativo
            const writeResult = await Filesystem.writeFile({
                path: fileName,
                data: base64String,
                directory: 'CACHE'
            });

            // 2. Compartir usando el diálogo nativo de Android
            await Share.share({
                title: '¡Mira mi Pase Familiar Oficial!',
                text: `He generado el pase: ${currentPassData.title}`,
                url: writeResult.uri,
                dialogTitle: 'Compartir Pase Familiar'
            });
            isProcessingImg = false;
        } else {
            // Web estándar
            canvas.toBlob(async (blob) => {
                const file = new File([blob], 'pase-familiar.jpg', { type: 'image/jpeg' });
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: '¡Mira mi Pase Familiar Oficial!',
                        text: `He generado el pase: ${currentPassData.title}`
                    });
                } else {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `pase-familiar-${currentPassData.name.toLowerCase().replace(/\s/g, '-')}.jpg`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('✅ Descargado en tu galería (Compartido no compatible)');
                }
                isProcessingImg = false;
            }, 'image/jpeg', 0.9);
        }
    } catch (e) {
        console.error(e);
        showToast('❌ Error al procesar imagen');
        isProcessingImg = false;
    }
}

async function downloadPass() {
    const card = document.getElementById('finalPassCardEl');
    if (!card || isProcessingImg) return;

    isProcessingImg = true;
    showToast('📸 Renderizando captura del ticket...');

    try {
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 3,
            useCORS: true,
            logging: false
        });

        const isCapacitor = window.Capacitor && window.Capacitor.isNativePlatform();

        if (isCapacitor) {
            const { Filesystem } = window.Capacitor.Plugins;
            const base64Data = canvas.toDataURL('image/jpeg', 0.9);
            const base64String = base64Data.split(',')[1];
            const fileName = `PaseFamiliar_${Date.now()}.jpg`;

            try {
                // Verificar permisos antes de escribir en almacenamiento público
                const status = await Filesystem.checkPermissions();
                if (status.publicStorage !== 'granted') {
                    await Filesystem.requestPermissions();
                }

                // Guardar en la carpeta pública "Download"
                await Filesystem.writeFile({
                    path: 'Download/' + fileName,
                    data: base64String,
                    directory: 'EXTERNAL_STORAGE'
                });
                showToast(`✅ Guardado en Descargas / ${fileName}`);
            } catch (err) {
                // Caer de espaldas a DOCUMENTS si falla
                await Filesystem.writeFile({
                    path: fileName,
                    data: base64String,
                    directory: 'DOCUMENTS'
                });
                showToast(`✅ Guardado en Documentos / ${fileName}`);
            }
            isProcessingImg = false;
        } else {
            // Web estándar
            const link = document.createElement('a');
            link.download = `pase-familiar-${currentPassData.name.toLowerCase().replace(/\s/g, '-')}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
            showToast('✅ Pase guardado en descargas');
            isProcessingImg = false;
        }
    } catch (e) {
        console.error(e);
        showToast('❌ Fallo al descargar imagen');
        isProcessingImg = false;
    }
}

// ===== BIBLIOTECA (HISTORIAL GUARDADOS) =====
function renderSavedList() {
    const container = document.getElementById('savedContainer');
    if (!container) return;
    const saved = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');

    if (saved.length === 0) {
        container.innerHTML = `
            <div class="bg-surface-container rounded-2xl p-8 text-center text-on-surface-variant flex flex-col items-center gap-3 border border-outline-variant/30">
                <span class="material-symbols-outlined text-5xl text-outline">style</span>
                <div>
                    <p class="text-sm font-bold text-on-surface">No tienes pases guardados</p>
                    <p class="text-xs text-on-surface-variant mt-1">Tus pases guardados aparecerán en este historial.</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = saved.map(p => `
        <div onclick="viewSavedPass(${p.localId})" class="bg-surface-container rounded-xl overflow-hidden cursor-pointer flex justify-between items-center p-4 border border-outline-variant/30 hover:border-primary/50 transition-all">
            <div class="flex items-center gap-3">
                <span class="text-3xl">${p.emoji}</span>
                <div class="flex flex-col text-left">
                    <h4 class="text-sm font-bold text-on-surface leading-tight">Para: ${escapeHtml(p.name)}</h4>
                    <span class="text-xs text-on-surface-variant mt-0.5 font-medium line-clamp-1">${p.title}</span>
                    <span class="text-[9px] font-caps tracking-wider text-primary font-bold uppercase mt-1">EMITIDO: ${p.dateStr}</span>
                </div>
            </div>
            <div class="flex items-center gap-1.5" onclick="event.stopPropagation()">
                <button onclick="shareSavedPass(${p.localId})" class="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container-high active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">share</span>
                </button>
                <button onclick="deleteSavedPass(${p.localId})" class="p-2 text-red-700 hover:text-red-500 rounded-full hover:bg-surface-container-high active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

function viewSavedPass(localId) {
    const saved = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    const pass = saved.find(p => p.localId === localId);
    if (!pass) return;

    currentPassData = pass;
    renderFinalPassCard(pass);
    showScreen('result');
}

function deleteSavedPass(localId) {
    playClickSound();
    let saved = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    saved = saved.filter(p => p.localId !== localId);
    SafeStorage.setItem('savedPasses', JSON.stringify(saved));
    renderSavedList();
    showToast('🗑️ Pase eliminado');
}

async function shareSavedPass(localId) {
    const saved = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    const pass = saved.find(p => p.localId === localId);
    if (!pass) return;

    currentPassData = pass;
    await renderFinalPassCard(pass);
    sharePass();
}

// ===== INICIALIZACIÓN =====
function initializeApp() {
    const path = window.location.pathname;
    let page = path.split("/").pop() || 'index.html';
    if (page === '') page = 'index.html';
    
    let defaultScreen = 'home';
    if (page === 'ruleta.html') defaultScreen = 'roulette';
    else if (page === 'coleccion.html') defaultScreen = 'saved';
    
    navigationHistory = [defaultScreen];
    showScreen(defaultScreen, true);

    if (typeof renderVibeFilters === 'function') renderVibeFilters();
    if (typeof renderPassesFeed === 'function') renderPassesFeed();
    if (typeof renderSavedList === 'function') renderSavedList();
    if (typeof renderRouletteWheel === 'function') renderRouletteWheel();
    highlightNav();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeApp();
} else {
    window.addEventListener('load', initializeApp);
}

// ===== REGISTRO DEL SERVICE WORKER (OFFLINE PWA) =====
function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('Service Worker registrado correctamente.', reg);
                
                // Recargar automáticamente cuando haya una actualización activa
                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('Nueva actualización del Service Worker encontrada. Recargando...');
                                    showToast('🔄 Nueva versión disponible, actualizando...');
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                }
                            }
                        };
                    }
                };
            })
            .catch(err => console.error('Fallo al registrar Service Worker:', err));
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    registerSW();
} else {
    window.addEventListener('load', registerSW);
}
