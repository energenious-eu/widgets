import { loadScript } from './loaders';
import { FIX_TYPE, Script, Options } from '../types';

export const prepareScripts = (
  widgetOptions: Partial<Options>,
  scripts: Script[] = [],
  skip: string[] = []
): FIX_TYPE[] => {
  const scriptsToLoad: Script[] = [];

  for (let key in scripts) {
    const script: Script = scripts[key];
    if (skip.indexOf(script.name) !== -1) continue;
    if (script.dependsOn) {
      const index = scripts.findIndex((s) => s.name === script.dependsOn);
      const scriptDep: Script = scripts[index];

      if (scriptsToLoad.filter((s: Script) => s.name === script.dependsOn).length == 0) {
        scriptsToLoad.push(scriptDep);
        skip.push(scriptDep.name);
      }
    }
    scriptsToLoad.push(script);
  }

  const promises: FIX_TYPE[] = [];
  scriptsToLoad.forEach((script) => promises.push(
      loadScript({
        script,
        options: widgetOptions,
        scripts: scriptsToLoad,
      })
    )
  );

  return promises;
};
