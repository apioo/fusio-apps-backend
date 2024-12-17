export class InstanceManager {
  private static INSTANCES_KEY = 'fusio_instances';
  private static ACTIVE_KEY = 'fusio_instance_active';

  public static getInstances(): Array<Instance> {
    const rawInstances = localStorage.getItem(InstanceManager.INSTANCES_KEY);
    if (!rawInstances) {
      return [];
    }

    return JSON.parse(rawInstances) as Array<Instance>;
  }

  public static getActiveIndex(): number|null {
    const rawActiveIndex = localStorage.getItem(InstanceManager.ACTIVE_KEY);
    if (rawActiveIndex === null) {
      return null;
    }

    return parseInt(rawActiveIndex);
  }

  public static getInstance(index: number): Instance|null {
    const instances = InstanceManager.getInstances();
    if (index === null || !instances[index]) {
      return null;
    }

    return instances[index];
  }

  public static removeActiveInstance(): void {
    const activeIndex = this.getActiveIndex();
    const instances = this.getInstances();
    if (activeIndex === null || !instances[activeIndex]) {
      return;
    }

    instances.splice(activeIndex, 1);

    localStorage.setItem(InstanceManager.INSTANCES_KEY, JSON.stringify(instances));
  }

  public static setActiveIndex(activeIndex: number): Instance|null {
    const instances = InstanceManager.getInstances();
    if (!instances[activeIndex]) {
      return null;
    }

    localStorage.setItem(InstanceManager.ACTIVE_KEY, '' + activeIndex);

    return instances[activeIndex];
  }

  public static newInstance(instance: Instance): number|null {
    if (!URL.canParse(instance.url)) {
      alert('Provided an invalid url: ' + instance.url);
      return null;
    }

    const url = new URL(instance.url)
    instance.host = url.host;

    const instances = InstanceManager.getInstances();
    const activeIndex = instances.push(instance) - 1;

    localStorage.setItem(InstanceManager.INSTANCES_KEY, JSON.stringify(instances));

    return activeIndex;
  }
}

export interface Instance {
  url: string,
  host: string,
  username: string,
  password: string,
  appKey?: string,
}
