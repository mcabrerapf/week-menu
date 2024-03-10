function parseClassName(className, modifier) {
  if (modifier) return `${className} ${modifier}`;
  return className;
}

export default parseClassName;
