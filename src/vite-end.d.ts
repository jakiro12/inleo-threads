/// <reference types="vite/client" />

interface Window {
  hive_keychain?: {
    requestHandshake: (
      callback: (response: any) => void
    ) => void;

    requestBroadcast: (
      username: string,
      operations: any[],
      keyType: string,
      callback: (response: any) => void
    ) => void;

    [key: string]: any;
  };
}