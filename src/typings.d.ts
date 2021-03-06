type Option<T> = T | null;
type Maybe<T> = T | undefined | null;

interface Dict<T> {
  [index: string]: T;
}

interface Constructor<T> {
  new (...args: any[]): T;
}

declare var __webpack_public_path__: string;
