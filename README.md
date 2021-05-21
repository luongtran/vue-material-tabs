# vue-material-tabs

Vue.js tabs component based in material design ❤

## [Demo](https://vue-material-tabs.vercel.app/)

## 🚚 Install

```c
 yarn add vue-material-tabs  // npm install --save vue-material-tabs
```

## 🚀 Usage

### Global

```javascript
import Vue from "vue";
import Tabs from "vue-material-tabs";

Vue.use(Tabs);
```

### Local

```javascript
import { tabs, tab } from "vue-material-tabs";

export default {
  components: {
    tabs,
    tabItem,
  },
};
```

## 📌 Examples

```javascript
<Tabs>
  <TabItem name="Foo">
    <div class="first-tab">First tab</div>
  </TabItem>
  <TabItem name="Bar">
    <div class="second-tab">Second tab</div>
  </TabItem>
</Tabs>
```

#### You can customize the name in the nav by slot #name (This removes the use of the prop name)

```javascript
<Tabs>
  <TabItem>
    <template #name>
        My custom title 🍉
    </template>

    <div class="first-tab">
    First tab
    </div>
  </TabItem>
</Tabs>
```

### Themes

There are some themes available to customize your tab, they are:

- default
- purple
- red
- pink
- cyan
- green

You can create your own personalized themes, through the "theme" prop

#### example

```javascript
<Tabs :theme="theme" >
  ....
</Tabs>
....
<script>
  export default {
    data: () => ({
      theme: {
        nav: "#4A148C",
        navItem: "#BDBDBD",
        navActiveItem: "#fff",
        slider: "#CE93D8",
        arrow: "#f3f3f3",
      },
    }),
  };
</script>
```

## Tabs

### Props

| Name          | type             | Default   | description                                       |
| ------------- | ---------------- | --------- | ------------------------------------------------- |
| value         | String           | ''        | The designated model value for the component.     |
| theme         | String - Object  | 'default' | Apply a custom theme                              |
| vertical      | Boolean          | false     | Uses a vertical transition when changing windows. |
| ripple        | Boolean          | true      | Enalbe/disable ripple buttons effects.            |
| slideDuration | String - Number  | 200       | Set time in ms slide duration.                    |
| slideVertical | Boolean          | false     | Enable vertical slide animation.                  |
| slide         | Boolean - Object | false     | Enable/disable slide or set object with props.    |
| navAuto       | Boolean          | false     | Set nav auto items.                               |
| navSlider     | Boolean          | true      | Enable/disable slider under nav item.             |

### Slots

| Name | Description                   | Props                               |
| ---- | ----------------------------- | ----------------------------------- |
| nav  | Slot to replace the nav menu. | { navItems: Array, active: String } |

### Events

| Name   | Description                                      |
| ------ | ------------------------------------------------ |
| input  | Emitted when tab is changed.                     |
| change | Emitted when tab is changed by user interaction. |

## TabItem

### Props

| Name     | type    | Default     | description                                           |
| -------- | ------- | ----------- | ----------------------------------------------------- |
| name     | String  | 'Tab Item ' | Sets the tab value in the nav menu.                   |
| disabled | Boolean | false       | Removes the ability to click or target the component. |

### Slots

| Name | Description                |
| ---- | -------------------------- |
| name | Slot for cutom name in nav |

## 🔖 License

[MIT](https://github.com/jairoblatt/vue-material-tabs/blob/main/LICENSE)
