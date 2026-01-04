# Scalable Frontend Architecture

A **Vite + React** project demonstrating **enterprise-grade frontend patterns** inspired by **Guidewire Jutro**.

This repository shows how to build a **scalable, maintainable React application** with:

- Component-scoped i18n
- Centralized message aggregation
- Design-token-based SCSS styling
- Clean component APIs (barrel files)
- Global constants
- Safe defaults, prop validation, and accessibility

This is **architecture-first**, not a demo app.

---

## 🧱 Tech Stack

- **React 18**
- **Vite**
- **react-intl** – Internationalization
- **Sass (SCSS Modules)** – Styling
- **prop-types** – Runtime prop validation

---

## 📁 Project Structure

src/
├── components/
│ ├── common/
│ │ ├── ImageCard/
│ │ │ ├── ImageCard.jsx
│ │ │ ├── ImageCard.messages.js
│ │ │ ├── ImageCard.module.scss
│ │ │ └── index.js
│ │ └── index.js
│ └── index.js
├── constants/
│ ├── app.js
│ ├── ui.js
│ ├── regex.js
│ └── index.js
├── i18n/
│ ├── defineMessages.js
│ ├── messages.js
│ ├── translator.js
│ └── index.js
├── styles/
│ ├── \_colors.scss
│ ├── \_spacing.scss
│ ├── \_typography.scss
│ ├── \_radii.scss
│ ├── \_shadows.scss
│ ├── \_tokens.scss
│ └── index.scss
├── App.jsx
└── main.jsx

---

## 🌍 Internationalization (i18n)

### Why this setup?

- Messages live **next to components**
- No hardcoded UI strings
- Messages are validated and aggregated at build time
- Clean `translator()` abstraction (Jutro-style)

---

### Defining messages

**`ImageCard.messages.js`**

```js
import { defineMessages } from "@i18n/defineMessages";

export const messages = defineMessages({
  title: {
    id: "imageCard.title",
    defaultMessage: "Image Card Component {name}",
  },
  description: {
    id: "imageCard.description",
    defaultMessage: "This is an image card component.",
  },
});
```

Rules
• Files must be named \*.messages.js
• Must export messages
• IDs must be unique
• Never import @/i18n/index inside message files

### Using translator

```js
import { useTranslator } from "@i18n";

const translator = useTranslator();
translator(messages.title, { name: "Sample" });
```

Supports
• Variables
• Numbers, dates, currency

### Global message aggregation

All messages under src/ are automaticall discovered:

```js
import.meta.glob("../**/*.messages.js", { eager: true });
```

No manual imports. Scales automatically

### 🎨 Styling & Design Tokens (SCSS)

Philosophy
• No hardcoded colors or spacing
• Centralized design tokens
• SCSS Modules for isolation
• Tokens injected globally

#### Tokens

\_tokens.scss

```scss
@forward "colors";
@forward "spacing";
@forward "typography";
@forward "radii";
@forward "shadows";
```

Injected globally by VITE

```js
scss: {
  additionalData: `@use "@/styles/tokens" as *;`,
}
```

#### Using tokens in components

```scss
.imageCard {
  background: $color-surface;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
}
```
