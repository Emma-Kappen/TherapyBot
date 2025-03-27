import { processVoiceInput } from 'backend/therapybot.jsw';

$w.onReady(function () {
  // Set up speech recognition using Web Speech API here (STT)
  // When you get the transcript, call the backend:
  
  async function handleUserVoiceInput(transcript) {
    $w('#recordButton').onClick(() => {
      const result = await processVoiceInput(transcript);
      if(result.success) {
        // Display the text response
        $w("#conversationBox").text = result.response;
        // Convert the text response to voice using SpeechSynthesis
        speakResponse(result.response);
      } else {
        console.error("LLM Error:", result.error);
    }
})
    
  }
  
  // Example function to convert text to speech (TTS)
  function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN'; // Set language as needed
    window.speechSynthesis.speak(utterance);
  }
  
  // Assume you call handleUserVoiceInput() with the transcript from your STT logic.
});


