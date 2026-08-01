console.log("VibePass: app.js optimizado v1.9.0");

async function initializeAdMob() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) return;
    const { AdMob } = window.Capacitor.Plugins;
    try {
        await AdMob.initialize();
        await AdMob.showBanner({
            adId: 'ca-app-pub-5000128967472607/4407713514',
            adSize: 'ADAPTIVE_BANNER',
            position: 'BOTTOM_CENTER',
            margin: 0,
            isTesting: false
        });
    } catch (e) { console.error("AdMob Init Error:", e); }
}

async function showInterstitialAd() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) return;

    // Control de frecuencia: 1 cada 3 pases, saltando el primero.
    let count = parseInt(SafeStorage.getItem('interstitial_counter') || '0');
    count++;
    SafeStorage.setItem('interstitial_counter', count.toString());

    // Si es el primero, no mostrar. Luego, mostrar cada 3.
    if (count === 1) {
        console.log("VibePass: Primer pase, saltando anuncio.");
        return;
    }

    if (count % 3 !== 0) {
        console.log("VibePass: Frecuencia de anuncio no alcanzada (" + count + ")");
        return;
    }

    const { AdMob } = window.Capacitor.Plugins;
    try {
        console.log("VibePass: Mostrando anuncio intersticial...");
        await AdMob.prepareInterstitial({
            adId: 'ca-app-pub-5000128967472607/7642427112',
            isTesting: false
        });
        await AdMob.showInterstitial();
    } catch (e) { console.error("AdMob Interstitial Error:", e); }
}

// --- AUDIO SYSTEM ---
let audioCtx = null;
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
function playClickSound() { try { initAudio(); if (audioCtx.state === 'suspended') audioCtx.resume(); const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(320, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08); gain.gain.setValueAtTime(0.08, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08); osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.08); } catch (e) {} }
function playSuccessSound() { try { initAudio(); if (audioCtx.state === 'suspended') audioCtx.resume(); const now = audioCtx.currentTime; const p = (f, d, du) => { const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(f, now + d); g.gain.setValueAtTime(0.06, now + d); g.gain.exponentialRampToValueAtTime(0.005, now + d + du); o.connect(g); g.connect(audioCtx.destination); o.start(now + d); o.stop(now + d + du); }; p(523.25, 0, 0.12); p(659.25, 0.09, 0.12); p(783.99, 0.18, 0.12); p(1046.50, 0.27, 0.35); } catch (e) {} }

// --- UTILS ---
function escapeHtml(str) { if (!str) return ''; const div = document.createElement('div'); div.appendChild(document.createTextNode(str)); return div.innerHTML; }

