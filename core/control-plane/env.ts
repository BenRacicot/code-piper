import { IdeSettings } from "..";
import { AuthType, ControlPlaneEnv } from "./AuthTypes";

export const EXTENSION_NAME = "codepiper";

/**
 * CodePiper does not use a cloud control plane.
 * All configuration is local. These stubs exist to satisfy
 * interfaces that reference ControlPlaneEnv.
 */
const LOCAL_ONLY_ENV: ControlPlaneEnv = {
  DEFAULT_CONTROL_PLANE_PROXY_URL: "",
  CONTROL_PLANE_URL: "",
  AUTH_TYPE: AuthType.None,
  APP_URL: "https://modelpiper.com/",
};

export async function enableHubContinueDev() {
  return false;
}

export async function getControlPlaneEnv(
  _ideSettingsPromise: Promise<IdeSettings>,
): Promise<ControlPlaneEnv> {
  return LOCAL_ONLY_ENV;
}

export function getControlPlaneEnvSync(
  _ideTestEnvironment?: IdeSettings["continueTestEnvironment"],
): ControlPlaneEnv {
  return LOCAL_ONLY_ENV;
}

export async function useHub(
  _ideSettingsPromise: Promise<IdeSettings>,
): Promise<boolean> {
  return false;
}
