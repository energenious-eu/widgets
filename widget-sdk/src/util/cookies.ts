export function getCookie(name: string): string | undefined {
  const value: string = '; ' + document.cookie;
  const parts: string[] = value.split('; ' + name + '=');
  if (parts.length == 2) {
    const lastPart: string | undefined = parts.pop();
    if (lastPart) {
      return lastPart.split(';').shift();
    }
  }
}
