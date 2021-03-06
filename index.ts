export type TemplateLiteralArrayClone = Array<any> & {
  raw: Array<any>;
};
export type TemplateLiteralArray = [TemplateStringsArray, ...any[]];
export type LitConsoleParameter = TemplateLiteralArray|Array<any>;
export interface LitConsole {
  (...params: LitConsoleParameter): any;
  __store__: Array<any>;
}

const isTemplateLiterals = (vararg: any) => 
  Array.isArray(vararg[0]) &&
  Array.isArray((<TemplateLiteralArrayClone>vararg[0]).raw) &&
  vararg[0].length === (<TemplateLiteralArrayClone>vararg[0]).raw.length &&
  vararg[0].every((item, i) => item === vararg[0].raw[i]);

const resetCSS = ';';

const createOptions = (cssCode: string) => function (this: LitConsole, ...params: LitConsoleParameter) {
  if (isTemplateLiterals(params)) {
    const str = String.raw(...<TemplateLiteralArray>params);
    this.__store__.push([cssCode, str]);
  } else this.__store__.push([cssCode, ...params]);
  return this;
};

const defaultLogOptions = {
  r: createOptions('color: red;'),
  g: createOptions('color: green;'),
  b: createOptions('color: blue;'),
  c: createOptions('color: cyan;'),
  m: createOptions('color: magenta;'),
  y: createOptions('color: yellow;'),
  w: createOptions('color: white;'),
  k: createOptions('color: black;'),
  R: createOptions('color: white; background: red;'),
  G: createOptions('color: white; background: green;'),
  B: createOptions('color: white; background: blue;'),
  C: createOptions('color: white; background: cyan;'),
  M: createOptions('color: white; background: magenta;'),
  Y: createOptions('color: black; background: yellow;'),
  W: createOptions('color: black; background: white;'),
  K: createOptions('color: white; background: black;'),
};

const logParser = (array: string[], params: any[]) => {
  const result: string[] = [];
  const styles: string[] = [];
  array.forEach(item => {
    if (Array.isArray(item)) {
      const [style, ...items] = item;
      result.push('%c' + items.join(' ') + '%c');
      styles.push(typeof style === 'function' ? style() : style);
      styles.push(resetCSS);
    } else {
      result.push('%c' + item);
      styles.push(resetCSS);
    }
  });
  if (result.length) {
    console.log(result.join(' '), ...styles, ...params);
  } else {
    console.log(...params);
  }
};

export function createLog(customStyle: {[key: string]: string;} = {}) {
  const customLogOptions = Object.keys(customStyle).reduce((acc, key) => Object.assign(acc, {[key]: createOptions(customStyle[key])}), {});
  const mergedLogOptions = {...defaultLogOptions, ...customLogOptions};

  const createCore = () => {
    const core: LitConsole = <LitConsole>function (...params: LitConsoleParameter) {
      if (isTemplateLiterals(params)) {
        core.__store__.push(String.raw(...<TemplateLiteralArray>params))
      } else {
        return logParser(core.__store__, params);
      }
  
      return core;
    };
    return core;
  }
      
  const log: any = (...params: LitConsoleParameter) => {
    if (isTemplateLiterals(params)) {
      return Object.assign(
        createCore(),
        {__store__: [String.raw(...<TemplateLiteralArray>params)]},
        mergedLogOptions,
      );
      
    } else {
      return logParser([], params);
    }
  };
  
  Object.keys(mergedLogOptions).forEach(key => {
    const store: {__store__: Array<any>} = {__store__: []};
    (log as any)[key] = (...params: LitConsoleParameter) => {
      store.__store__ = [];
      (mergedLogOptions as any)[key].bind(store)(...params);
      
      return Object.assign(
        createCore(),
        {__store__: store.__store__},
        mergedLogOptions,
      );
    };
  });

  return log;
}

const log = createLog();

export default log;