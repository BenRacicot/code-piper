import fs from "fs";
import path from "path";

// Sets up the GLOBAL directory for testing - equivalent to ~/.codepiper
// IMPORTANT: the CODEPIPER_GLOBAL_DIR environment variable is used in utils/paths for getting all local paths
export default async function () {
  process.env.CODEPIPER_GLOBAL_DIR = path.join(__dirname, ".continue-test");
  if (fs.existsSync(process.env.CODEPIPER_GLOBAL_DIR)) {
    fs.rmdirSync(process.env.CODEPIPER_GLOBAL_DIR, { recursive: true });
  }
}
