import fs from "fs";
import { IDE } from "..";
import { getGlobalCodePiperIgnorePath } from "../util/paths";
import { gitIgArrayFromFile } from "./ignore";

export const getGlobalContinueIgArray = () => {
  const contents = fs.readFileSync(getGlobalCodePiperIgnorePath(), "utf8");
  return gitIgArrayFromFile(contents);
};

export const getWorkspaceContinueIgArray = async (ide: IDE) => {
  const dirs = await ide.getWorkspaceDirs();
  return await dirs.reduce(
    async (accPromise, dir) => {
      const acc = await accPromise;
      try {
        const contents = await ide.readFile(`${dir}/.codepiperignore`);
        return [...acc, ...gitIgArrayFromFile(contents)];
      } catch (err) {
        console.error(err);
        return acc;
      }
    },
    Promise.resolve([] as string[]),
  );
};
