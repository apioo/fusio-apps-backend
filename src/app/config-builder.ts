import {InstanceManager} from "./instance-manager";
import {Config} from "ngx-fusio-sdk";

export class ConfigBuilder {

  public static build(): Config {
    let baseUrl: string = '';
    let appKey: string = '';
    let instanceIndex: number|undefined = undefined;

    if (typeof FUSIO_URL === 'string') {
      baseUrl = FUSIO_URL;
      if (typeof FUSIO_APP_KEY === 'string') {
        appKey = FUSIO_APP_KEY;
      }
    } else {
      const activeIndex = InstanceManager.getActiveIndex();
      if (activeIndex !== null) {
        instanceIndex = activeIndex;
        const instance = InstanceManager.getInstance(activeIndex);
        if (instance !== null) {
          baseUrl = instance.url;
          if (instance.appKey) {
            appKey = instance.appKey;
          }
        }
      }
    }

    return {
      instance: instanceIndex,
      baseUrl: baseUrl,
      logo: 'assets/fusio_64px.png',
      appKey: appKey && appKey !== '${APP_KEY}' ? appKey : undefined,
      homePath: '/',
      helpUrl: 'https://docs.fusio-project.org/docs/backend/',
    }
  }

}
