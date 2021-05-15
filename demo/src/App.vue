<template>
  <div id="app">
    <div class="title">
      <h1>vue-material-tabs</h1>

      <a
        class="github-button"
        href="https://github.com/jairoblatt"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-size="large"
        aria-label="Follow @jairoblatt on GitHub"
        >Follow @jairoblatt</a
      >
      <a
        class="github-button"
        href="https://github.com/jairoblatt/vue-material-tabs"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star jairoblatt/vue-material-tabs on GitHub"
        >Star</a
      >
    </div>

    <div class="btn-group">
      <Btn @click="vertical = !vertical">
        {{ vertical ? "Horizontal" : "Vertical" }}
      </Btn>

      <Btn @click="ripple = !ripple">
        Ripple
      </Btn>

      <Btn @click="navSlider = !navSlider">
        Slider
      </Btn>

      <Btn @click="dark = !dark">
        Dark
      </Btn>

      <Btn @click="slide = !slide">
        Slide
      </Btn>

      <Btn @click="slideVertical = !slideVertical">
        Slide vertical
      </Btn>

      <Btn @click="disabled = !disabled">
        Disabled
      </Btn>
      <Btn @click="add++">
        Add tab
      </Btn>
    </div>

    <div class="tab-wrapper">
      <Tabs
        v-bind="{
          ripple,
          navSlider,
          slide,
          dark,
          ripple,
          vertical,
          slideVertical,
        }"
      >
        <TabItem>
          <template #name>
            <span>Custom 🚀</span>
          </template>

          <div class="tab-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            repellendus itaque in, dolore hic explicabo tenetur odit magnam
            laborum vitae fugiat maiores eum consequuntur libero id. Repudiandae
            quia et possimus?
          </div>
        </TabItem>

        <TabItem
          v-for="i in add"
          :key="`tab-${i}`"
          :name="`tab ${i}`"
          :disabled="disabled && i === 2"
        >
          <div class="tab-content">
            {{ i }} Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Saepe repellendus itaque in, dolore hic explicabo tenetur odit
            magnam laborum vitae fugiat maiores eum consequuntur libero id.
            Repudiandae quia et possimus?
          </div>
        </TabItem>
      </Tabs>
    </div>
  </div>
</template>
<script>
// https://buttons.github.io/
const script = document.createElement("script");
script.setAttribute("src", "https://buttons.github.io/buttons.js");
document.head.appendChild(script);

import Vue from "vue";
import { Tabs, TabItem } from "vue-material-tabs";
import Btn from "./Btn";

export default Vue.extend({
  name: "ServeDev",
  components: { Tabs, TabItem, Btn },

  data: () => ({
    vertical: false,
    ripple: true,
    navSlider: true,
    dark: false,
    slide: true,
    disabled: false,
    slideVertical: false,
    add: 9,
  }),
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;800&display=swap");

body {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: center;
  align-content: center;
  background: #f3f3f3;
  height: 98vh;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 60%;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background: white;
  border-radius: 5px;
}

.btn-group .btn {
  margin: 0.6rem;
  flex: 1 auto;
  width: 10%;
}

.tab-wrapper {
  height: 610px;
  width: 1000px;
}

.tab-content {
  padding: 2rem;
  color: gray;
  font-size: 1.5rem;
}

.tab-content-second {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
}

.title {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(23, 29, 43);
}

.title span {
  padding-left: 20px;
}

@media only screen and (max-width: 1000px) {
  #app {
    max-width: 97.333%;
  }

  .tab-wrapper {
    height: 50%;
    width: 97%;
  }
  .btn-group {
    width: 100%;
  }

  .btn-group .btn {
    width: 30%;
    margin: 0.5rem;
  }
}

@media only screen and (max-width: 500px) {
  .title {
    flex-direction: column;
    margin-bottom: 1rem;
    margin-top: 0.2rem;
  }

  .btn-group .btn {
    width: 46%;
    margin: 0.2rem;
  }
}
</style>