const SafeStorage = {
    getItem(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    setItem(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
};

function logError(context, err) {
    console.error(`[VibePass Error] ${context}:`, err);
    let logs = JSON.parse(SafeStorage.getItem('app_logs') || '[]');
    logs.push({ t: new Date().toISOString(), c: context, m: err.message || err.toString() });
    if (logs.length > 10) logs.shift();
    SafeStorage.setItem('app_logs', JSON.stringify(logs));
}

function showDebugLogs() {
    const logs = JSON.parse(SafeStorage.getItem('app_logs') || '[]');
    if (logs.length === 0) { alert("App OK: No hay errores."); return; }
    alert("LOGS:\n" + logs.map(l => `[${l.c}] ${l.m}`).join('\n'));
}

// --- NAVIGATION ---
const _pageToScreen = { 'index.html': 'home', 'ruleta.html': 'roulette', 'coleccion.html': 'saved', 'ayuda.html': 'help' };
const _currentPage = (window.location.pathname.split("/").pop() || 'index.html');
let navigationHistory = [_pageToScreen[_currentPage] || 'home'];

function showScreen(id, isBack = false) {
    if (typeof playClickSound === 'function') playClickSound();
    if (!isBack && navigationHistory[navigationHistory.length - 1] !== id) navigationHistory.push(id);
    document.querySelectorAll('.screen').forEach(s => { s.classList.add('hidden'); s.classList.remove('active'); s.style.display = 'none'; });
    const target = document.getElementById('screen-' + id);
    if (target) { target.classList.remove('hidden'); target.classList.add('active'); target.style.display = 'flex'; }
    if (id === 'saved') renderSavedList();
    if (id === 'roulette' && typeof renderRouletteWheel === 'function') renderRouletteWheel();
}

function goBack() {
    if (navigationHistory.length > 1) { navigationHistory.pop(); showScreen(navigationHistory[navigationHistory.length - 1], true); }
    else { window.location.href = 'index.html'; }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg; t.style.opacity = '1'; t.style.pointerEvents = 'auto';
    setTimeout(() => { t.style.opacity = '0'; t.style.pointerEvents = 'none'; }, 3000);
}

function highlightNav() {
    const p = window.location.pathname.split("/").pop() || 'index.html';
    const mapping = { 'index.html': 'navBtn-home', 'ruleta.html': 'navBtn-roulette', 'coleccion.html': 'navBtn-saved', 'ayuda.html': 'navBtn-help' };
    const actId = mapping[p] || 'navBtn-home';
    document.querySelectorAll('nav button').forEach(b => {
        b.className = "flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all active:scale-90";
        const i = b.querySelector('.material-symbols-outlined'); if (i) i.style.fontVariationSettings = "'FILL' 0";
    });
    const ab = document.getElementById(actId);
    if (ab) {
        ab.className = "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 translate-y-[-2px]";
        const i = ab.querySelector('.material-symbols-outlined'); if (i) i.style.fontVariationSettings = "'FILL' 1";
    }
}

// --- SCANNER SYSTEM ---
async function startScanning() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
        showToast("⚠️ Escáner solo disponible en el móvil");
        return;
    }

    try {
        const { BarcodeScanner } = window.Capacitor.Plugins;

        // 1. Verificar si el motor de Google está listo (necesario en versión Play Store)
        const moduleStatus = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        if (!moduleStatus.available) {
            showToast("⏳ Preparando motor de escaneo...");
            await BarcodeScanner.installGoogleBarcodeScannerModule();
            // Esperar un poco a que se instale
            showToast("✅ Motor listo. Pulsa de nuevo.");
            return;
        }

        // 2. Verificar permisos de cámara
        const status = await BarcodeScanner.checkPermissions();
        if (status.camera !== 'granted') {
            const request = await BarcodeScanner.requestPermissions();
            if (request.camera !== 'granted') {
                showToast("🚫 Necesitamos permiso de cámara para escanear");
                return;
            }
        }

        // 3. Iniciar escaneo
        showToast("📷 Escaneando código QR...");
        const result = await BarcodeScanner.scan();

        if (result.barcodes.length > 0) {
            const code = result.barcodes[0].displayValue;
            handleScannedCode(code);
        }
    } catch (e) {
        logError('scanner', e);
        showToast("❌ Error al abrir cámara");
    }
}

function handleScannedCode(url) {
    console.log("VibePass: Procesando código:", url);
    try {
        const urlObj = new URL(url);
        const ticketId = urlObj.searchParams.get('id');

        if (!ticketId) {
            showToast("🚫 Código no reconocido");
            return;
        }

        // Buscar en nuestra colección local
        let passes = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
        const index = passes.findIndex(p => p.ticketNumber === ticketId);

        if (index === -1) {
            showToast("❓ Este pase no te pertenece");
            return;
        }

        if (passes[index].status === 'used') {
            playClickSound();
            alert("⚠️ ¡AVISO CRÍTICO!\n\nEste pase YA HA SIDO CANJEADO anteriormente.\n\nFecha de canje registrada en el sistema.");
            return;
        }

        // Validar con éxito
        passes[index].status = 'used';
        passes[index].usedAt = new Date().toISOString();
        SafeStorage.setItem('savedPasses', JSON.stringify(passes));

        playSuccessSound();
        alert(`🎉 ¡ÉXITO! PASE VALIDADO\n\nTicket: #${ticketId}\nEl favor ha sido activado correctamente.`);

        if (window.location.pathname.includes('coleccion.html')) renderSavedList();

    } catch (e) {
        showToast("🚫 QR Inválido");
    }
}

