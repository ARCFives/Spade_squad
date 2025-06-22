const CACHE_NAME = 'spade-squad-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './game.js',
  './game.js.map',
  './assets/images/icons/android-chrome-192x192.png',
  './assets/images/icons/android-chrome-512x512.png',
  './assets/images/background/forest_back.png',
  './assets/images/background/forest_front.png',
  './assets/images/background/mountains.png',
  './assets/images/background/map.png',
  './assets/images/background/hangar.png',
  './assets/images/background/store_background.png',
  './assets/images/hud/ammoIcon.png',
  './assets/images/hud/fuelIcon.png',
  './assets/images/hud/exit.png',
  './assets/images/hud/fuelBar.png',
  './assets/images/hud/missile_icon.png',
  './assets/images/hud/profile.png',
  './assets/images/hud/speakerMute.png',
  './assets/images/hud/speakerOn.png',
  './assets/images/sprites/ammoBox.png',
  './assets/images/sprites/cards.png',
  './assets/images/sprites/cessna.png',
  './assets/images/sprites/controls.png',
  './assets/images/sprites/explosion.png',
  './assets/images/sprites/gallon.png',
  './assets/images/sprites/aircraft_card.png',
  './assets/images/sprites/aircraft_info_bar.png',
  './assets/images/sprites/arrow.png',
  './assets/images/sprites/amx.png',
  './assets/images/sprites/gripen.png',
  './assets/images/sprites/languages.png',
  './assets/images/sprites/missile.png',
  './assets/images/sprites/muzzle_flash_effect.png',
  './assets/images/sprites/planes_selection.png',
  './assets/images/sprites/tucano.png',
  './assets/images/sprites/wing_missile.png',
  './assets/images/sprites/kc.png',
  './assets/images/sprites/missile.png',
  './assets/images/sprites/missileBox.png',
  './assets/images/sprites/shoot.png',
  './assets/images/sprites/space.png',
  './assets/fonts/nasalization-rg.otf',
  './assets/fonts/TarrgetAcademyRegular.otf',
  './assets/audio/airplanePass.wav',
  './assets/audio/amazonLevel.ogg',
  './assets/audio/coin.ogg',
  './assets/audio/engine.wav',
  './assets/audio/explosion.wav',
  './assets/audio/mainmenu.ogg',
  './assets/audio/menu.wav',
  './assets/audio/missile.wav',
  './assets/audio/pickup.wav',
  './assets/audio/shoot.WAV',
  './assets/audio/tick.wav',
  './assets/audio/warning.wav',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
