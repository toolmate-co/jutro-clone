import { REGEX } from "../constants/regex.js";
const { MESSAGE_ID_REGEX } = REGEX;

const messageFiles = import.meta.glob("../**/*.messages.js", { eager: true });

const messages = {};

// Helper to extract component name from path
const getComponentName = (filePath) => {
  const parts = filePath.split("/");
  return parts[parts.length - 2];
};

Object.entries(messageFiles).forEach(([filePath, module]) => {
  // ---------- FILE LEVEL VALIDATION ----------
  if (!module.messages) {
    throw new Error(`❌ ${filePath} must export 'messages'`);
  }

  const componentName = getComponentName(filePath);

  Object.entries(module.messages).forEach(([key, msg]) => {
    // ---------- SHAPE VALIDATION ----------
    if (!msg || typeof msg !== "object") {
      throw new Error(`❌ ${filePath}:${key} is not an object`);
    }

    if (!msg.id || !msg.defaultMessage) {
      throw new Error(
        `❌ ${filePath}:${key} must have 'id' and 'defaultMessage'`
      );
    }

    // ---------- TYPE VALIDATION ----------
    if (typeof msg.id !== "string") {
      throw new Error(`❌ ${filePath}:${key}.id must be a string`);
    }

    if (typeof msg.defaultMessage !== "string") {
      throw new Error(`❌ ${filePath}:${key}.defaultMessage must be a string`);
    }

    // ---------- COMPONENT OWNERSHIP VALIDATION ----------
    const normalizeComponentName = (name) =>
      name.charAt(0).toLowerCase() + name.slice(1);

    const expectedPrefix = normalizeComponentName(componentName);

    if (!msg.id.startsWith(expectedPrefix)) {
      throw new Error(
        `❌ Message id "${msg.id}" must start with "${expectedPrefix}"
       (derived from component "${componentName}")`
      );
    }

    // ---------- NAMING CONVENTION ----------
    if (!MESSAGE_ID_REGEX.test(msg.id)) {
      throw new Error(
        `❌ Invalid message id format: ${msg.id}
           Expected: ${componentName}.someKey`
      );
    }

    // ---------- EMPTY STRING PROTECTION ----------
    if (msg.defaultMessage.trim().length === 0) {
      throw new Error(`❌ Empty defaultMessage for ${msg.id}`);
    }

    // ---------- DUPLICATE DETECTION ----------
    if (messages[msg.id]) {
      throw new Error(`❌ Duplicate message id: ${msg.id}`);
    }

    // ---------- REGISTER MESSAGE ----------
    messages[msg.id] = msg.defaultMessage;
  });
});

Object.freeze(messages);

export default messages;
