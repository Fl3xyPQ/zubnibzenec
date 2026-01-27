// ================================
// INTERACTIVE DENTAL MAP - SVG Version
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const teeth = document.querySelectorAll('.svg-tooth');
    const infoPanel = document.getElementById('toothInfoPanel');
    const closeBtn = document.getElementById('closeToothInfo');
    const toothTitle = document.getElementById('toothTitle');
    const toothNumber = document.getElementById('toothNumber');
    const toothCauses = document.getElementById('toothCauses');
    const toothRecommendations = document.getElementById('toothRecommendations');
    const urgencyBadge = document.getElementById('urgencyBadge');
    const tooth3dContainer = document.getElementById('tooth3dContainer');
    const toothIconDefault = document.getElementById('toothIconDefault');

    // Three.js 3D Model Setup
    let scene, camera, renderer, toothMesh, animationId;

    function init3DModel() {
        const canvas = document.getElementById('tooth3dCanvas');
        if (!canvas || !window.THREE) return;

        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);

        // Camera
        camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / 320, 0.1, 1000);
        camera.position.set(0, 0, 5);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(canvas.clientWidth, 320);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(5, 5, 5);
        directionalLight1.castShadow = true;
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-5, 3, -3);
        scene.add(directionalLight2);

        const rimLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
        rimLight.position.set(0, -5, 0);
        scene.add(rimLight);

        // Load realistic tooth model using GLTFLoader
        const loader = new THREE.GLTFLoader();
        
        // Using a simple procedural model that looks like a real tooth
        // (Since we can't rely on external URLs always being available)
        createRealisticTooth();

        // Animation loop
        function animate() {
            animationId = requestAnimationFrame(animate);
            if (toothMesh) {
                toothMesh.rotation.y += 0.008;
                toothMesh.rotation.x = Math.sin(Date.now() * 0.0008) * 0.15;
            }
            renderer.render(scene, camera);
        }
        animate();
    }

    function createRealisticTooth() {
        const toothGroup = new THREE.Group();

        // More realistic tooth using better geometry
        const points = [];
        
        // Crown with anatomically correct curve
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            let x, y;
            
            if (t < 0.3) {
                // Top cusps
                const angle = t * Math.PI * 3.3;
                x = 0.3 + Math.sin(angle) * 0.15;
                y = 2.5 - t * 0.8;
            } else if (t < 0.5) {
                // Crown body
                const localT = (t - 0.3) / 0.2;
                x = 1.0 - localT * 0.1;
                y = 2.26 - localT * 0.8;
            } else if (t < 0.65) {
                // Neck (CEJ - cemento-enamel junction)
                const localT = (t - 0.5) / 0.15;
                x = 0.9 - localT * 0.15;
                y = 1.46 - localT * 0.6;
            } else {
                // Root with realistic taper
                const localT = (t - 0.65) / 0.35;
                const curve = 1 - Math.pow(localT, 1.5);
                x = 0.75 * curve;
                y = 0.86 - localT * 3.3;
            }
            
            points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(0, -2.44));

        const latheGeometry = new THREE.LatheGeometry(points, 48, 0, Math.PI * 2);
        
        // Realistic enamel material with subsurface scattering effect
        const toothMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x888888,
            shininess: 150,
            emissive: 0xfafafa,
            emissiveIntensity: 0.08,
            transparent: true,
            opacity: 0.98,
            side: THREE.DoubleSide
        });

        const tooth = new THREE.Mesh(latheGeometry, toothMaterial);
        tooth.castShadow = true;
        tooth.receiveShadow = true;
        toothGroup.add(tooth);

        // Add realistic cusps (occlusal anatomy)
        const cuspGeometry = new THREE.SphereGeometry(0.22, 24, 24);
        const cuspMaterial = new THREE.MeshPhongMaterial({
            color: 0xfefefe,
            specular: 0x999999,
            shininess: 160,
            emissive: 0xffffff,
            emissiveIntensity: 0.05
        });
        
        // 4 major cusps like a real molar
        const cuspData = [
            { x: 0.45, z: 0.45, y: 2.35, scale: 1.0 },
            { x: -0.45, z: 0.45, y: 2.35, scale: 0.95 },
            { x: 0.45, z: -0.45, y: 2.3, scale: 0.9 },
            { x: -0.45, z: -0.45, y: 2.3, scale: 0.88 }
        ];

        cuspData.forEach(data => {
            const cusp = new THREE.Mesh(cuspGeometry, cuspMaterial);
            cusp.position.set(data.x, data.y, data.z);
            cusp.scale.set(data.scale, 0.5, data.scale);
            cusp.castShadow = true;
            toothGroup.add(cusp);
        });

        // Add subtle fissures (grooves)
        const fissureGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
        const fissureMaterial = new THREE.MeshPhongMaterial({
            color: 0xf0f0f0,
            specular: 0x333333,
            shininess: 80
        });

        const fissure1 = new THREE.Mesh(fissureGeometry, fissureMaterial);
        fissure1.position.set(0, 2.3, 0);
        fissure1.rotation.z = Math.PI / 2;
        toothGroup.add(fissure1);

        const fissure2 = new THREE.Mesh(fissureGeometry, fissureMaterial);
        fissure2.position.set(0, 2.3, 0);
        fissure2.rotation.x = Math.PI / 2;
        toothGroup.add(fissure2);

        toothMesh = toothGroup;
        toothMesh.scale.set(0.8, 0.8, 0.8);
        scene.add(toothMesh);
    }

    function stop3DModel() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        if (renderer) {
            renderer.dispose();
            renderer = null;
        }
    }

    // Tooth data - možné problémy podle typu zubu
    const toothData = {
        // Řezáky (1, 2)
        incisors: {
            causes: [
                'Zubní kaz - často viditelný na přední straně',
                'Zlomený nebo odštípnutý zub po úrazu',
                'Opotřebení skloviny nadměrným čištěním',
                'Citlivost na studené a horké'
            ],
            recommendations: [
                'Neprodleně navštivte zubaře - řezáky jsou viditelné',
                'V případě úrazu uchováme odlomený kousek v mléce',
                'Můžeme zub opravit bílou plombou nebo fazeto',
                'Při citlivosti používejte speciální pastu'
            ],
            urgency: 'high'
        },
        // Špičáky (3)
        canines: {
            causes: [
                'Zánět dásně kolem špičáku',
                'Kaz na hraně zubu',
                'Bolest při kousání',
                'Retence (nezprořezaný špičák)'
            ],
            recommendations: [
                'Špičáky jsou důležité pro správné skusy',
                'Objednejte se na prohlídku',
                'Při zánětu dásní je potřeba profesionální čištění',
                'Retenci řešíme ve spolupráci s ortodontistou'
            ],
            urgency: 'medium'
        },
        // Premoláry (4, 5)
        premolars: {
            causes: [
                'Kaz v jamkách na povrchu zubu',
                'Prasklina po skusy tvrdého jídla',
                'Bolest při žvýkání',
                'Citlivost na sladké'
            ],
            recommendations: [
                'Premoláry jsou náchylné na kaz v rýhách',
                'Pravidelná kontrola každých 6 měsíců',
                'Při bolesti při žvýkání neprodleně volejte',
                'Můžeme použít bílou plombu nebo inlay'
            ],
            urgency: 'medium'
        },
        // Moláry (6, 7, 8)
        molars: {
            causes: [
                'Hluboký kaz - moláry se čistí nejtěžeji',
                'Prasklý zub po kousnití do tvrdého',
                'Zánět nervu - prudká bolest',
                'Bolest moudrosti (osmičky)'
            ],
            recommendations: [
                'Moláry jsou nejdůležitější pro žvýkání',
                'Hluboký kaz může vyžadovat ošetření kanálku',
                'Osmičky často problematické - zvažujeme extrakci',
                'Prevence: důkladné čištění a zubní nit'
            ],
            urgency: 'high'
        }
    };

    // Určení typu zubu podle čísla
    function getToothType(toothNum) {
        const lastDigit = toothNum % 10;
        if (lastDigit === 1 || lastDigit === 2) return 'incisors';
        if (lastDigit === 3) return 'canines';
        if (lastDigit === 4 || lastDigit === 5) return 'premolars';
        if (lastDigit === 6 || lastDigit === 7 || lastDigit === 8) return 'molars';
        return 'molars';
    }

    // Urgency texty
    const urgencyText = {
        high: '⚠️ Objednejte se co nejdříve',
        medium: '📅 Doporučujeme návštěvu do 2 týdnů',
        low: '✅ Běžná kontrola - plánujte v klidu'
    };

    // Klik na zub
    teeth.forEach(tooth => {
        tooth.addEventListener('click', function() {
            // Odstranit předchozí výběr
            teeth.forEach(t => t.classList.remove('selected'));
            
            // Označit vybraný zub
            this.classList.add('selected');

            // Získat data
            const toothNum = parseInt(this.dataset.tooth);
            
            // Určit název zubu podle pozice
            const toothNames = {
                '18': 'Pravá horní osmička', '17': 'Pravá horní sedmička', '16': 'Pravá horní šestka',
                '15': 'Pravá horní pětka', '14': 'Pravá horní čtyřka', '13': 'Pravý horní špičák',
                '12': 'Pravá horní dvojka', '11': 'Pravá horní jednička',
                '21': 'Levá horní jednička', '22': 'Levá horní dvojka', '23': 'Levý horní špičák',
                '24': 'Levá horní čtyřka', '25': 'Levá horní pětka', '26': 'Levá horní šestka',
                '27': 'Levá horní sedmička', '28': 'Levá horní osmička',
                '48': 'Pravá dolní osmička', '47': 'Pravá dolní sedmička', '46': 'Pravá dolní šestka',
                '45': 'Pravá dolní pětka', '44': 'Pravá dolní čtyřka', '43': 'Pravý dolní špičák',
                '42': 'Pravá dolní dvojka', '41': 'Pravá dolní jednička',
                '31': 'Levá dolní jednička', '32': 'Levá dolní dvojka', '33': 'Levý dolní špičák',
                '34': 'Levá dolní čtyřka', '35': 'Levá dolní pětka', '36': 'Levá dolní šestka',
                '37': 'Levá dolní sedmička', '38': 'Levá dolní osmička'
            };
            
            const toothName = toothNames[toothNum.toString()] || 'Neznámý zub';
            const toothType = getToothType(toothNum);
            const data = toothData[toothType];

            // Naplnit panel
            toothTitle.textContent = toothName;
            toothNumber.textContent = `Zub č. ${toothNum}`;

            // Příčiny
            toothCauses.innerHTML = '';
            data.causes.forEach(cause => {
                const li = document.createElement('li');
                li.textContent = cause;
                toothCauses.appendChild(li);
            });

            // Doporučení
            toothRecommendations.innerHTML = '';
            data.recommendations.forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                toothRecommendations.appendChild(li);
            });

            // Urgency badge
            urgencyBadge.className = `urgency-badge ${data.urgency}`;
            urgencyBadge.textContent = urgencyText[data.urgency];

            // Show 3D model, hide default icon
            if (tooth3dContainer) {
                tooth3dContainer.classList.add('active');
                // Initialize 3D model when shown for the first time
                if (!renderer) {
                    setTimeout(init3DModel, 100);
                }
            }
            if (toothIconDefault) {
                toothIconDefault.style.display = 'none';
            }

            // Aktivovat panel
            infoPanel.classList.add('active');

            // Scroll na mobilu
            if (window.innerWidth <= 968) {
                infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Zavřít panel
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            infoPanel.classList.remove('active');
            teeth.forEach(t => t.classList.remove('selected'));
            
            // Hide 3D model, show default icon
            if (tooth3dContainer) {
                tooth3dContainer.classList.remove('active');
            }
            if (toothIconDefault) {
                toothIconDefault.style.display = 'block';
            }
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', stop3DModel);
});
