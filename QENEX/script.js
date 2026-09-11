// Efeito Ripple nos Botões
document.addEventListener('click', function (e) {
    const button = e.target.closest('.btn, .form-submit');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Hamburger Menu Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission (Envio direto via WhatsApp)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value : '';
        const message = messageInput ? messageInput.value : '';

        // Monta mensagem personalizada de WhatsApp
        const waText = encodeURIComponent(`Olá! Meu nome é ${name}. ${message}`);
        const waUrl = `https://wa.me/5519993413790?text=${waText}`;

        // Reset form
        contactForm.reset();

        // Exibe mensagem de confirmação
        if (successMessage) {
            successMessage.classList.add('show');

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3500);
        }

        // Redireciona para o WhatsApp
        window.open(waUrl, '_blank');
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Base de dados detalhada dos produtos do catálogo
const productsData = {
    iluminacao: {
        icon: '💡',
        title: 'Iluminação Inteligente',
        description: 'Transforme a atmosfera de cada ambiente da sua casa com cenas luminosas personalizadas, regulagem de intensidade (dimmer), temporização inteligente e integração com assistentes de voz.',
        features: [
            'Criação de cenas pré-programadas (Cinema, Jantar, Leitura, Festa)',
            'Controle de temperatura de cor (luz quente para relaxar, luz fria para focar)',
            'Automação baseada na luz solar (ritmo circadiano)',
            'Redução de até 30% no consumo de energia elétrica',
            'Acionamento por voz (Alexa, Google Assistant, Apple Siri) ou App'
        ],
        specs: [
            { label: 'Protocolos', value: 'Zigbee 3.0 / Matter / Wi-Fi' },
            { label: 'Compatibilidade', value: 'Alexa, Google Home, HomeKit' },
            { label: 'Instalação', value: 'Sem reforma na fiação existente' },
            { label: 'Tensão', value: 'Bivolt Automático (110V/220V)' }
        ],
        whatsappMessage: 'Olá! Gostaria de saber mais informações e solicitar um orçamento para o sistema de Iluminação Inteligente.'
    },
    climatizacao: {
        icon: '❄️',
        title: 'Climatização Inteligente',
        description: 'Mantenha cada cômodo da sua casa na temperatura ideal automaticamente. Controle aparelhos de ar-condicionado, aquecedores e ventiladores remotamente antes mesmo de chegar em casa.',
        features: [
            'Controle individual de temperatura por cômodo',
            'Geofencing: Climatização automática ao se aproximar de casa',
            'Programação de horários e modos de economia noturna',
            'Integração com sensores de presença e janelas abertas',
            'Histórico de consumo e eficiência energética em tempo real'
        ],
        specs: [
            { label: 'Compatibilidade', value: 'Ar Split, VRF, Central, Cassete' },
            { label: 'Comunicação', value: 'IV / Wi-Fi / RS485' },
            { label: 'Sensores', value: 'Temperatura e Umidade integrados' },
            { label: 'Interface', value: 'Painel Touch Wall + App Mobile' }
        ],
        whatsappMessage: 'Olá! Gostaria de mais detalhes e um orçamento para o sistema de Climatização Inteligente.'
    },
    seguranca: {
        icon: '🔐',
        title: 'Segurança & Controle de Acesso',
        description: 'Proteção 24h com monitoramento inteligente em tempo real. Receba alertas de invasão, acesse câmeras de alta definição e libere o acesso da sua casa de qualquer lugar do mundo.',
        features: [
            'Fechaduras biométricas, com senha numérica e biometria facial',
            'Câmeras 4K com inteligência artificial para detecção de pessoas',
            'Sensores de abertura em portas e janelas com alertas push instantâneos',
            'Simulação de presença quando a família estiver viajando',
            'Gravação contínua na nuvem com criptografia de ponta a ponta'
        ],
        specs: [
            { label: 'Fechaduras', value: 'Biometria, Senha, Tag NFC, App' },
            { label: 'Resolução CFTV', value: 'Ultra HD 4K com Visão Noturna' },
            { label: 'Nobreak', value: 'Autonomia de até 8h sem energia' },
            { label: 'Alertas', value: 'Notificação Push + Sirene + SMS' }
        ],
        whatsappMessage: 'Olá! Gostaria de consultar valores para o sistema de Segurança e Controle de Acesso QENEX.'
    },
    persianas: {
        icon: '🪟',
        title: 'Persianas & Cortinas Motorizadas',
        description: 'Combine praticidade, privacidade e economia de energia controlando o fechamento das cortinas pelo celular, comando de voz ou programações automáticas de acordo com o sol.',
        features: [
            'Abertura e fechamento automático ao nascer e pôr do sol',
            'Ajuste milimétrico de porcentagem de abertura',
            'Integração com sensores de luminosidade para proteção solar de móveis',
            'Motores ultra silenciosos com tecnologia de absorção de ruído',
            'Comando simultâneo para todas as cortinas da casa com um único toque'
        ],
        specs: [
            { label: 'Motorização', value: 'Motores Tubulares Silenciosos (<30dB)' },
            { label: 'Tipos', value: 'Rolo, Romana, Celular, Cortineiro' },
            { label: 'Alimentação', value: '110V/220V ou Bateria Recarregável' },
            { label: 'Garantia', value: '5 anos de garantia de motor' }
        ],
        whatsappMessage: 'Olá! Quero saber mais e fazer um orçamento para Persianas e Cortinas Motorizadas.'
    },
    audio: {
        icon: '🎵',
        title: 'Áudio Multiambiente',
        description: 'Tenha som de altíssima fidelidade distribuído por toda a casa. Ouça suas playlists favoritas no Spotify ou Apple Music em qualquer cômodo com controles de volume independentes.',
        features: [
            'Zonas independentes de áudio (músicas diferentes em ambientes diferentes)',
            'Sonorização invisível com caixas de embutir no gesso de alta performance',
            'Integração total com Home Theater e TV da sala',
            'Suporte a AirPlay 2, Spotify Connect, Bluetooth e AUX',
            'Modo Festa: Sincronize o mesmo áudio em toda a residência'
        ],
        specs: [
            { label: 'Amplificadores', value: 'Multi-room Classe D Alta Fidelidade' },
            { label: 'Caixas de Som', value: 'In-ceiling anguladas / Outdoor IP65' },
            { label: 'Conectividade', value: 'Wi-Fi 5GHz / Ethernet / Bluetooth' },
            { label: 'Streaming', value: 'Spotify, Deezer, Tidal, AirPlay 2' }
        ],
        whatsappMessage: 'Olá! Gostaria de mais informações sobre o projeto de Áudio Multiambiente para minha residência.'
    },
    energia: {
        icon: '⚡',
        title: 'Gestão Inteligente de Energia',
        description: 'Monitore o consumo elétrico da sua casa em tempo real por circuito, elimine gastos fantasmas e proteja seus equipamentos eletrônicos contra picos de tensão.',
        features: [
            'Monitoramento de consumo em R$ e kWh direto no celular',
            'Alertas de consumo anormal ou fuga de corrente',
            'Desligamento automático de aparelhos em standby nas madrugadas',
            'Integração com sistemas de energia solar fotovoltaica',
            'Proteção contra sobretensionamento em eletrodomésticos'
        ],
        specs: [
            { label: 'Medição', value: 'Medidores de TC não invasivos por fase' },
            { label: 'Precisão', value: 'Superior a 99% de aferição' },
            { label: 'Integração', value: 'Inversores Solares + Quadro Elétrico' },
            { label: 'Relatórios', value: 'Diários, Semanais e Mensais exportáveis' }
        ],
        whatsappMessage: 'Olá! Gostaria de entender mais e solicitar uma consultoria para Gestão de Energia em minha casa.'
    }
};

// Funções de Modal de Produtos
function openProductModal(productId) {
    const product = productsData[productId];
    if (!product) return;

    const backdrop = document.getElementById('productModalBackdrop');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

    if (!backdrop || !modalTitle) return;

    // Atualiza cabeçalho e descrição
    modalIcon.textContent = product.icon;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;

    // Preenche lista de recursos
    modalFeatures.innerHTML = product.features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    // Preenche especificações técnicas
    modalSpecs.innerHTML = product.specs
        .map(spec => `
            <div class="spec-item">
                <div class="spec-label">${spec.label}</div>
                <div class="spec-value">${spec.value}</div>
            </div>
        `).join('');

    // Configura botão WhatsApp com mensagem pré-preenchida
    const encodedMessage = encodeURIComponent(product.whatsappMessage);
    modalWhatsappBtn.href = `https://wa.me/5519993413790?text=${encodedMessage}`;

    // Exibe o modal
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const backdrop = document.getElementById('productModalBackdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fechar modal ao clicar fora ou pressionar ESC
const backdropElement = document.getElementById('productModalBackdrop');
if (backdropElement) {
    backdropElement.addEventListener('click', (e) => {
        if (e.target === backdropElement) {
            closeProductModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});