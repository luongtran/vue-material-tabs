const themeFactory = (nav, navItem, navActiveItem, slider, arrow) => ({
  nav,
  navItem,
  navActiveItem,
  slider,
  arrow,
});

export default Object.freeze({
  default: themeFactory("#fff", "#000000", "#1867c0", "#1867c0", "#616161"),
  purple: themeFactory("#4A148C", "#BDBDBD", "#fff", "#CE93D8", "#f3f3f3"),
  red: themeFactory("#F44336", "#f3f3f3", "#fff", "#EF9A9A", "#f3f3f3"),
  pink: themeFactory("#E91E63", "#F8BBD0", "#fff", "#F8BBD0", "#f3f3f3"),
  cyan: themeFactory("#00BCD4", "#B2EBF2", "#fff", "#80DEEA", "#f3f3f3"),
  green: themeFactory("#4CAF50", "#C8E6C9", "#fff", "#A5D6A7", "#f3f3f3"),
});
