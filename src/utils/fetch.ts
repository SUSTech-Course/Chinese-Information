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
