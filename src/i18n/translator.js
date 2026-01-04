import { useIntl } from "react-intl";

export function useTranslator() {
  const intl = useIntl();

  return (message, values = {}) => {
    if (!message) {
      console.warn("⚠️ Missing message object");
      return "";
    }

    if (!message.id) {
      console.warn("⚠️ Message missing id", message);
      return "";
    }

    // Optional: warn if defaultMessage is missing
    if (!message.defaultMessage) {
      console.warn(`⚠️ Missing defaultMessage for ${message.id}`);
    }

    try {
      return intl.formatMessage(message, values);
    } catch (error) {
      console.error("❌ Error formatting message:", message.id, error);
      return message.defaultMessage ?? "";
    }
  };
}
