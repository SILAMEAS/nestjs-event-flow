import { ENV } from '@app/common/constants/services.constants';

export const ColorConsole = {
  BLUE: '\x1b[34m%s\x1b[0m',
  RED: '\x1b[31m%s\x1b[0m',
  GREEN: '\x1b[32m%s\x1b[0m',
} as const;
type ConsoleColor = (typeof ColorConsole)[keyof typeof ColorConsole];

export const toUrlByPort = (Port: number) =>
  `${ENV.PRODUCTION_MODE ? 'https' : 'http'}://${ENV.HOST}:${Port}`;
export const Custom = {
  ConsolePortRunning: ({ port, name }: { name: string; port: number }) => {
    console.log(
      ColorConsole.GREEN,
      '---------------------------------------------------------------------------',
    );
    console.log(
      `${ColorConsole.GREEN} ${ColorConsole.BLUE}`,
      `======== ${name.toUpperCase()} running on port: `,
      `${toUrlByPort(port)}`,
    );
    console.log(
      ColorConsole.GREEN,
      '---------------------------------------------------------------------------',
    );
  },
};
