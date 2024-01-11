<template>
  <div class="about">
    <div class="flex-item">
      <h1>中文信息处理</h1>
    </div>
    <div class="flex-item">
    <h2>作者：12112104 程司哲</h2>
  </div>
  <div>
    <div class="flex-item">
      本课程项目旨在探索语音转换和语音合成的应用。项目使用了Whisper库进行语音转换，结合jieba库进行中文分词，通过训练超过800条语音数据，1000个epoch和调用VITS模型实现了三种音色的转化，包括一种男性音色和两种女性音色。通过这些技术的结合，我们可以对语音进行转换和合成，为用户提供丰富多样的音色选择。该项目将帮助用户深入了解语音处理技术在实际应用中的潜力和可能性。
    </div>
  </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    max-width: 80%;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    /* justify-content: center; */
  }
.flex-item {
display: flex;
justify-content: center;
margin-top: 18px;

/* 居中标题 */
}
}
</style>