# Prabha

Universal Logging system for Javascript.
NOTE: This is just a console logging system for now, I may add more useful features in dev version, then release stable one

## API
```ts
class Logger {
  constructor(config: Configuration | "default" | "modern")

  info(...message: string[]): void
  warn(...message: string[]): void
  debug(...message: string[]): void
  error(...message: string[]): void
}

interface Configuration {
  theme: string | "default";

  levels: {
    info: string | "greenBright(INFO)";
    warn: string | "yellowBright(WARN)";
    error: string | "redBright(ERROR)";
    debug: string | "whiteBright(DEBUG)";
  }
  date: string | "DD/MM/YYYY hh:mm:ss A";
  message: string | "[%date %level] %log";
}
```

## Theme Contributing
If you want to add a theme, Please edit the src/lib.js and index.d.ts:
```js
export const theme_nameTheme = () => {
  /** @type {import('@types/prabha').ThemeConfiguration} */
  return ...
}

// and
case "default":
  defaultConfig = defaultTheme()
  break;

case "themeId":
  defaultConfig = theme_nameTheme()
  break;

default:
  ...

// At the Logger constructor, edit it and give your theme id
```

## Contributing
If you have identified a bug in the project and would like to contribute a fix, you can open a Pull Request (PR) to propose your changes. Please follow the project's guidelines for submitting a PR, which may include steps like forking the repository, creating a new branch, making the necessary changes, and submitting the PR for review.

If you prefer not to fix the bug yourself but want to bring it to the attention of the project maintainers, you can open an issue on the project's issue tracker. Describe the bug in detail, including any relevant information such as error messages or steps to reproduce the issue. This will allow the maintainers to investigate and address the problem.

Remember to follow any guidelines or templates provided by the project for reporting bugs or submitting PRs to ensure your contribution is clear and actionable.
