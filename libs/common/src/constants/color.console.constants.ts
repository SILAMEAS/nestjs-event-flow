import { getPortByServiceName, Service } from "./services.constants";

export const ColorConsole = {
    BLUE: '\x1b[34m%s\x1b[0m',
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
} as const;
type ConsoleColor = (typeof ColorConsole)[keyof typeof ColorConsole];

export const Custom = {
    ConsolePortRunning: (text: Service) => {
        console.log(ColorConsole.GREEN,"---------------------------------------------------------------------------")
        console.log(`${ColorConsole.GREEN} ${ColorConsole.BLUE}`, `======== ${text.toUpperCase()} running on port: `, `http://localhost:${getPortByServiceName(text as any)}`);
        console.log(ColorConsole.GREEN,"---------------------------------------------------------------------------")
    }
}