// --- CORE ACTIONS ---
function savePass(notify = true) {
    if (!currentPassData) return;
    let s = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    if (s.some(p => p.ticketNumber === currentPassData.ticketNumber)) return;
    s.unshift({ ...currentPassData, savedAt: new Date().toISOString(), localId: Date.now() });
    SafeStorage.setItem('savedPasses', JSON.stringify(s));
    if (notify) showToast('💾 ¡Pase guardado!');
}

let isProcessingImg = false;
async function captureAndAction(mode) {
    const card = document.getElementById('finalPassCardEl');
    if (!card || isProcessingImg) return;
    isProcessingImg = true;
    showToast(mode === 'share' ? '📸 Preparando...' : '📸 Descargando...');
    try {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed; left:-5000px; top:0; padding:100px; background-color:#fdf9ee; display:inline-block; width:540px;';
        const clone = card.cloneNode(true);
        clone.style.display = 'flex'; clone.style.boxShadow = 'none'; clone.style.transform = 'none'; clone.style.width = '340px';
        clone.style.margin = '0 auto';
        clone.style.overflow = 'visible';
        const originalCanvas = card.querySelector('canvas');
        const cloneCanvas = clone.querySelector('canvas');
        if (originalCanvas && cloneCanvas) {
            cloneCanvas.width = originalCanvas.width; cloneCanvas.height = originalCanvas.height;
            cloneCanvas.getContext('2d').drawImage(originalCanvas, 0, 0);
        }
        wrap.appendChild(clone); document.body.appendChild(wrap);
        await new Promise(r => setTimeout(r, 400));
        const canv = await html2canvas(wrap, {
            backgroundColor: '#fdf9ee',
            scale: 3,
            useCORS: true,
            logging: false,
            allowTaint: true
        });
        document.body.removeChild(wrap);
        const data = canv.toDataURL('image/jpeg', 0.9);
        if (window.Capacitor && window.Capacitor.isNativePlatform()) {
            const { Share, Filesystem } = window.Capacitor.Plugins;
            if (mode === 'share') {
                const res = await Filesystem.writeFile({ path: 'vibepass-' + Date.now() + '.jpg', data: data.split(',')[1], directory: 'CACHE' });
                await Share.share({ title: '¡Mira mi VibePass!', url: res.uri });
            } else {
                await Filesystem.writeFile({ path: 'Download/VibePass_' + Date.now() + '.jpg', data: data.split(',')[1], directory: 'EXTERNAL_STORAGE' });
                showToast('✅ Guardado');
            }
        } else {
            const l = document.createElement('a'); l.download = 'vibepass.jpg'; l.href = data; l.click();
        }
    } catch (e) { logError(mode, e); showToast('❌ Error'); } finally { isProcessingImg = false; }
}

function sharePass() { captureAndAction('share'); }
function downloadPass() { captureAndAction('download'); }

async function shareAsSticker() {
    if (isProcessingImg || !currentPassData) return; isProcessingImg = true; showToast('✨ Creando...');
    const s = document.createElement('div');
    s.style.cssText = 'position:fixed; left:-9999px; top:-9999px; width:512px; height:512px; background:white; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; border-radius:80px; border:12px solid #97472a; text-align:center;';
    s.innerHTML = '<div style="font-size:140px; margin-bottom:20px;">' + currentPassData.emoji + '</div><div style="font-size:42px; font-weight:800; color:#97472a; text-transform:uppercase; font-family:sans-serif;">' + currentPassData.title + '</div>';
    document.body.appendChild(s);
    try {
        const canv = await html2canvas(s, { backgroundColor: null, width: 512, height: 512, scale: 1 });
        const data = canv.toDataURL('image/webp', 0.8);
        if (window.Capacitor && window.Capacitor.isNativePlatform()) {
            const { Share, Filesystem } = window.Capacitor.Plugins;
            const res = await Filesystem.writeFile({ path: 'sticker-' + Date.now() + '.webp', data: data.split(',')[1], directory: 'CACHE' });
            await Share.share({ title: 'Mi Sticker', url: res.uri });
        }
    } catch (e) { logError('sticker', e); } finally { isProcessingImg = false; if(s.parentNode) document.body.removeChild(s); }
}

