import Updater from './updater';
import Element, { TAG_TYPE } from './element';

class Component<S = {}, P = {}> {
  public static type?: TAG_TYPE = TAG_TYPE.COMPONENT;
  public name?: string;
  protected state?: S;
  protected props?: P;
  // private updater?: Updater;
  
  public componentWillMount?(): void;
  public componentDidMount?(): void;
  public render?(): Element | string;

  constructor(props?: P, updater?: any) {
    this.props = props;
    // this.updater = {};
  }
}

export default Component;