import { IdeInfo } from "../index.js";

export enum PosthogFeatureFlag {
  AutocompleteTimeout = "autocomplete-timeout",
  RecentlyVisitedRangesNumSurroundingLines = "recently-visited-ranges-num-surrounding-lines",
}

export const EXPERIMENTS: {
  [key in PosthogFeatureFlag]: {
    [key: string]: { value: any };
  };
} = {
  [PosthogFeatureFlag.AutocompleteTimeout]: {
    control: { value: 150 },
  },
  [PosthogFeatureFlag.RecentlyVisitedRangesNumSurroundingLines]: {
    control: { value: null },
  },
};

/**
 * Telemetry is disabled in CodePiper. All methods are no-ops.
 * The class interface is preserved to avoid cascading import changes.
 */
export class Telemetry {
  static client: undefined = undefined;
  static uniqueId = "NOT_UNIQUE";
  static os: string | undefined = undefined;
  static ideInfo: IdeInfo | undefined = undefined;

  static async captureError(_errorName: string, _error: unknown) {}

  static async capture(
    _event: string,
    _properties: { [key: string]: any },
    _sendToTeam: boolean = false,
    _isExtensionActivationError: boolean = false,
  ) {}

  static shutdownPosthogClient() {}

  static async setup(_allow: boolean, uniqueId: string, ideInfo: IdeInfo) {
    Telemetry.uniqueId = uniqueId;
    Telemetry.ideInfo = ideInfo;
  }

  static async getFeatureFlag(_flag: PosthogFeatureFlag) {
    return undefined;
  }

  static async getValueForFeatureFlag(_flag: PosthogFeatureFlag) {
    return undefined;
  }
}
