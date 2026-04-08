import { IdeInfo } from "../../index.js";

/**
 * Sentry is disabled in CodePiper. All methods are no-ops.
 * The class/function interfaces are preserved to avoid cascading import changes.
 */
export class SentryLogger {
  static client: undefined = undefined;
  static scope: undefined = undefined;
  static uniqueId = "NOT_UNIQUE";
  static os: string | undefined = undefined;
  static ideInfo: IdeInfo | undefined = undefined;
  static allowTelemetry: boolean = false;

  static async setup(
    _allowAnonymousTelemetry: boolean,
    uniqueId: string,
    ideInfo: IdeInfo,
    _userEmail?: string,
  ) {
    SentryLogger.uniqueId = uniqueId;
    SentryLogger.ideInfo = ideInfo;
  }

  static get lazyClient(): undefined {
    return undefined;
  }

  static get lazyScope(): undefined {
    return undefined;
  }

  static shutdownSentryClient() {}
}

export function initializeSentry(): {
  client: undefined;
  scope: undefined;
} {
  return { client: undefined, scope: undefined };
}

export function createSpan<T>(
  _operation: string,
  _name: string,
  callback: () => T | Promise<T>,
): T | Promise<T> {
  return callback();
}

export function captureException(
  _error: Error,
  _context?: Record<string, any>,
) {}

export function captureLog(
  _message: string,
  _level: string = "info",
  _context?: Record<string, any>,
) {}
