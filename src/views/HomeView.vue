<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {ref} from "vue";
import {getAudio} from "@/utils/fetch";
const value = ref("zhongli");
const showing = ref("点击“合成”按钮进行合成")
const text = ref("")
const audioPlayer = ref(null)
const options = [
  {
    label: "zhongli",
    value: 'zhongli',
  },
  {
    label: 'eula',
    value: 'eula'
  },
  {
    label: 'shenhe',
    value: 'shenhe'
  }
]
const getBackendAudio = async () => {
  try {
    const audioBlob = await getAudio(value, "C", text, 1);
    audioPlayer.value.src = URL.createObjectURL(audioBlob)
  } catch (error) {
    console.error('error fetching')
  }
}
const updateText = (value) => {
  text.value = value;
};
</script>

<template>
  <div style="width: 100%;">
    <div class="header">
      <h1>中文语音合成</h1>
    </div>
    <n-grid x-gap="0" :cols="2" >
      <n-gi >
        <div class="flex-item">
          <div style="margin-top: 6px">
            选择角色：
          </div>
          <n-select v-model:value="value" size="large" style="width: 40%" :options="options"/>
        </div>
        <div class="flex-item" style="margin-top: 20px">
        <n-input type="textarea" :value="text" @update:value="updateText" style="width: 80%" size="large" round placeholder="输入需要合成的文本" />
        </div>
        <div class="flex-item" style="margin-top: 20px">
          <n-button @click="getBackendAudio">合成</n-button>
        </div>
      </n-gi>
      <n-gi  >
        <div class="flex-item">
          <div style="width: 80%; min-height: 80px; background-color: darkgray; align-items: center" class="flex-item">
            {{ showing }}
          </div>
        </div>
        <div class="flex-item" style="margin-top: 25px">
          <audio controls ref="audioPlayer"></audio>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: center; /* 居中标题 */
  margin-top: 30px;
  margin-bottom: 30px;
}
.flex-item {
  display: flex;
  justify-content: center; /* 居中标题 */
}
.content {
  display: flex;        /* 启用 Flexbox */
  justify-content: spatextce-between; /* 在项目之间保持平均的空间 */
}
.left-panel, .right-panel {
  flex: 1;              /* 两个面板平分空间 */
  padding: 10px;        /* 添加内边距以创建一些间隔 */
}


</style>
