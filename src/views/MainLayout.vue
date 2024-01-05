<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="sidebar" content-style="padding: 0px">
      <n-layout-header
          v-for="(item, index) in items"
          :key="index"
          :style="getHeaderStyle(index)"
          :class="{ 'selected': isItemSelected(index) }"
          class="header-item"
      >
        <router-link
            :to="getRoutePath(index)"
            style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%"
        >
          <h2>{{ item }}</h2>
        </router-link>
      </n-layout-header>

      <!-- 添加更多内容 -->
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const items = ref(["语音合成", "语音转换", "关于"]);
const routeItems = ref(["/", "/convert", "/about"]);
const route = useRoute();

const getHeaderStyle = (index) => {
  return index % 2 !== items.value.length % 2 ? 'background-color: darkgray' : 'background-color: lightgray';
};

const getRoutePath = (index) => {
  return routeItems.value[index]
};

const isItemSelected = (index) => {
  return route.path === getRoutePath(index);
};

// Watch for route changes and update the selected item
watch(route, () => {
  // Do something if needed
});
</script>

<style>
.container {
  display: flex;
  height: 100vh; /* 视口高度 */
  width: 100vw;
}

.n-layout-header a {
  color: inherit; /* 使用父元素的颜色 */
  text-decoration: none; /* 移除下划线 */
}

.sidebar {
  width: 200px; /* 侧边栏宽度 */
  height: 100%; /* 全高度 */
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  top: 0;
  background-color: lightgray;
  overflow-y: auto; /* 如果内容超过视口高度时可滚动 */
}

.header-item {
  height: 10%;
  margin-top: 0;
  width: 100%;
}

.header-item.selected {
  color: blue;
  text-decoration: underline;
}

.main-content {
  flex-grow: 1; /* 让主内容区占据所有剩余空间 */
  margin-left: 200px; /* 确保主内容区不被侧边栏覆盖 */
  /*background-color: aqua; overflow: auto; 如果内容超过视口高度时可滚动 */
  /* 其他样式根据需要添加 */
}
</style>
