const create = (a, b) => Object.freeze(Object.create(a, b));

const SSML = Object.freeze({
  get selfClosing() {
    return !this.children.length;
  },

  toString() {
    if(this.fragment) {
      return this.children.join('');
    }

    let tag = this.tag;
    let output = `<${tag}`;
    if(this.attributes) {
      let attributes = Array.from(this.attributes);
      let attrStr = attributes.map(([key, value]) => `${key}="${value}"`).join(' ')
      output += ' '  + attrStr;
    }
    output += this.children.join('');
    if(this.selfClosing) {
      output += `/>`;
    } else {
      output += `></${tag}>`;
    }
    return output;
  }
});

const createTag = (tag, attrs, children = []) => create(SSML, {
  tag: {
    enumerable: true,
    value: tag
  },
  attributes: {
    enumerable: true,
    value: attrs
  },
  children: {
    enumerable: true,
    value: children
  }
});

const toMap = obj => new Map(Object.entries(obj));

exports.ssml = (...children) => create(SSML, {
  fragment: { enumerable: true, value: true },
  children: {
    enumerable: true,
    value: children
  }
});

exports.break = exports.pause = (timeOrOptions) => {
  let attrs = typeof timeOrOptions === 'string'
    ? new Map([['time', timeOrOptions]])
    : toMap(timeOrOptions);
  return createTag('break', attrs);
};