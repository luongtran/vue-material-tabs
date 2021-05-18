const state = {
  target: null,
  touchstartX: 0,
  isSwiping: false,
};

function start(e) {
  if (!e) return;
  state.isSwiping = true;
  state.touchstartX = e.touches[0].clientX;
}

function move(e) {
  if (!state.isSwiping) return;
  const touchendX = e.changedTouches[0].clientX;
  const diffX = state.touchstartX - touchendX;
  // min touch is 10% of target width
  const minTouch = state.target.offsetWidth * 0.1;

  if (diffX > minTouch) {
    state.isSwiping = false;
    state.target._callback("next");
  } else if (diffX < -minTouch) {
    state.isSwiping = false;
    state.target._callback("prev");
  }
}

function listeners(add) {
  [
    ["touchstart", start],
    ["touchmove", move],
  ].forEach(([k, v]) => {
    state?.target?.[add ? "addEventListener" : "removeEventListener"](k, v);
  });
}

export default {
  inserted(el, { value }) {
    if (!value || !el) return;
    state.target = el;
    state.target._callback = value;
    listeners(true);
  },

  unbind() {
    listeners(false);
  },
};
