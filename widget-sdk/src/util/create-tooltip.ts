import { PackageJson, Dependencies } from '../types';

const semver = require('semver');

interface CreateTooltip {
  dependencies: Dependencies;
  packageJson: PackageJson;
}

// make a perfect circle (second answer): https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
export const createTooltip = ({ dependencies, packageJson }: CreateTooltip): HTMLDivElement => {
  const container: HTMLDivElement = document.createElement('div');
  const dummy: HTMLDivElement = document.createElement('div');
  const icon: HTMLDivElement = document.createElement('div');

  dummy.setAttribute('id', 'dummy');
  container.setAttribute('id', 'container');
  icon.setAttribute('id', 'element');

  const tooltip: HTMLSpanElement = document.createElement('span');
  const about: HTMLHeadingElement = document.createElement('h3');
  const description: HTMLDivElement = document.createElement('div');
  const version: HTMLDivElement = document.createElement('div');
  const versions: HTMLUListElement = document.createElement('ul');

  tooltip.setAttribute('class', 'widget-base-tooltip');
  container.setAttribute('class', 'widget-base-tooltip-base');
  icon.innerText = '?';
  about.innerText = 'About';
  version.innerText = 'Version: ' + packageJson.version;
  description.innerText = packageJson.description;
  versions.innerText = 'Packages';

  container.appendChild(tooltip);
  container.appendChild(dummy);
  container.appendChild(icon);
  tooltip.appendChild(about);
  tooltip.appendChild(description);
  tooltip.appendChild(version);
  tooltip.appendChild(versions);

  for (let d in dependencies) {
    const li = document.createElement('li');
    li.innerText =
      dependencies[d] + ' : ' + semver.coerce(packageJson.dependencies[dependencies[d]]);
    versions.appendChild(li);
  }
  // container.setAttribute("class",EmbeddableWidget.options.className)
  return container;
};
