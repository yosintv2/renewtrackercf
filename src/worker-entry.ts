if (typeof MessageChannel === "undefined") {
  const channels = new Set<{ port1: MessagePort; port2: MessagePort }>();

  class SimpleMessagePort implements MessagePort {
    onmessage: ((this: MessagePort, ev: MessageEvent) => unknown) | null = null;
    onmessageerror: ((this: MessagePort, ev: MessageEvent) => unknown) | null = null;
    private closed = false;

    postMessage(message: unknown, transfer?: StructuredSerializeOptions): void {
      if (this.closed) return;
    }

    start(): void {}
    close(): void { this.closed = true; }

    addEventListener(): void {}
    removeEventListener(): void {}
    dispatchEvent(): boolean { return true; }
  }

  class SimpleMessageChannel {
    readonly port1: SimpleMessagePort;
    readonly port2: SimpleMessagePort;

    constructor() {
      this.port1 = new SimpleMessagePort();
      this.port2 = new SimpleMessagePort();
    }
  }

  (globalThis as any).MessageChannel = SimpleMessageChannel;
}

export { createExports } from "@astrojs/cloudflare/entrypoints/server";
