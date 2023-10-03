import moment from 'moment';

export const defaultTheme = () => {
  /** @type {import('@types/prabha').ThemeConfiguration} */
  const theme = {
    levels: {
      info: "INFO",
      warn: "WARN",
      error: "ERRR",
      debug: "DBUG",
    },
    date: "DD/MM/YYYY HH:mm:ss",
    message: "[%date] %level | %log",
  }

  return theme
}

export const modernTheme = () => {
  /** @type {import('@types/prabha').ThemeConfiguration} */
  const theme = {
    levels: {
      info: "bgGreenBright(black( INFO ))",
      warn: "bgYellowBright(black( WARN ))",
      error: "bgRedBright(black( ERROR ))",
      debug: "bgWhiteBright(black( DEBUG ))",
    },
    date: "bgBlueBright(black( hh:mm:ss))",
    message: "%date %level %log",
  }

  return theme
}

export class Colors {
  static styles = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    overline: "\x1b[53m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    blackBright: '\x1b[90m',
    gray: '\x1b[90m',
    grey: '\x1b[90m',
    redBright: '\x1b[91m',
    greenBright: '\x1b[92m',
    yellowBright: '\x1b[93m',
    blueBright: '\x1b[94m',
    magentaBright: '\x1b[95m',
    cyanBright: '\x1b[96m',
    whiteBright: '\x1b[97m',
    whiteBrighest: '\x1b[15m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgBlackBright: '\x1b[100m',
    bgGray: '\x1b[100m',
    bgGrey: '\x1b[100m',
    bgRedBright: '\x1b[101m',
    bgGreenBright: '\x1b[102m',
    bgYellowBright: '\x1b[103m',
    bgBlueBright: '\x1b[104m',
    bgMagentaBright: '\x1b[105m',
    bgCyanBright: '\x1b[106m',
    bgWhiteBright: '\x1b[107m',
  };


  static parse(str) {
    const nonNestedRegex = /(\w+)\(([^()]+)\)/g;
    str = str.replace(nonNestedRegex, (match, functionName, argument) => {
      if (this.styles.hasOwnProperty(functionName)) {
        const argValue = this.parse(argument); // Recursively handle nested function calls
        return `${this.styles[functionName]}${argValue}${this.styles['reset']}`;
      } else {
        return match;
      }
    });

    // Match nested function calls
    const nestedRegex = /(\w+)\(([^()]+)\)/;
    while (nestedRegex.test(str)) {
      str = str.replace(nestedRegex, (match, functionName, argument) => {
        if (this.styles.hasOwnProperty(functionName)) {
          const argValue = this.parse(argument); // Recursively handle nested function calls
          return `${this.styles[functionName]}${argValue}${this.styles['reset']}`;
        } else {
          return match;
        }
      });
    }

    return str;
  }

  static format(mode, str) {
    if (!this.styles[mode]) throw new Error("Unknown styles in the colors.js")

    return `${this.styles[mode]}${str}${this.styles['reset']}`
  }
}

export class Logger {
  config

  constructor(config) {
    /** @type {import("@types/prabha").ThemeConfiguration} */
    let defaultConfig;

    if (typeof config === "string") {
      switch (config) {
        case "modern":
          defaultConfig = modernTheme()
          break;
        case "default":
          defaultConfig = defaultTheme()
          break;

        default:
          defaultConfig = defaultTheme()
          break;
      }

      this.config = defaultConfig
    } else {
      switch (config?.theme || "default") {
        case "default":
          defaultConfig = defaultTheme()
          break;

        case "modern":
          defaultConfig = modernTheme()
          break;

        default:
          defaultConfig = defaultTheme()
          break;
      }

      this.config = {
        theme: this.config || "default",
        ...defaultConfig,
        ...config
      }
    }
  }

  info(...message) {
    this.log("info", ...message)
  }

  warn(...message) {
    this.log("warn", ...message)
  }

  error(...message) {
    this.log("error", ...message)
  }

  debug(...message) {
    this.log("debug", ...message)
  }

  log(level, ...message) {
    const date = moment();
    const { cleanedStr, colorCodes } = this.removeANSIEscapeCodes(Colors.parse(this.config.date));
    const formattedDate = this.addColorCodes(cleanedStr, date, colorCodes);

    for (const msg of message) {
      const template = this.config.message
        .replace("%date", formattedDate)
        .replace("%level", this.config.levels[level])
        .replace("%log", msg)

      console[level](Colors.parse(template))
    }
  }

  removeANSIEscapeCodes(str) {
    const colorCodes = [];
    const cleanedStr = str.replace(/\x1b\[[0-9;]*m/g, (match) => {
      colorCodes.push(match);
      return '';
    });

    return { cleanedStr, colorCodes };
  }

  addColorCodes(format, date, colorCodes) {
    let formattedString = date.format(format);

    for (const colorCode of colorCodes) {
      formattedString = colorCode + formattedString;
    }

    return formattedString;
  }
}