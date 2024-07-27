import { useEffect, useRef, useState } from "react";
import { MusicMessageSchema, MusicDataMessage } from "../types/MusicDataMessage";

const useWebSocket = (url: string) => {
  const [message, setMessage] = useState<MusicDataMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;
    
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const message = MusicMessageSchema.parse(data);
        setMessage(message);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return message;
};

export { useWebSocket };