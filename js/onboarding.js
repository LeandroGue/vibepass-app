/**
 * VibePass Onboarding & Tutorial Logic
 */

const Onboarding = {
    steps: [
        {
            title: "¡Bienvenido a VibePass! 🎫",
            text: "La app para crear pases VIP y favores especiales para tu familia y amigos.",
            icon: "confirmation_number"
        },
        {
            title: "Explora y Elige 🔍",
            text: "Busca entre decenas de pases divertidos categorizados por 'Vibes'.",
            icon: "explore"
        },
        {
            title: "Personaliza a tu Gusto 🎨",
            text: "Cambia el nombre, añade stickers, elige colores y ponle una fecha de vencimiento.",
            icon: "palette"
        },
        {
            title: "Tu Colección Personal 💾",
            text: "Todos tus pases generados se guardan aquí. ¡Puedes descargarlos o compartirlos por WhatsApp!",
            icon: "style"
        },
        {
            title: "Canjea con QR 📸",
            text: "Usa el escáner del menú superior para validar los vales. ¡Una vez canjeados quedarán marcados para siempre!",
            icon: "qr_code_scanner"
        }
    ],
    currentStep: 0,

    init() {
        console.log("VibePass Onboarding: Iniciando...");
    },

    show() {
        this.currentStep = 0;
        this.render();
    },

    render() {
        let overlay = document.getElementById('onboarding-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'onboarding-overlay';
            overlay.className = 'fixed inset-0 z-[2000] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 transition-all duration-300';
            document.body.appendChild(overlay);
        }

        const step = this.steps[this.currentStep];
        const isLast = this.currentStep === this.steps.length - 1;

        overlay.innerHTML = `
            <div class="max-w-[400px] w-full bg-surface-container rounded-[40px] p-8 border border-outline-variant/30 shadow-2xl flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-300">
                <div class="w-24 h-24 bg-primary-container/20 rounded-full flex items-center justify-center text-primary mb-2">
                    <span class="material-symbols-outlined text-[60px]">${step.icon}</span>
                </div>
                <div class="space-y-2">
                    <h2 class="font-headline text-2xl font-black text-on-surface uppercase tracking-tight">${step.title}</h2>
                    <p class="text-on-surface-variant font-medium text-sm leading-relaxed">${step.text}</p>
                </div>
                <div class="flex gap-2 mb-2">
                    ${this.steps.map((_, i) => `
                        <div class="w-2 h-2 rounded-full transition-all duration-300 ${i === this.currentStep ? 'w-6 bg-primary' : 'bg-outline-variant'}"></div>
                    `).join('')}
                </div>
                <button onclick="Onboarding.next()" class="w-full bg-primary text-white font-headline font-bold py-4 rounded-full shadow-md active:scale-95 transition-all uppercase tracking-widest text-xs">
                    ${isLast ? '¡Empezar ahora!' : 'Siguiente'}
                </button>
            </div>
        `;
    },

    next() {
        if (typeof playClickSound === 'function') playClickSound();
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.render();
        } else {
            this.close();
        }
    },

    close() {
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                overlay.remove();
                localStorage.setItem('vibe_onboarding_v182_done', 'true');
                if (typeof showToast === 'function') showToast("✨ ¡Todo listo! A disfrutar.");
            }, 3000);
        }
    }
};

// Funciones globales requeridas por el sistema
function showOnboarding() {
    Onboarding.show();
}

function restartTutorial() {
    localStorage.removeItem('vibe_onboarding_complete');
    Onboarding.show();
}

// Inicializar si el script se carga dinámicamente
Onboarding.init();
