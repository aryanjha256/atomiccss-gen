# atomiccss-gen

A tiny atomic CSS generator that lets you define utility classes like `w-[50%]`, `bg-[red]`, `p-[10px]` and generates real CSS on the fly. Think of it as a minimal, zero-config alternative to Tailwind CSS, with support for arbitrary values out of the box.

[![npm version](https://img.shields.io/npm/v/atomiccss-gen.svg)](https://www.npmjs.com/package/atomiccss-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Zero config**: Works out of the box with no setup required
- **Arbitrary values**: Use any CSS value with the `[value]` syntax
- **Watch mode**: Automatically update CSS when your files change
- **Small footprint**: Generates only the CSS you actually use
- **TypeScript support**: Written in TypeScript with type definitions

## 📦 Installation

### Global Installation

```bash
npm install -g atomiccss-gen
```

### Local Project Installation

```bash
npm install atomiccss-gen --save-dev
```

### One-time Use

```bash
npx atomiccss-gen
```

## 🛠️ Usage

### Generate CSS for a single class

```bash
atomiccss-gen w-[50%]
# Output: .w-\[50\%\]{width:50%;}
```

### Generate multiple classes

```bash
atomiccss-gen w-[50%] h-[200px] text-[#ff5500]
# Output:
# .w-\[50\%\]{width:50%;}
# .h-\[200px\]{height:200px;}
# .text-\[\#ff5500\]{color:#ff5500;}
```

> **Note**: The special characters in class names like `[`, `]`, `%`, `#`, etc. are automatically escaped in the generated CSS selectors, as required by CSS syntax rules. This ensures the selectors work correctly in all browsers.

### Scan a project and generate CSS file

```bash
atomiccss-gen --scan ./src --out ./styles/atomic.css
```

### Watch mode

```bash
atomiccss-gen --scan ./src --out ./styles/atomic.css --watch
```

## 📚 Supported Utility Classes

The library currently supports the following utility classes:

| Prefix     | CSS Property       | Example                   |
| ---------- | ------------------ | ------------------------- |
| `w-`       | width              | `w-[50%]`                 |
| `h-`       | height             | `h-[200px]`               |
| `text-`    | color              | `text-[#ff0000]`          |
| `bg-`      | background-color   | `bg-[#f5f5f5]`            |
| `p-`       | padding            | `p-[10px]`                |
| `px-`      | padding-left/right | `px-[20px]`               |
| `py-`      | padding-top/bottom | `py-[15px]`               |
| `pt-`      | padding-top        | `pt-[5px]`                |
| `pr-`      | padding-right      | `pr-[5px]`                |
| `pb-`      | padding-bottom     | `pb-[5px]`                |
| `pl-`      | padding-left       | `pl-[5px]`                |
| `m-`       | margin             | `m-[10px]`                |
| `mx-`      | margin-left/right  | `mx-[20px]`               |
| `my-`      | margin-top/bottom  | `my-[15px]`               |
| `mt-`      | margin-top         | `mt-[5px]`                |
| `mr-`      | margin-right       | `mr-[5px]`                |
| `mb-`      | margin-bottom      | `mb-[5px]`                |
| `ml-`      | margin-left        | `ml-[5px]`                |
| `flex-`    | flex               | `flex-[1]`                |
| `gap-`     | gap                | `gap-[10px]`              |
| `opacity-` | opacity            | `opacity-[0.5]`           |
| `border-`  | border             | `border-[1px solid #ccc]` |
| `rounded-` | border-radius      | `rounded-[4px]`           |

## 🧩 API Usage

You can also use the package programmatically:

```javascript
import { generateCssForClass, scanAndGenerate } from "atomiccss-gen";

// Generate CSS for a single class
const css = generateCssForClass("w-[50%]");
console.log(css); // .w-[50%]{width:50%;}

// Scan a project and generate CSS
scanAndGenerate({
  srcDir: "./src",
  outFile: "./styles/atomic.css",
  watch: true,
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
