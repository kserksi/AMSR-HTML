document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById("aud");
    const playButton = document.getElementById("playButton");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // 检查audio, playButton, loadingIndicator是否被正确获取
    if (!audio || !playButton || !loadingIndicator) {
        console.error('One or more elements were not found.');
        return;
    }

    function playAudio() {
        loadingIndicator.classList.remove("d-none");

        // 使用Promise来处理播放操作
        audio.play().then(() => {
            // 成功播放
            loadingIndicator.classList.add("d-none");
            playButton.classList.add("pause-icon");
            playButton.classList.remove("play-icon");
            playButton.setAttribute('aria-label', '暂停音频');
        }).catch((error) => {
            // 播放失败
            loadingIndicator.classList.add("d-none");
            alert('Sorry, there was an error playing the audio. Please try again.');
            console.error('Audio playback error:', error); // 在控制台记录错误
            // 可以在这里添加将错误信息发送到服务器端的逻辑
        });
    }

    function setupAudioEventListeners() {
        // 更新播放/暂停按钮图标
        audio.addEventListener('play', () => {
            playButton.classList.add("pause-icon");
            playButton.classList.remove("play-icon");
            playButton.setAttribute('aria-label', '暂停音频');
        });

        audio.addEventListener('pause', () => {
            playButton.classList.add("play-icon");
            playButton.classList.remove("pause-icon");
            playButton.setAttribute('aria-label', '播放音频');
        });

        // 错误处理增强
        audio.addEventListener('error', function() {
            console.error('Audio playback error:', audio.error);
            alert('Sorry, there was an error playing the audio. Please try again.');
            // 可以在这里添加将错误信息发送到服务器端的逻辑
        });
    }

    // 使用CSS类来切换图标，减少DOM操作
    playButton.classList.add("play-icon"); // 默认为播放图标

    setupAudioEventListeners();

    // 与之前直接操作innerHTML相比，这里使用了className的切换
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            playAudio();
        } else {
            audio.pause();
        }
    });
});

