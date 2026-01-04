export function defineMessages(messageMap) {
  Object.entries(messageMap).forEach(([key, msg]) => {
    if (!msg.id || !msg.defaultMessage) {
      throw new Error(
        `Invalid message "${key}". Each message must have id and defaultMessage`
      );
    }
  });

  return messageMap;
}
