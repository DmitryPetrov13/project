document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const optionsMenu = document.getElementById('options-menu');
    const startButton = document.getElementById('start-button');
    const optionsButton = document.getElementById('options-button');
    const quitButton = document.getElementById('quit-button');
    const backButton = document.getElementById('back-button');
    const resolutionButton = document.getElementById('resolution-button');
    const musicSlider = document.getElementById('music-slider');
    const sfxSlider = document.getElementById('sfx-slider');
    const musicVolume = document.getElementById('music-volume');
    const sfxVolume = document.getElementById('sfx-volume');

    let currentState = 'main-menu';

    const resolutions = [
        { width: 800, height: 600 },
        { width: 1024, height: 768 },
        { width: 1280, height: 720 },
        { width: 1920, height: 1080 }
    ];
    let currentResolutionIndex = 0;

    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screen).classList.add('active');
    }

    startButton.addEventListener('click', () => {
        alert('Starting the game...');
    });

    optionsButton.addEventListener('click', () => {
        currentState = 'options';
        showScreen('options-menu');
    });

    quitButton.addEventListener('click', () => {
        alert('Quitting the game...');
        window.close();
    });

    backButton.addEventListener('click', () => {
        currentState = 'main-menu';
        showScreen('main-menu');
    });

    resolutionButton.addEventListener('click', () => {
        currentResolutionIndex = (currentResolutionIndex + 1) % resolutions.length;
        const { width, height } = resolutions[currentResolutionIndex];
        resolutionButton.textContent = `Resolution: ${width}x${height}`;
        alert(`Resolution changed to ${width}x${height}`);
    });

    musicSlider.addEventListener('input', () => {
        const volume = musicSlider.value;
        musicVolume.textContent = `${volume}%`;
        // Update music volume logic here
    });

    sfxSlider.addEventListener('input', () => {
        const volume = sfxSlider.value;
        sfxVolume.textContent = `${volume}%`;
        // Update SFX volume logic here
    });

    showScreen('main-menu');
});
