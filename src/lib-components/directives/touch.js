const state = {
  target: null,
  touchstartX: 0,
  touchstartY: 0,
  isSwiping: 0,
};

function start(e) {
  if (!e) return;
  state.isSwiping = true;
  state.touchstartX = e?.touches[0].clientX;
  state.touchstartY = e?.touches[0].clientY;
}

function move(e) {
  if (!state.isSwiping || !state.target?._callback) return;
  const touchendX = e?.changedTouches[0].clientX;
  const touchendY = e?.changedTouches[0].clientY;
  const diffX = state.touchstartX - touchendX;
  const diffY = state.touchstartY - touchendY;
  if (diffY > 0 || diffX > 0) state.target._callback("next");
  else state.target._callback("prev");
  state.isSwiping = false;
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
