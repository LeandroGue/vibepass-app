let currentPassTemplate = null;
let currentNeonTheme = 'orange';
let currentStickers = [];
let currentPassData = null;

// ===== EDITOR DE PASES (STUDIO) =====
function openEditor(passId) {
    // Buscar en passesData (feed) o fallback a pases generados de ruleta
    currentPassTemplate = passesData.find(p => p.id === passId);
    if (!currentPassTemplate) {
        // Buscar en la ruleta
        const roulTemplate = roulettePassesData.find(p => p.id === passId);
        if (roulTemplate) {
            currentPassTemplate = {
                id: roulTemplate.id,
                category: 'casa',
                emoji: roulTemplate.emoji,
                title: roulTemplate.title,
                desc: 'Vale por un favor sorpresa.',
                subtitle: 'Favor de la Ruleta',
                vibe: 'Especial',
                badge: 'FAVOR SORPRESA'
            };
        }
    }
    if (!currentPassTemplate) return;

    // Resetear estados
    currentStickers = [];
    currentNeonTheme = currentPassTemplate.gold ? 'gold' : 'orange';
    document.getElementById('inputName').value = '';
    document.getElementById('inputSender').value = '';
    document.getElementById('inputMessage').value = '';
    const expiryInput = document.getElementById('inputExpiry');
    if (expiryInput) expiryInput.value = '';
    const expiryPreview = document.getElementById('previewExpiryText');
    if (expiryPreview) expiryPreview.textContent = 'CUALQUIER DÍA';

    // Cargar datos en la UI del editor
    document.getElementById('previewPassTitle').textContent = currentPassTemplate.title;
    document.getElementById('previewVibeText').textContent = currentPassTemplate.vibe ? currentPassTemplate.vibe.toUpperCase() : 'ESPECIAL';
    document.getElementById('editorCardHeaderLabel').textContent = currentPassTemplate.badge || 'PASE ESPECIAL';
    document.getElementById('passBadgeLabel').textContent = currentPassTemplate.gold ? 'PASE SUPREMO' : 'AUTORIZADO PARA';

    // Actualizar stickers y estilos
    updateStickersLayer();
    selectNeonTheme(currentNeonTheme);
    switchEditorTab('text');
    showScreen('generator');
}

function updatePreviewExpiry() {
    const input = document.getElementById('inputExpiry');
    const preview = document.getElementById('previewExpiryText');
    if (!input || !preview) return;
    
    if (input.value) {
        const date = new Date(input.value + 'T00:00:00');
        const formatted = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).toUpperCase();
        preview.textContent = 'HASTA: ' + formatted;
    } else {
        preview.textContent = 'CUALQUIER DÍA';
    }
}

