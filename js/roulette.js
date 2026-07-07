// ===== DATOS ESPECÍFICOS DE LA RULETA DE FAVORES =====
const roulettePassesData = [
    { id: 'roul1', emoji: '🍳', title: 'Desayuno en la Cama' },
    { id: 'roul2', emoji: '🛏️', title: 'Dormir hasta tarde' },
    { id: 'roul3', emoji: '🧺', title: 'Evadir limpieza hoy' },
    { id: 'roul4', emoji: '🧽', title: 'No lavar platos' },
    { id: 'roul5', emoji: '👵', title: 'Excusa de la Abuela' },
    { id: 'roul6', emoji: '🎮', title: 'Gaming ininterrumpido' },
    { id: 'roul7', emoji: '🍿', title: 'Control del Mando' },
    { id: 'roul8', emoji: '🍕', title: 'Cheat Meal Oficial' }
];

let rouletteResult = null;
let isSpinning = false;

// ===== LÓGICA DE LA RULETA =====
function goToRoulette() {
    showScreen('roulette');
    renderRouletteWheel();
}

function renderRouletteWheel() {
    const wheel = document.getElementById('rouletteWheel');
    if (!wheel) return;

    // Deshabilitar animación de forma instantánea para el reset
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    
    // Forzar reflujo del navegador
    wheel.offsetHeight;

    const segments = 8;
    const segmentsList = roulettePassesData.slice(0, segments);
    
    let conicGradients = 'conic-gradient(';
    const colors = ['#ff9a76', '#ceeaca', '#8cbbcd', '#ffdbcf', '#b3ceaf', '#baeafc', '#ff9a76', '#ceeaca'];
    for (let i = 0; i < segments; i++) {
        const start = (i / segments) * 360;
        const end = ((i + 1) / segments) * 360;
        conicGradients += `${colors[i % colors.length]} ${start}deg ${end}deg`;
        if (i < segments - 1) conicGradients += ', ';
    }
    conicGradients += ')';

    wheel.style.background = conicGradients;
    wheel.innerHTML = '';

    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * 360 + (360 / segments / 2);
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.top = '50%';
        label.style.left = '50%';
        label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-85px) rotate(-${angle}deg)`;
        label.className = "text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none pointer-events-none";
        label.textContent = segmentsList[i].emoji;
        wheel.appendChild(label);
    }

    wheel.dataset.segments = segments;
    wheel.dataset.passes = JSON.stringify(segmentsList.map(p => p.id));
}

function spinRoulette() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('rouletteWheel');
    const resultBox = document.getElementById('rouletteResult');
    const btn = document.getElementById('spinBtn');

    if (!wheel) {
        isSpinning = false;
        return;
    }

    resultBox.classList.add('hidden');
    btn.disabled = true;

    try {
        const segments = parseInt(wheel.dataset.segments) || 8;
        const passesRaw = wheel.dataset.passes;
        if (!passesRaw) {
            throw new Error("Datos de pases no inicializados");
        }
        const passIds = JSON.parse(passesRaw);
        const winnerIndex = Math.floor(Math.random() * segments);

        const segmentAngle = 360 / segments;
        const extraSpins = 360 * 5;
        const targetRotation = extraSpins + (360 - (winnerIndex * segmentAngle + segmentAngle / 2));

        const currentRotation = parseFloat(wheel.style.transform.replace(/[^0-9.-]/g, '')) || 0;
        const finalRotation = currentRotation + targetRotation;

        let ticks = 0;
        const tickTimer = setInterval(() => {
            if (ticks < 15) {
                playClickSound();
                ticks++;
            } else {
                clearInterval(tickTimer);
            }
        }, 250);

        // Aplicar transición fluida para el giro
        wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
        wheel.style.transform = `rotate(${finalRotation}deg)`;

        setTimeout(() => {
            try {
                const winner = roulettePassesData.find(p => p.id === passIds[winnerIndex]);
                if (winner) {
                    document.getElementById('resultEmoji').textContent = winner.emoji;
                    document.getElementById('resultText').textContent = winner.title;
                    rouletteResult = winner;
                    resultBox.classList.remove('hidden');
                }
            } catch (innerErr) {
                console.error("Error en callback de ruleta:", innerErr);
            } finally {
                btn.disabled = false;
                isSpinning = false;
                playSuccessSound();
            }
        }, 4100);

    } catch (err) {
        console.error("Fallo al iniciar el giro de la ruleta:", err);
        btn.disabled = false;
        isSpinning = false;
        showToast("❌ Error al girar la ruleta");
    }
}

function useRouletteResult() {
    if (rouletteResult) {
        // Encontrar o crear un template compatible de passesData
        let template = passesData.find(p => p.emoji === rouletteResult.emoji && p.title === rouletteResult.title);
        if (!template) {
            // Template fallback
            template = {
                id: rouletteResult.id,
                category: 'casa',
                emoji: rouletteResult.emoji,
                title: rouletteResult.title,
                desc: 'Vale por un favor sorpresa.',
                subtitle: 'Favor de la Ruleta',
                vibe: 'Especial',
                badge: 'FAVOR SORPRESA'
            };
        }
        openEditor(template.id);
    }
}
