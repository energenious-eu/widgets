function muteConsole() {
  console.log = jest.fn();
  console.warn = jest.fn();
}

export default muteConsole;
