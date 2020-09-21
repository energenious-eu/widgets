---
title: "TypeScript Configuration"
metaTitle: "Widgets - TypeScript Configuration"
---

## TypeScript in your project

Follow the [getting started](/getting-started) and [installation](/getting-started/0-installation) guides.

Then install the necessary modules:

```bash
npm install typescript ts-loader @babel/preset-env @babel/preset-typescript
```

Then create a `tsconfig.json` file at the root of your project and paste the following configuration:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "strictNullChecks": true,
    "module": "commonjs",
    "jsx": "react",
    "target": "es5",
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```
