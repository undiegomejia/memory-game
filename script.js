'use strict';

let haVolteado = false;
let bloquearTarjeta = false;
let primeraCarta, segundaCarta;

const tarjetas = document.querySelectorAll('.tarjeta');

function voltearTarjeta() {
  if (bloquearTarjeta) return;
  if (this === primeraCarta) return;
  this.classList.toggle('voltear');
  if (!haVolteado) {
    // Primer click
    haVolteado = true;
    primeraCarta = this;
    return;
  }
  // Segundo click
  haVolteado = false;
  segundaCarta = this;
  checkearMatch();
}

function checkearMatch() {
  let matchea = primeraCarta.dataset.arte === segundaCarta.dataset.arte;
  matchea ? deshabilitar() : desVoltear();
}

function deshabilitar() {
  primeraCarta.removeEventListener('click', voltearTarjeta);
  segundaCarta.removeEventListener('click', voltearTarjeta);
  resetTablero();
}

function desVoltear() {
  bloquearTarjeta = true;
  setTimeout(() => {
    primeraCarta.classList.remove('voltear');
    segundaCarta.classList.remove('voltear');
    resetTablero();
  }, 1500);
}

function resetTablero() {
  [haVolteado, bloquearTarjeta] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

(function random() {
  tarjetas.forEach(tarjeta => {
    let numRandom = Math.floor(Math.random() * 12);
    tarjeta.style.order = numRandom;
  });
})();

tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));
