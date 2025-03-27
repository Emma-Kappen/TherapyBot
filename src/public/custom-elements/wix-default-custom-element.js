<!DOCTYPE html>
<html>
<head>
    <script>
        let mediaRecorder;
        let audioChunks = [];

        window.onload = function () {
            window.addEventListener("message", async (event) => {
                if (event.data.action === "startRecording") {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = (event) => {
                        audioChunks.push(event.data);
                    };
                    mediaRecorder.start();
                } 
                else if (event.data.action === "stopRecording") {
                    mediaRecorder.stop();
                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                        audioChunks = [];

                        // Convert Blob to Base64 and send it to Wix
                        const reader = new FileReader();
                        reader.readAsDataURL(audioBlob);
                        reader.onloadend = () => {
                            window.parent.postMessage({ audioData: reader.result }, "*");
                        };
                    };
                }
            });
        };
    </script>
</head>
<body>
    <button onclick="window.parent.postMessage({ action: 'startRecording' }, '*')">Start</button>
    <button onclick="window.parent.postMessage({ action: 'stopRecording' }, '*')">Stop</button>
</body>
</html>
