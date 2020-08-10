import { PackageJson, Dependencies } from '../types';

const semver = require('semver');

interface CreateTooltip {
  dependencies: Dependencies;
  packageJson: PackageJson;
}

const tooltipHTML = `
  <div class="widget-base-tooltip">
    <h3>About</h3>
    <h4 class="widget-base-tooltip__description"></h4>
    <h5>Dependencies: </h5>
    <ul class="widget-base-tooltip__versions"></ul>
    <div class="widget-base-tooltip__version">Version: </div>
  </div>

  <div class="icon">?</div>
`;

export const createTooltip = ({
  dependencies,
  packageJson,
}: CreateTooltip): HTMLDivElement | undefined => {
  const container: HTMLDivElement = document.createElement('div');
  container.setAttribute('id', 'widget-base-tooltip__container');
  container.innerHTML = tooltipHTML;

  const version: HTMLDivElement = container.getElementsByClassName(
    'widget-base-tooltip__version'
  )[0] as HTMLDivElement;
  version.textContent += packageJson.version;

  const description: HTMLDivElement = container.getElementsByClassName(
    'widget-base-tooltip__description'
  )[0] as HTMLDivElement;
  description.textContent = packageJson.description;

  const versions: HTMLUListElement = container.getElementsByClassName(
    'widget-base-tooltip__versions'
  )[0] as HTMLUListElement;

  for (let d in dependencies) {
    const li = document.createElement('li');

    li.innerText =
      dependencies[d] + ': ' + semver.coerce(packageJson.dependencies[dependencies[d]]);
    versions.appendChild(li);
  }

  return container;
};
