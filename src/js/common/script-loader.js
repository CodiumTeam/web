export const ScriptLoader = {
  _scripts: new Set(),
  addScript: function (src, attrs = {}) {
    if (this._scripts.has(src)) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    Object.entries(attrs).forEach(([name, value]) => {
      script.setAttribute(name, value);
    });
    this._insertHeadChild(script);
    this._scripts.add(src);
  },
  _insertHeadChild: function (element) {
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(element);
  },
};
