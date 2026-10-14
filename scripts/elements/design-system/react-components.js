/*
 * React components for the Claude Design system bundle. Each one renders the
 * real custom element (<rais-button> …) from rais-elements.js and writes its
 * props onto it as attributes, which the element converts to the input's type.
 * scripts/elements/design-system.mjs inserts this function into bundle.js and
 * calls it with the namespace and one spec per component; it runs as a classic
 * script after React.
 */
(function (NAMESPACE, SPECS) {
  'use strict';
  var React = window.React;
  if (!React) {
    console.error('[' + NAMESPACE + '] React must load before this bundle.');
    return;
  }
  var h = React.createElement;

  function toAttribute(kind, value) {
    if (kind === 'json') return typeof value === 'string' ? value : JSON.stringify(value);
    if (kind === 'boolean') return value === true || value === '' || value === 'true' ? '' : 'false';
    if (kind === 'string-or-false' && value === false) return 'false';
    return String(value);
  }

  function setRef(ref, value) {
    if (typeof ref === 'function') ref(value);
    else if (ref) ref.current = value;
  }

  function component(spec) {
    var inputByProp = {};
    spec.inputs.forEach(function (input) {
      inputByProp[input.prop] = input;
      (input.aliases || []).forEach(function (alias) {
        inputByProp[alias] = input;
      });
    });
    var eventByProp = {};
    spec.events.forEach(function (event) {
      eventByProp[event.prop] = event.name;
    });
    var warnedChildren = false;

    var Component = React.forwardRef(function (props, forwardedRef) {
      var node = React.useRef(null);
      var handlers = React.useRef({});
      var values = {};
      var host = {};
      var latestHandlers = {};
      Object.keys(props).forEach(function (key) {
        if (inputByProp[key]) values[inputByProp[key].attr] = props[key];
        else if (eventByProp[key]) latestHandlers[eventByProp[key]] = props[key];
        else if (key === 'className') host['class'] = props[key];
        else if (key !== 'children') host[key] = props[key];
      });
      handlers.current = latestHandlers;

      // Inputs: written before paint, and only when they change.
      React.useLayoutEffect(function () {
        var el = node.current;
        spec.inputs.forEach(function (input) {
          var value = values[input.attr];
          if (value === undefined || value === null) {
            if (el.hasAttribute(input.attr)) el.removeAttribute(input.attr);
          } else {
            var text = toAttribute(input.kind, value);
            if (el.getAttribute(input.attr) !== text) el.setAttribute(input.attr, text);
          }
        });
      });

      // Outputs are CustomEvents: on<Output>(event.detail, event).
      React.useLayoutEffect(function () {
        var el = node.current;
        var listeners = spec.events.map(function (event) {
          var listener = function (e) {
            var handler = handlers.current[event.name];
            if (typeof handler === 'function') handler(e.detail, e);
          };
          el.addEventListener(event.name, listener);
          return [event.name, listener];
        });
        return function () {
          listeners.forEach(function (pair) {
            el.removeEventListener(pair[0], pair[1]);
          });
        };
      }, []);

      host.ref = React.useCallback(
        function (el) {
          node.current = el;
          setRef(forwardedRef, el);
        },
        [forwardedRef],
      );

      if (spec.children) {
        // Angular moves projected nodes into the component's template; one
        // stable wrapper keeps React's own children inside it.
        return h(spec.tag, host, h('div', { style: { display: 'contents' } }, props.children));
      }
      if (props.children != null && props.children !== false && !warnedChildren) {
        warnedChildren = true;
        console.warn('[' + NAMESPACE + '] ' + spec.name + ' does not take children; they are not rendered.');
      }
      return h(spec.tag, host);
    });
    Component.displayName = spec.name;
    return Component;
  }

  /** Where assets not embedded in this bundle load from. */
  function raisAssetBase() {
    var base = (window.RaisElements && window.RaisElements.assetBase) || window.RAIS_ASSET_BASE || './assets/';
    return base.replace(/\/?$/, '/');
  }

  /** URL of a Boxicons glyph, e.g. raisIconUrl('bx-search'): a data: URI from this bundle. */
  function raisIconUrl(name) {
    var path = 'boxicons/' + name + '.svg';
    var urls = window.RAIS_ASSETS || {};
    return Object.prototype.hasOwnProperty.call(urls, path) ? urls[path] : raisAssetBase() + path;
  }

  /** A Boxicons glyph drawn as a CSS mask, so it takes any color. */
  function Icon(props) {
    var size = props.size == null ? 16 : props.size;
    var url = 'url("' + raisIconUrl(props.name).replace(/["\\]/g, '\\$&') + '")';
    var rest = { 'aria-hidden': 'true' };
    Object.keys(props).forEach(function (key) {
      if (['name', 'size', 'color', 'style'].indexOf(key) < 0) rest[key] = props[key];
    });
    rest.style = Object.assign(
      {
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: props.color || 'currentColor',
        WebkitMask: url + ' no-repeat center / contain',
        mask: url + ' no-repeat center / contain',
      },
      props.style,
    );
    return h('span', rest);
  }

  var api = { Icon: Icon, raisIconUrl: raisIconUrl, raisAssetBase: raisAssetBase };
  SPECS.forEach(function (spec) {
    api[spec.name] = component(spec);
  });
  window[NAMESPACE] = api;
});
