<template>
  <div id="app">
    <div class="tabs-container">
      <Tabs nav-auto>
        <TabItem name="My first tab">
          <div class="tab-item__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sint
            dolore repudiandae commodi aliquid eum odio, aut veniam quaerat nam
            molestias animi natus sit ipsam. Placeat libero accusamus dolore
            nihil.
          </div>
        </TabItem>

        <TabItem v-for="i in 10" :key="i">
          <template #name> My custom title {{ i }} 🚀</template>
          <div class="tab-item__content">
            {{ i }} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quod sint dolore repudiandae commodi aliquid eum odio, aut veniam
            quaerat nam molestias animi natus sit ipsam. Placeat libero
            accusamus dolore nihil.
          </div>
        </TabItem>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabs, TabItem } from "@/entry.esm";

export default Vue.extend({
  name: "ServeDev",

  components: { Tabs, TabItem },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;800&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  color: black;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs-container {
  width: 50%;
  height: 50%;
  box-shadow: rgba(0, 0, 0, 0.062) 1px 10px 30px;
}

.tab-item__content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: rgb(70, 70, 70);
  background: white;
  padding: 1rem;
}
</style>