function switchEditorTab(tabName) {
    playClickSound();
    const tabs = ['text', 'color', 'stickers'];
    tabs.forEach(tab => {
        const tabEl = document.getElementById('editorTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
        if (tabEl) {
            tabEl.classList.add('hidden');
            tabEl.classList.remove('flex');
        }
        const btn = document.getElementById('tabBtn' + tab.charAt(0).toUpperCase() + tab.slice(1));
        if (btn) {
            btn.className = "flex-1 pb-2 font-caps text-xs font-bold text-on-surface-variant hover:text-on-surface text-center transition-colors border-b-2 border-transparent";
        }
    });

    const activeTabEl = document.getElementById('editorTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (activeTabEl) {
        activeTabEl.classList.remove('hidden');
        activeTabEl.classList.add('flex');
    }
    const activeBtn = document.getElementById('tabBtn' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (activeBtn) {
        activeBtn.className = "flex-1 pb-2 font-caps text-xs font-bold text-primary border-b-2 border-primary text-center transition-colors";
    }
}

function selectNeonTheme(theme) {
    currentNeonTheme = theme;
    const header = document.getElementById('editorCardHeader');
    const headerLabel = document.getElementById('editorCardHeaderLabel');
    const headerIcon = header ? header.querySelector('.material-symbols-outlined') : null;
    const avatarBorder = document.getElementById('avatarContainer');
    const authorizationLabel = document.getElementById('passBadgeLabel');

    if (!header || !headerLabel) return;

    // Theme color configs
    const themes = {
        orange: { headerBg: '#ff9a76', headerText: '#380c00', avatarBorder: '#ff9a76', labelColor: '#97472a' },
        green:  { headerBg: '#ceeaca', headerText: '#0a200c', avatarBorder: '#ceeaca', labelColor: '#4c644b' },
        blue:   { headerBg: '#8cbbcd', headerText: '#001f28', avatarBorder: '#8cbbcd', labelColor: '#356574' },
        gold:   { headerBg: '#ffdbcf', headerText: '#783115', avatarBorder: '#ffdbcf', labelColor: '#97472a' }
    };

    const t = themes[theme] || themes.orange;

    // Apply styles
    header.style.backgroundColor = t.headerBg;
    headerLabel.style.color = t.headerText;
    if (headerIcon) headerIcon.style.color = t.headerText;
    if (avatarBorder) avatarBorder.style.borderColor = t.avatarBorder;
    if (authorizationLabel) authorizationLabel.style.color = t.labelColor;
}

function toggleSticker(emoji) {
    playClickSound();
    const index = currentStickers.indexOf(emoji);
    if (index >= 0) {
        currentStickers.splice(index, 1);
    } else {
        if (currentStickers.length < 4) {
            currentStickers.push(emoji);
        } else {
            showToast('⚠️ Máximo 4 stickers por pase');
        }
    }
    updateStickersLayer();
}

function clearStickers() {
    playClickSound();
    currentStickers = [];
    updateStickersLayer();
}

function updateStickersLayer() {
    const container = document.getElementById('cardStickersContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const positions = [
        { top: '8%', left: '5%', rotate: '-12deg' },
        { top: '15%', right: '8%', rotate: '15deg' },
        { bottom: '25%', left: '10%', rotate: '-8deg' },
        { bottom: '28%', right: '12%', rotate: '20deg' }
    ];

    currentStickers.forEach((emoji, idx) => {
        const pos = positions[idx % positions.length];
        const el = document.createElement('div');
        el.textContent = emoji;
        el.style.position = 'absolute';
        el.style.top = pos.top || 'auto';
        el.style.bottom = pos.bottom || 'auto';
        el.style.left = pos.left || 'auto';
        el.style.right = pos.right || 'auto';
        el.style.transform = `rotate(${pos.rotate})`;
        el.className = "text-3xl filter drop-shadow-md z-30 transition-all select-none";
        container.appendChild(el);
    });
}

// ===== GENERAR PASE FINAL =====
function generatePass() {
    const name = document.getElementById('inputName').value.trim();
    const sender = document.getElementById('inputSender').value.trim();
    const message = document.getElementById('inputMessage').value.trim();

    if (!name) {
        showToast('✍️ Por favor, escribe a quién va dirigido el pase');
        document.getElementById('inputName').focus();
        return;
    }

    const passId = 'PV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const today = new Date();
    const expiryInput = document.getElementById('inputExpiry');
    let expiryStr = 'CUALQUIER DÍA';
    if (expiryInput && expiryInput.value) {
        const date = new Date(expiryInput.value + 'T00:00:00');
        expiryStr = 'HASTA: ' + date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    }
    const dateStr = today.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

    const isGold = currentPassTemplate.gold;

    let issuerSignature = 'CONSEJO FAMILIAR';
    if (currentPassTemplate.category === 'casa') issuerSignature = 'COMITÉ DEL HOGAR';
    if (currentPassTemplate.category === 'trabajo') issuerSignature = 'RECURSOS MENTALES';
    if (currentPassTemplate.category === 'gym') issuerSignature = 'SINDICATO FITNESS';
    if (currentPassTemplate.category === 'pareja') issuerSignature = 'MINISTERIO DEL AMOR';
    if (currentPassTemplate.category === 'amigos') issuerSignature = 'LA BANDA OFICIAL';
    if (currentPassTemplate.category === 'escuela') issuerSignature = 'SOCIOS DEL RECREO';

    currentPassData = {
        ...currentPassTemplate,
        name: name,
        sender: sender || 'Alguien que te quiere',
        message: message || currentPassTemplate.desc,
        theme: currentNeonTheme,
        stickers: [...currentStickers],
        ticketNumber: passId,
        dateStr: dateStr,
        expiryStr: expiryStr,
        issuerSignature: issuerSignature
    };

    // Auto-guardar silenciosamente al generar
    savePass(false);

    renderFinalPassCard(currentPassData);
    showScreen('result');
    playSuccessSound();
}

async function renderFinalPassCard(data) {
    const preview = document.getElementById('passPreview');
    if (!preview) return;
    const isGold = data.gold;

    // Determinar colores de cabecera
    let headerBgColor = 'bg-[#ff9a76]';
    let headerTextColor = 'text-[#380c00]';
    let labelBadgeColor = 'bg-tertiary-container text-on-tertiary-container';

    if (data.theme === 'green') {
        headerBgColor = 'bg-[#ceeaca]';
        headerTextColor = 'text-[#0a200c]';
        labelBadgeColor = 'bg-secondary-container text-on-secondary-container';
    } else if (data.theme === 'blue') {
        headerBgColor = 'bg-[#8cbbcd]';
        headerTextColor = 'text-[#001f28]';
        labelBadgeColor = 'bg-[#baeafc] text-[#001f28]';
    } else if (data.theme === 'gold' || isGold) {
        headerBgColor = 'bg-[#ffdbcf]';
        headerTextColor = 'text-[#783115]';
        labelBadgeColor = 'bg-[#ffdbcf] text-[#783115] border border-primary/20';
    }

    const goldBgClass = isGold ? 'bg-gradient-to-b from-white to-[#ffdbcf] border-primary gold-hologram' : 'bg-surface-container-lowest border-outline-variant';

    preview.innerHTML = `
        <div id="finalPassCardEl" class="w-full max-w-[340px] rounded-xl border-2 overflow-hidden flex flex-col relative shadow-[0_24px_48px_-12px_rgba(151,71,42,0.08)] transition-all duration-300 ${goldBgClass}">
            
            <!-- Sección Superior del Ticket -->
            <div class="p-5 ticket-cutout pb-8 border-b-2 border-outline-variant/50 relative bg-gradient-to-b from-surface-container-lowest to-surface-container-low">
                
                <!-- Stickers -->
                <div class="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    ${data.stickers.map((emoji, idx) => {
                        const positions = [
                            { top: '8%', left: '5%', rotate: '-12deg' },
                            { top: '15%', right: '8%', rotate: '15deg' },
                            { bottom: '25%', left: '10%', rotate: '-8deg' },
                            { bottom: '28%', right: '12%', rotate: '20deg' }
                        ];
                        const pos = positions[idx % positions.length];
                        return `<div class="text-3xl filter drop-shadow-md absolute select-none z-30" style="top:${pos.top || 'auto'}; bottom:${pos.bottom || 'auto'}; left:${pos.left || 'auto'}; right:${pos.right || 'auto'}; transform:rotate(${pos.rotate});">${emoji}</div>`;
                    }).join('')}
                </div>

                <!-- Cabecera -->
                <div class="flex justify-between items-start mb-6 relative z-10">
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full ${labelBadgeColor}">
                        <span class="material-symbols-outlined text-[13px]">${data.category === 'casa' ? 'restaurant' : 'style'}</span>
                        <span class="font-label-sm text-[11px] font-bold">${data.vibe}</span>
                    </span>
                    <span class="font-label-sm text-xs text-outline font-bold">#${data.ticketNumber}</span>
                </div>

                <!-- Título y emoji principal -->
                <div class="text-center space-y-3 relative z-10">
                    <span class="text-5xl block select-none filter drop-shadow-sm">${data.emoji}</span>
                    <h2 class="font-headline text-[22px] font-bold text-primary tracking-tight uppercase leading-tight px-2">${data.title}</h2>
                    <p class="font-body-md text-sm text-on-surface-variant max-w-[85%] mx-auto leading-relaxed">
                        ${escapeHtml(data.message)}
                    </p>
                </div>

                <!-- Sello de Autorizado -->
                <div class="absolute right-4 bottom-4 stamp-animation z-20 pointer-events-none">
                    <div class="border-4 border-error text-error rounded-lg px-3 py-1 inline-flex items-center gap-1 font-bold text-sm transform rotate-[-15deg] bg-surface-container-lowest/40 backdrop-blur-sm">
                        <span class="material-symbols-outlined text-sm">favorite</span>
                        AUTORIZADO
                    </div>
                </div>
            </div>

            <!-- Sección Inferior del Ticket -->
            <div class="p-5 bg-surface-container-low flex flex-col gap-4 relative">
                <div class="perforated-line"></div>

                <!-- Detalles rápidos (Fecha y Vibe) -->
                <div class="grid grid-cols-2 gap-2 mt-1 z-10">
                    <div class="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/30 text-left">
                        <span class="font-caps text-[8px] text-on-surface-variant block uppercase font-bold tracking-wider mb-0.5">FECHA</span>
                        <span class="text-xs text-on-surface font-bold">${escapeHtml(data.expiryStr)}</span>
                    </div>
                    <div class="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/30 text-left">
                        <span class="font-caps text-[8px] text-on-surface-variant block uppercase font-bold tracking-wider mb-0.5">VIBE</span>
                        <span class="text-xs text-on-surface font-bold">${escapeHtml(data.vibe.toUpperCase())}</span>
                    </div>
                </div>

                <!-- Titulares -->
                <div class="flex justify-between items-center px-2 pt-2 text-left">
                    <div>
                        <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider font-bold mb-0.5">Para</p>
                        <p class="font-headline text-sm font-bold text-on-surface uppercase">${escapeHtml(data.name)}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider font-bold mb-0.5">De</p>
                        <p class="font-headline text-sm font-bold text-on-surface uppercase">${escapeHtml(data.sender)}</p>
                    </div>
                </div>

                <!-- QR Code y Barcode -->
                <div class="flex flex-col items-center gap-3">
                    <div class="bg-white p-2 rounded-xl border border-outline-variant/30 w-28 h-28 flex items-center justify-center relative">
                        <canvas id="finalQrCanvas"></canvas>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="font-caps text-[8px] text-outline tracking-[0.25em] font-bold">EMITIDO POR: ${data.issuerSignature}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Generar QR Code real
    try {
        const qrPayload = JSON.stringify({
            tkt: data.ticketNumber,
            titular: data.name,
            emisor: data.sender,
            pase: data.title
        });
        await QRCode.toCanvas(window.document.getElementById('finalQrCanvas'), qrPayload, {
            width: 96,
            margin: 0,
            color: { dark: '#1c1c15', light: '#FFFFFF' }
        });
    } catch (e) { console.error(e); }
}
