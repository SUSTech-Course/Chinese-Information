<template>
    <div class="container">
      <!-- 侧边栏 -->
      <div class="sidebar" content-style="padding: 0px">
        <n-layout-header style="display: flex; justify-content: center; align-items: center;" v-for="(item, index) in items" :key="index"
        :style="getHeaderStyle(index)" class="header-item">
        <h2>{{ item }}</h2>  
        </n-layout-header>
        <!-- 添加更多内容 -->
    </div>
  
      <!-- 主内容区 -->
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </template>
  <script>
export default {
    data() {
        return {
            items: ["语音合成", "语音转换"]
        };
    },
    methods: {
        getHeaderStyle(index) {
            return index % 2 === 0 ? 'background-color: lightgray'
            : 'background-color: darkgray';
        }
    }
}
</script>
  
  <style>
  .container {
    display: flex;
    height: 100vh; /* 视口高度 */
    width: 100vw;
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
  
  .main-content {
  flex-grow: 1; /* 让主内容区占据所有剩余空间 */
  margin-left: 200px; /* 确保主内容区不被侧边栏覆盖 */
  background-color: aqua;
  overflow: auto; /* 如果内容超过视口高度时可滚动 */
  /* 其他样式根据需要添加 */
}
  </style>
  