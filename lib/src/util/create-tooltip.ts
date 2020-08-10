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
    <div class="widget-base-tooltip__dependencies">
      <ul class="widget-base-tooltip__versions"></ul>
    </div>
    <div class="widget-base-tooltip__version">Version: </div>
  </div>

  <div class="icon">?</div>
`;

export const createTooltip = ({
  dependencies,
  packageJson,
}: CreateTooltip): HTMLDivElement | undefined => {
  const hiddenDOM = document.createElement('div');
  hiddenDOM.setAttribute('style', 'display: none');
  document.body.appendChild(hiddenDOM);

  const container: HTMLDivElement = document.createElement('div');
  container.setAttribute('id', 'widget-base-tooltip__container');
  container.innerHTML = tooltipHTML;

  hiddenDOM.appendChild(container);

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

  if (dependencies.length > 0) {
    const dependenciesTitle = document.createElement('h5');
    dependenciesTitle.textContent = 'Dependencies: ';
    versions.parentNode?.insertBefore(dependenciesTitle, versions);

    for (let d in dependencies) {
      const li = document.createElement('li');

      li.innerText =
        dependencies[d] + ': ' + semver.coerce(packageJson.dependencies[dependencies[d]]);
      versions.appendChild(li);
    }
  }

  hiddenDOM.parentElement?.removeChild(hiddenDOM);

  return container;
};
