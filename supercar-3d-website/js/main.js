document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero-3d-container').appendChild(renderer.domElement);
    
    // Load a basic 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('path/to/model.gltf', (gltf) => {
        const car = gltf.scene;
        scene.add(car);
    }, undefined, (error) => {
        console.error('An error occurred loading the model.', error);
    });
    
    // Position camera
    camera.position.set(0, 1, 5);

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    // Orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Render loop
    const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});

