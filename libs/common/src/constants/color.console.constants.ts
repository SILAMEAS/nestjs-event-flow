export const ColorConsole = {
  BLUE: '\x1b[34m%s\x1b[0m',
  RED: '\x1b[31m%s\x1b[0m',
  GREEN: '\x1b[32m%s\x1b[0m',
} as const;
type ConsoleColor = (typeof ColorConsole)[keyof typeof ColorConsole];

export const Custom = {
  ConsolePortRunning: (text: string) => {
    console.log(
      ColorConsole.GREEN,
      '---------------------------------------------------------------------------',
    );
    console.log(
      `${ColorConsole.GREEN} ${ColorConsole.BLUE}`,
      `======== ${text.toUpperCase()} running on port: `,
      `${text}`,
    );
    console.log(
      ColorConsole.GREEN,
      '---------------------------------------------------------------------------',
    );
  },
};
