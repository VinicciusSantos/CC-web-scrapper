export namespace ResponseInterfaces {

  export class __default__<T = any> {
    public msg!: string;
    public data!: T;
  }

  export class Get<T = any> extends __default__<T> {}
}
