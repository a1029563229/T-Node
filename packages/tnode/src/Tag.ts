import { TAG_TYPE } from "./Element";
import Component from "./Component";

class Tag {
  public name: string;
  public type: TAG_TYPE;
  public Ctr: Component;

  constructor(tagOrCtr: string | Component) {
    this.init(tagOrCtr);
  }

  private init(tagOrCtr: string | Component): void {
    if (typeof tagOrCtr === 'string') {
      this.name = tagOrCtr as string;
      this.type = TAG_TYPE.ELEMENT;
      return;
    }

    if ((<typeof Component>tagOrCtr).type) {
      this.Ctr = tagOrCtr;
      this.name = tagOrCtr.name;
      this.type = TAG_TYPE.COMPONENT;
    }
  }
}

export default Tag;