<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { ref } from "vue";
import { getAudio, getConvertAudio } from "@/utils/fetch";
const value = ref("zhongli");
const showing = ref("录音完后可以播放检查")
const text = ref("")
const audioNow = ref(null)
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
    console.log(audioNow.value)
    const audioBlob = await getConvertAudio(audioNow.value, value);
    audioPlayer.value.src = URL.createObjectURL(audioBlob)
  } catch (error) {
    console.error('Error fetching audio:', error);
    console.error('Error stack trace:', error.stack);
  }
}
const updateText = (value) => {
  text.value = value;
};
const audioUrl = ref(null);
const isRecording = ref(false);
let mediaRecorder;
let audioChunks = [];

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  isRecording.value = true;

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
    audioUrl.value = URL.createObjectURL(audioBlob);
    audioNow.value = audioBlob;
    audioChunks = [];
  };
};

const stopRecording = () => {
  mediaRecorder.stop();
  isRecording.value = false;
};
</script>

<template>
  <div style="width: 100%;">
    <div class="header">
      <h1>中文语音转换</h1>
    </div>
    <n-grid x-gap="0" :cols="2">
      <n-gi>
        <div class="flex-item">
          <div style="margin-top: 6px">
            选择角色：
          </div>
          <n-select v-model:value="value" size="large" style="width: 40%" :options="options" />
        </div>
        <div class="flex-item" style="margin-top: 20px">
          <n-button @click="startRecording" :disabled="isRecording">开始录音</n-button>
          <n-button @click="stopRecording" :disabled="!isRecording">停止录音</n-button>
        </div>
        <div class="flex-item" style="margin-top: 20px">
          <audio v-if="audioUrl" :src="audioUrl" controls></audio>
        </div>
        <div class="flex-item" style="margin-top: 20px">
          <n-button @click="getBackendAudio">合成</n-button>
        </div>
      </n-gi>
      <n-gi>
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
  justify-content: center;
  /* 居中标题 */
  margin-top: 30px;
  margin-bottom: 30px;
}

.flex-item {
  display: flex;
  justify-content: center;
  /* 居中标题 */
}

.content {
  display: flex;
  /* 启用 Flexbox */
  justify-content: spatextce-between;
  /* 在项目之间保持平均的空间 */
}

.left-panel,
.right-panel {
  flex: 1;
  /* 两个面板平分空间 */
  padding: 10px;
  /* 添加内边距以创建一些间隔 */
}</style>
