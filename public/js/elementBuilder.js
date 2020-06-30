class ElementBuilder {
  constructor(elementName) {
    this.element = document.createElement(elementName);

    this.className = (name) => {
      this.element.className = name;
      return this;
    };
    this.src = (src) => {
      this.element.src = src;
      return this;
    };
    this.alt = (alt) => {
      this.element.alt = alt;
      return this;
    };
    this.html = (htmlValue) => {
      this.element.innerHTML = htmlValue;
      return this;
    };
    this.url = (url) => {
      this.element.href = url;
      return this;
    };
    this.addEvent = (name, fn) => {
      this.element.addEventListener(name, fn);
      return this;
    };
    this.appendTo = (parent) => {
      if (parent instanceof ElementBuilder) {
        parent.build().appendChild(this.element);
      } else {
        parent.appendChild(this.element);
      }
      return this;
    };
    this.build = () => {
      return this.element;
    };
  }
}

const builder = {
  create: function (elementName) {
    return new ElementBuilder(elementName);
  },
};
