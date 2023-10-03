declare module "prabha" {
  export interface Configuration {
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

  export interface ThemeConfiguration extends Omit<import('@types/prabha').Configuration, "theme"> {}

  export class Logger {
    constructor(config: Configuration | "default" | "modern")

    info(...message: string[]): void
    warn(...message: string[]): void
    debug(...message: string[]): void
    error(...message: string[]): void
  }
}