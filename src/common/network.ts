import { networkInterfaces } from "node:os";

export function getLanUrl(port: number): string {
    const interfaces = Object.values(networkInterfaces())
        .flat()
        .filter(
            network =>
                network &&
                network.family === "IPv4" &&
                !network.internal
        );

    if (interfaces.length === 0) {
        throw new Error("No se encontró una interfaz de red LAN.");
    }

    return `http://${interfaces[0]!.address}:${port}`;
}

export function getBaseUrl(): string {
    const port = Number(process.env.PORT ?? 3000);
    return getLanUrl(port);
}
