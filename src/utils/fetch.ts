import axios from "axios";

export function getAudio(spk: string, lang: string, text: string, leng: number = 1): Promise<Blob> {
    return new Promise((resolve, reject) => {
        var url = import.meta.env.VITE_APP_BACK_URL + '/synthesize';
        console.log({
            spk: spk.value,
            lang: lang,
            text: text.value,
            length_scale: leng
        })
        axios.post(url, {
            spk: spk.value,
            lang: lang,
            text: text.value,
            length_scale: leng
        }, {
            responseType: 'arraybuffer' // 设置响应类型为 arraybuffer
        }).then(response => {
            // 处理后端返回的文件数据
            const audioData = response.data;

            // 创建Blob对象
            const blob = new Blob([audioData], { type: 'audio/wav' });

            // 解析Promise并返回音频Blob
            resolve(blob);
        }).catch(error => {
            reject(error); // 处理请求错误
        });
    });
}
export function getConvertAudio(audio: Blob, spk: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const url = `${import.meta.env.VITE_APP_BACK_URL}/convert2`;
  
      // 创建一个FormData对象，用于发送包含音频文件的请求
      const formData = new FormData();
      formData.append('audio', audio, 'audio.mpeg');
      formData.append('spk', spk);
  
      // 创建XMLHttpRequest对象
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.responseType = 'blob'; // 设置响应类型为blob
  
      // 请求成功的回调函数
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          // 请求成功，获取响应的Blob对象
          const responseBlob = xhr.response;
          resolve(responseBlob);
        } else {
          // 请求失败，返回错误信息
          reject(new Error(xhr.statusText));
        }
      };
  
      // 请求错误的回调函数
      xhr.onerror = function () {
        reject(new Error('Network error'));
      };
  
      // 发送请求
      xhr.send(formData);
    });
  }