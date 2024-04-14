import {Config} from "ngx-fusio-sdk/lib/config/config";

export class ConfigBuilder {

  public static build(): Config {
    let baseUrl = FUSIO_URL;
    if (!baseUrl) {
      throw new Error('No base url configured, please provide a variable "FUSIO_URL" containing the Fusio base url');
    }

    let appKey = FUSIO_APP_KEY;

    return {
      baseUrl: baseUrl,
      logo: 'fusio_64px.png',
      appKey: appKey && appKey !== '${APP_KEY}' ? appKey : undefined,
      homePath: '/',
      helpUrl: 'https://docs.fusio-project.org/docs/backend/',
    }
  }

}
