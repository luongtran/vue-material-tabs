const state = {
  touchstartX: 0,
  isSwiping: false,
};

function addListeners(el) {
  el.addEventListener("touchstart", onTouchStart);
  el.addEventListener("touchmove", onTouchMove);
}

function removeListeners(el) {
  el.removeEventListener("touchstart", onTouchStart);
  el.removeEventListener("touchmove", onTouchMove);
}

function onTouchStart(e) {
  state.isSwiping = true;
  state.touchstartX = e.touches[0].clientX;
}

function onTouchMove(e) {
  if (!state.isSwiping) return;
  const el = e.currentTarget;
  const touchendX = e.changedTouches[0].clientX;
  const diffX = state.touchstartX - touchendX;
  const minTouch = Math.abs(el.offsetWidth * 0.1);
  if (diffX > minTouch) {
    state.isSwiping = false;
    el._callback("next");
  } else if (diffX < -minTouch) {
    state.isSwiping = false;
    el._callback("prev");
  }
}

export default {
  bind(el, { value }) {
    if (!value || !el) return;
    el._callback = value;
    addListeners(el);
  },

  unbind(el) {
    if (!el._callback) return;
    removeListeners(el);
    delete el._callback;
  },
};