function renderSavedList() {
    const c = document.getElementById('savedContainer'); if (!c) return;
    const s = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    if (s.length === 0) { c.innerHTML = '<div class="text-center py-20 opacity-30 flex flex-col items-center"><span class="material-symbols-outlined text-6xl">style</span><p class="font-bold mt-2">No hay pases guardados</p></div>'; return; }
    c.innerHTML = s.map(p => {
        const isUsed = p.status === 'used';
        return '<div onclick="viewSavedPass(' + p.localId + ')" class="bg-white rounded-2xl p-4 mb-3 flex justify-between items-center border border-outline-variant/30 shadow-sm active:scale-[0.98] transition-all ' + (isUsed ? 'opacity-60 grayscale-[0.5]' : '') + '">' +
            '<div class="flex items-center gap-3">' +
                '<span class="text-3xl">' + p.emoji + '</span>' +
                '<div class="flex flex-col text-left">' +
                    '<span class="text-xs font-bold text-primary uppercase tracking-widest">' + p.vibe + '</span>' +
                    '<span class="font-bold text-on-surface">Para: ' + p.name + ' ' + (isUsed ? '(CANJEADO)' : '') + '</span>' +
                '</div>' +
            '</div>' +
            '<button onclick="event.stopPropagation(); deleteSavedPass(' + p.localId + ')" class="text-red-500 p-2"><span class="material-symbols-outlined">delete</span></button>' +
        '</div>';
    }).join('');
}

function viewSavedPass(id) {
    const s = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    const p = s.find(x => x.localId === id);
    if (p) { currentPassData = p; renderFinalPassCard(p); showScreen('result'); }
}

function deleteSavedPass(id) {
    if(!confirm("¿Eliminar este pase?")) return;
    let s = JSON.parse(SafeStorage.getItem('savedPasses') || '[]');
    s = s.filter(x => x.localId !== id);
    SafeStorage.setItem('savedPasses', JSON.stringify(s));
    renderSavedList(); showToast('🗑️ Eliminado');
}

// --- INITIALIZATION ---
let debugTapCount = 0;
let debugTapTimeout = null;
function handleDebugTap() {
    debugTapCount++; clearTimeout(debugTapTimeout);
    if (debugTapCount >= 5) { debugTapCount = 0; showDebugLogs(); }
    else { debugTapTimeout = setTimeout(() => { debugTapCount = 0; }, 2000); }
}

function forceUpdate() {
    showToast('🔄 Sincronizando...');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => { for (let r of regs) r.unregister(); setTimeout(() => location.reload(true), 500); });
    } else setTimeout(() => location.reload(true), 500);
}

function initializeApp() {
    console.log("VibePass: Inicializando...");
    initializeAdMob();
    if (typeof renderVibeFilters === 'function') renderVibeFilters();
    if (typeof renderPassesFeed === 'function') renderPassesFeed();
    if (typeof renderSavedList === 'function') renderSavedList();
    if (typeof renderRouletteWheel === 'function') renderRouletteWheel();
    highlightNav();

    const splash = document.getElementById('app-splash');
    const hasSeenSplash = sessionStorage.getItem('vibe_splash_seen');
    const isCompleteOnboarding = localStorage.getItem('vibe_onboarding_v182_done');

    const p = window.location.pathname.split("/").pop() || 'index.html';
    const isEntryPage = (p === 'index.html' || p === '');

    if (!isCompleteOnboarding && isEntryPage && typeof showOnboarding === 'function') {
        showOnboarding();
    }

    if (splash) {
        if (hasSeenSplash) {
            splash.remove();
            document.body.classList.add('content-ready');
        } else {
            setTimeout(() => {
                splash.classList.add('splash-hidden');
                document.body.classList.add('content-ready');
                sessionStorage.setItem('vibe_splash_seen', 'true');
                setTimeout(() => { splash.remove(); }, 800);
            }, 1800);
        }
    } else {
        document.body.classList.add('content-ready');
    }

    // Service Worker solo en web (en Android lo gestiona Capacitor)
    if ('serviceWorker' in navigator && (!window.Capacitor || !window.Capacitor.isNativePlatform())) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') initializeApp();
else window.addEventListener('load', initializeApp);
