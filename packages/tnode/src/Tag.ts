import { TAG_TYPE } from "./Element";
import Component from "./Component";

class Tag {
  public name: string;
  public type: TAG_TYPE;
  private tagOrCtr: string | Component;

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

    if (tagOrCtr instanceof Component) {
      console.log(tagOrCtr)
      console.log(tagOrCtr.constructor)
      // this.name = tagOrCtr.name || tagOrCtr.displayName;
      this.type = TAG_TYPE.COMPONENT;
    }
  }
}

export default Tag;