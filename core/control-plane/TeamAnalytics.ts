import { ControlPlaneProxyInfo } from "./analytics/IAnalyticsProvider.js";
import { ControlPlaneClient } from "./client.js";
import { AnalyticsConfig } from "../index.js";

/**
 * TeamAnalytics is disabled in CodePiper. All methods are no-ops.
 */
export class TeamAnalytics {
  static provider: undefined = undefined;
  static uniqueId = "NOT_UNIQUE";
  static os: string | undefined = undefined;
  static extensionVersion: string | undefined = undefined;

  static async capture(_event: string, _properties: { [key: string]: any }) {}

  static async setup(
    _config: AnalyticsConfig,
    uniqueId: string,
    extensionVersion: string,
    _controlPlaneClient: ControlPlaneClient,
    _controlPlaneProxyInfo: ControlPlaneProxyInfo,
  ) {
    TeamAnalytics.uniqueId = uniqueId;
    TeamAnalytics.extensionVersion = extensionVersion;
  }

  static async shutdown() {}
}
