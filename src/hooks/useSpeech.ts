import { useCallback, useRef, useState, useEffect } from 'react';

// Web Speech API 类型声明
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  // 用 ref 保存最新的回调，避免闭包过期
  const onResultRef = useRef<((text: string, isFinal: boolean) => void) | null>(null);

  // 预加载语音列表
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      window.speechSynthesis.getVoices();
    }
  }, []);

  const getSynth = useCallback(() => {
    if (!synthRef.current && typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return synthRef.current;
  }, []);

  // AI 语音播报
  const speak = useCallback((text: string, onEnd?: () => void) => {
    const synth = getSynth();
    if (!synth) { onEnd?.(); return; }
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = synth.getVoices();
    const zhVoice = voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) utterance.voice = zhVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); onEnd?.(); };
    utterance.onerror = () => { setIsSpeaking(false); onEnd?.(); };

    synth.speak(utterance);
  }, [getSynth]);

  const stopSpeaking = useCallback(() => {
    const synth = getSynth();
    if (synth) { synth.cancel(); }
    setIsSpeaking(false);
  }, [getSynth]);

  // 开始语音识别 - 使用 ref 确保回调始终最新
  const startListening = useCallback((onResult: (text: string, isFinal: boolean) => void) => {
    // 保存回调到 ref
    onResultRef.current = onResult;

    const SpeechRecognitionAPI = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;
    
    if (!SpeechRecognitionAPI) {
      console.warn('浏览器不支持语音识别，请使用 Chrome 浏览器');
      alert('浏览器不支持语音识别，请使用 Chrome 浏览器。你也可以在下方文字框直接输入回答。');
      return;
    }

    // 先停掉之前的
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-CN';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setInterimText('');
        // 使用 ref 中的最新回调
        if (onResultRef.current) {
          onResultRef.current(finalTranscript, true);
        }
      } else if (interimTranscript) {
        setInterimText(interimTranscript);
        if (onResultRef.current) {
          onResultRef.current(interimTranscript, false);
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn('语音识别错误:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert('麦克风权限被拒绝，请在浏览器设置中允许访问麦克风。');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error('语音识别启动失败:', err);
      // 可能是已经启动了，先停止再启动
      try { recognition.abort(); } catch { /* ignore */ }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
  }, []);

  const cleanup = useCallback(() => {
    stopListening();
    stopSpeaking();
  }, [stopListening, stopSpeaking]);

  return {
    isListening,
    isSpeaking,
    interimText,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    cleanup,
  };
}
