import { useEffect, useRef } from "react";

import styles from "./WebSocketLogger.module.css";

export const WebSocketLogger: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://echo.websocket.org");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocketLogger: WebSocket соединение успешно установлено.");
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log(`[WebSocket] Получено сообщение: ${event.data}`);
    };

    socket.onerror = (error) => {
      console.error("[WebSocket] Ошибка соединения:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log("WebSocket соединение закрыто в cleanup.");
      }
    };
  }, []);
  return (
    <div className={styles.wrap}>
      <h3>WebSocketLogger</h3>
      <p className={styles.text}>
        Компонент подключен к тестовому серверу. <br />
        Входящие сообщения и статус подключения выводятся в консоль браузера.
      </p>
    </div>
  );
};

export default WebSocketLogger;
