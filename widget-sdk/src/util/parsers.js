module.exports = {
  parseClassName: (name) => {
    return name && name !== 'undefined'
    ? name[0].toLowerCase() + name.substr(1)
    : 'cleanslate';
  }
}
