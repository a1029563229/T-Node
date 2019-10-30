import { TAG_TYPE } from "./Element";
import Component from "./Component";

class Tag {
  public name: string;
  public type: TAG_TYPE;
  public tagOrCtr: string | Component;

  constructor(tagOrCtr: string | Component) {
    this.tagOrCtr = tagOrCtr;
    this.init();
  }

  private init(): void {
    const tagOrCtr = this.tagOrCtr;
    if (typeof tagOrCtr === 'string') {
      this.name = tagOrCtr as string;
      this.type = TAG_TYPE.ELEMENT;
      return;
    }

    if ((<typeof Component>tagOrCtr).tagType) {
      this.name = tagOrCtr.name;
      this.type = TAG_TYPE.COMPONENT;
    }
  }
}

export default Tag;