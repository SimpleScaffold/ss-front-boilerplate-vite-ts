---

# 📚 ss-react-boilerplate-ts User Guide

## Table of Contents
0. [Project Structure (FSD Perspective)](#project-structure-fsd-perspective)
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Installation & Run](#installation--run)
4. [State Management Structure](#state-management-structure)
5. [Theme & Color Settings](#theme--color-settings)
6. [Action Naming Convention](#action-naming-convention)
7. [Reducer Usage (Sync/Async)](#reducer-usage-syncasync)
8. [Dynamic Routing Structure](#dynamic-routing-structure)
9. [SS Components & shadcn Library Issues](#ss-components--shadcn-library-issues)
10. [Code Style (Prettier) Usage](#code-style-prettier-usage)
11. [Other TODOs & Improvements](#other-todos--improvements)

---

## 0. Project Structure (FSD Perspective)

This project is structured based on the **Feature-Sliced Design (FSD)** pattern.  
Each folder is separated by responsibility, aiming for maintainability and scalability as follows:

```
src/
  app/                # App entry point, global settings, store, router, etc.
    api/              # API client and global API settings
    router/           # Router and related utils, types
    store/            # Global state management (redux, etc.)
  assets/             # Static assets like fonts, images, locales
  features/           # Business domain/feature-specific folders
    [feature]/        # e.g., sample, user, etc.
      [Feature].tsx   # UI/logic for the feature
      [feature]Reducer.ts # Reducer for the feature
  pages/              # Route-level page components (including dynamic routing)
    [route]/          # e.g., url, extra, etc.
      [Page].tsx      # Page component for the route
  shared/             # Components, utils, layouts shared across features/pages
    components/       # Common UI components (button, toast, theme, etc.)
    lib/              # External library wrappers, common hooks, styles, etc.
    utils/            # Common utility functions
    layouts/          # Common layout components (header, footer, etc.)
  stories/            # Storybook, documentation, test components
  styles/             # Global styles, variables, reset, etc.
  main.tsx            # App entry point
  App.tsx             # Root component
```

### Folder Role Summary

- **app/**: Global layer for settings, store, router, etc.
- **assets/**: Static resources like fonts, images, locales
- **features/**: Business domain-specific features (each feature can have its own UI, state, business logic)
- **pages/**: Route-level page components, supports dynamic routing
- **shared/**: Common elements reused across features/pages (components, utils, layouts, etc.)
- **stories/**: Storybook, documentation, test components
- **styles/**: Global styles, CSS variables, reset, etc.

---

## 1. Project Overview
- A boilerplate project based on React + TypeScript.
- Designed for fast development, scalability, and maintainability.

---

## 2. Tech Stack
- **React 18**
- **TypeScript**
- **Redux Toolkit** (state management)
- **Vite** (bundler)
- **shadcn/ui** (UI components)
- **Prettier** (code formatter)
- **Cypress** (E2E testing)
- **i18next** (internationalization)

---

## 3. Installation & Run

```bash
yarn install
yarn dev
```

---

## 4. State Management Structure

- Uses **Redux Toolkit** for global state management.
- Store, hooks, and utils are located in `src/app/store/redux/`.
- Each feature has its own slice (reducer).
- Async operations are handled with createAsyncThunk.

### Example
```ts
// src/app/store/redux/reduxStore.tsx
import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from 'src/features/sample/sampleReducer';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    // ...other reducers
  },
});
```

---

## 5. Theme & Color Settings

- Supports **dark mode/light mode**
- Theme colors are managed in `src/shared/components/lib/shadcn/styles/shadcn.pcss` and `colorConstants.tsx`
- For color customization, use [shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator) and apply to  
  `src/shared/components/lib/shadcn/styles/shadcn-variables.css`

---

## 6. Action Naming Convention

- **Basic Rule**
  - Use verb+target format: `get~~`, `edit~~`, `del~~`, `create~~`, etc.
  - If state change is needed, append `Status` at the end
- **Local Reducer**
  - Action names should NOT end with `Fail` or `Success` (due to auto-generation/recognition issues)
  - If needed, use a `todo` prefix or similar for improvement

---

## 7. Reducer Usage (Sync/Async)

### Synchronous Reducer
- Managed as a regular slice reducer
- Example:
  ```ts
  reducers: {
    setValue: (state, action) => { state.value = action.payload; }
  }
  ```

### Asynchronous Reducer
- Use `createAsyncThunk` for async actions
- Handle pending/fulfilled/rejected in extraReducers
- Example:
  ```ts
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => { state.loading = true; })
      .addCase(fetchData.fulfilled, (state, action) => { state.data = action.payload; })
      .addCase(fetchData.rejected, (state) => { state.error = true; });
  }
  ```

---

## 8. Dynamic Routing Structure

- Dynamic routing is implemented in the `src/pages/url/` folder using `[param]` syntax
- Example: `/url/[aid]/Sample.tsx` → `/url/123/Sample`
- **File Naming Rule**: To distinguish from features, it is recommended (not required) to use the `Page` suffix for page components

---

## 9. SS Components & shadcn Library Issues

- When using the shadcn library, there may be issues with the `cn` path after download
- You may need to manually fix the path in `components.json`
- SS components and shadcn components can be used together

---

## 10. Code Style (Prettier) Usage

- Format all code:
  ```bash
  yarn exec prettier . --write
  ```
- **Auto-formatting settings**
  - WebStorm:
    File | Settings | Languages & Frameworks | JavaScript | Prettier  
    jetbrains://WebStorm/settings?name=Languages+%26+Frameworks--JavaScript--Prettier  
    Enable auto-format or format on save
- **TODO**: Apply Prettier automatically on commit (e.g., with husky)

---

## 11. Other TODOs & Improvements

- Add recommended color application feature
- Change label to input feature
- JS performance improvements
- Apply Prettier automatically on git commit (e.g., husky)
- Improve local reducer action naming (e.g., todo prefix)

---

### Contact & Contribution
- Feel free to ask questions, report bugs, or contribute to this project!

---

If you need more detailed examples or explanations for any section, please let me know! 