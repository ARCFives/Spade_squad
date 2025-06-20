import { Game } from 'phaser';
import { gameConfig } from './gameConfig';
import '../../styles/fonts.css';

export default new Game(gameConfig);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker
//         .register('service-worker.js')
//         .then((registration) => {
//           console.log('Service Worker registrado com sucesso:', registration);
//         })
//         .catch((err) => {
//           console.log('Erro ao registrar o Service Worker:', err);
//         });
//     });
//   }