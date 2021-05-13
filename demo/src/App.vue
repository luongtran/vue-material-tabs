<template>
  <div id="app">
    <div class="title">
      <h1>vue-material-tabs <small>v0.0.3</small></h1>
      <a href="https://github.com/jairoblatt/vue-material-tabs" target="_blank">
        Docs
      </a>
    </div>

    <div class="btn-group">
      <Btn @click="orientation = !orientation">
        {{ orientation ? "Horizontal" : "Vertical" }}
      </Btn>

      <Btn @click="ripple = !ripple">
        Ripple
      </Btn>

      <Btn @click="slider = !slider">
        Slider
      </Btn>

      <Btn @click="dark = !dark">
        Dark
      </Btn>

      <Btn @click="slide = !slide">
        Slide
      </Btn>

      <Btn @click="slideVertical = !slideVertical">
        Slide Vertical
      </Btn>

      <Btn @click="disabled = !disabled">
        Disabled
      </Btn>
    </div>

    <div class="tab-wrapper">
      <Tabs
        :vertical="orientation"
        :ripple="ripple"
        :nav-slider="slider"
        :dark="dark"
        :slide="slide"
        :slide-vertical="slideVertical"
      >
        <TabItem>
          <template #name>
            <span>
              <span> 🚀</span>
              <p>Custom</p>
            </span>
          </template>

          <div class="tab-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            repellendus itaque in, dolore hic explicabo tenetur odit magnam
            laborum vitae fugiat maiores eum consequuntur libero id. Repudiandae
            quia et possimus?
          </div>
        </TabItem>

        <TabItem>
          <template #name>
            <span>
              <span> 🚚</span>
              <p>Custom 2</p>
            </span>
          </template>

          <div class="tab-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            repellendus itaque in, dolore hic explicabo tenetur odit magnam
            laborum vitae fugiat maiores eum consequuntur libero id. Repudiandae
            quia et possimus?
          </div>
        </TabItem>

        <TabItem
          v-for="i in 10"
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
export default {
  name: "App",

  components: {
    Btn: () => import("./Btn"),
  },

  data: () => ({
    orientation: false,
    ripple: true,
    slider: true,
    dark: false,
    slide: true,
    disabled: false,
    slideVertical: false,
  }),
};
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
  width: 100%;
  border-radius: 5px;
  box-shadow: 20px 20px 60px #e7e7e7, -20px -20px 60px #ffffff;
}

.btn-group .btn {
  margin: 0.6rem;
  flex: 1 auto;
  width: 10%;
}

.tab-wrapper {
  height: 610px;
  width: 100%;
  box-shadow: 20px 20px 60px #e7e7e7, -20px -20px 60px #ffffff;
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
  margin-bottom: 1rem;
}

.title a {
  margin-left: 1rem;
}

@media only screen and (max-width: 1000px) {
  #app {
    max-width: 97.333%;
  }

  .btn-group {
    width: 100%;
    justify-content: flex-start;
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
