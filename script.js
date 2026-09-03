const experience = document.querySelector('#experience');
const openButton = document.querySelector('#open-invitation');
const replayButton = document.querySelector('#replay-animation');
const invitationView = document.querySelector('#invitation-view');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let opening = false;
let finishTimer;

function openInvitation() {
  if (opening || experience.classList.contains('is-open')) return;

  opening = true;
  openButton.disabled = true;
  openButton.setAttribute('aria-expanded', 'true');
  invitationView.setAttribute('aria-hidden', 'false');
  experience.classList.add('is-opening');

  const duration = reducedMotion.matches ? 0 : 1350;
  finishTimer = window.setTimeout(() => {
    experience.classList.remove('is-opening');
    experience.classList.add('is-open');
    opening = false;
    replayButton.focus({ preventScroll: true });
  }, duration);
}

function replayAnimation() {
  window.clearTimeout(finishTimer);
  experience.classList.remove('is-opening', 'is-open');
  invitationView.setAttribute('aria-hidden', 'true');
  openButton.disabled = false;
  openButton.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
  openButton.focus({ preventScroll: true });
}

openButton.addEventListener('click', openInvitation);
replayButton.addEventListener('click', replayAnimation);
