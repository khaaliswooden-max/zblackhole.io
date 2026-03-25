let activePause: (() => void) | null = null;

export function registerActivePlayer(pause: () => void) {
  if (activePause && activePause !== pause) {
    activePause();
  }
  activePause = pause;
}

export function clearActivePlayer(pause: () => void) {
  if (activePause === pause) {
    activePause = null;
  }
}
