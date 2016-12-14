/* tslint:disable */

declare var Object: any;
export interface QuoteInterface {
  text: string;
  author?: string;
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Quote implements QuoteInterface {
  text: string;
  author: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(instance?: QuoteInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Quote`.
   */
  public static getModelName() {
    return "Quote";
  }
}
