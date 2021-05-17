function calc(e) {
  const offset = e.currentTarget.getBoundingClientRect();
  const localX = e.clientX - offset.left;
  const localY = e.clientY - offset.top;
  const radius =
    Math.sqrt(
      e.currentTarget.clientWidth ** 2 + e.currentTarget.clientHeight ** 2
    ) / 2;
  const x = `${localX - radius}px`;
  const y = `${localY - radius}px`;
  const size = `${radius * 2}px`;
  return { x, y, size };
}

function rippleShow(e) {
  const { currentTarget } = e;
  const { size, y, x } = calc(e);
  const rippleElement = document.createElement("span");
  rippleElement.classList.add("ripple");
  rippleElement.style.width = rippleElement.style.height = size;
  rippleElement.style.top = y;
  rippleElement.style.left = x;
  currentTarget.appendChild(rippleElement);
  setTimeout(() => rippleElement.remove(), 1000);
}

function rippleListener(el, rippleEnable) {
  el?.[rippleEnable ? "addEventListener" : "removeEventListener"](
    "click",
    rippleShow
  );
}

export default {
  bind: (el, { value }) => rippleListener(el, value),
  update: (el, { value }) => rippleListener(el, value),
  unbind: (el) => rippleListener(el, false),
};
