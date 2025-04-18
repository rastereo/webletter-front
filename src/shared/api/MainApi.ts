import {
  InitialLoadData,
  ISelectedFilter,
  IUser,
  IWebletter,
  IWebletterText,
} from '../../types';

class MainApi {
  constructor(
    private baseUrl: string,
    private loginPath: string,
    private verifyPath: string,
    private logoutPath: string,
    private weblettersPath: string,
    private searchPath: string,
    private webletterTextPath: string,
    private credentials: 'omit' | 'same-origin' | 'include'
  ) {
    this.baseUrl = baseUrl;
    this.loginPath = loginPath;
    this.verifyPath = verifyPath;
    this.logoutPath = logoutPath;
    this.weblettersPath = weblettersPath;
    this.searchPath = searchPath;
    this.webletterTextPath = webletterTextPath;
    this.credentials = credentials;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async getResponse(res: Response): Promise<any | Error> {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      try {
        const errorJson = await JSON.parse(errorText);

        const errorMessage = errorJson.message || errorText;

        throw new Error(errorMessage);
      } catch {
        throw new Error(errorText);
      }
    }
  }

  async signIn(username: string, password: string): Promise<IUser> {
    try {
      const res = await fetch(this.baseUrl + this.loginPath, {
        method: 'POST',
        credentials: this.credentials,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async verifyJWT(): Promise<IUser> {
    try {
      const res = await fetch(this.baseUrl + this.verifyPath, {
        credentials: this.credentials,
      });

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async signOut(): Promise<any | Error> {
    try {
      const res = await fetch(this.baseUrl + this.logoutPath, {
        credentials: 'include',
      });

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getInitialLoadData(): Promise<InitialLoadData> {
    try {
      const res = await fetch(this.baseUrl + this.weblettersPath, {
        credentials: this.credentials,
      });

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getWebletterInfo(id: string): Promise<IWebletter> {
    try {
      const res = await fetch(this.baseUrl + this.weblettersPath + `/${id}`, {
        credentials: this.credentials,
      });

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  public async getWebletterText(id: string): Promise<IWebletterText> {
    try {
      console.log(
        this.baseUrl + this.weblettersPath + `/${id}` + this.webletterTextPath
      );
      const res = await fetch(
        this.baseUrl + this.weblettersPath + `/${id}` + this.webletterTextPath,
        {
          credentials: this.credentials,
        }
      );

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async searchWebletters(
    selectedFilters: ISelectedFilter
  ): Promise<IWebletter[]> {
    const params: string[] = [];

    for (const [key, value] of Object.entries(selectedFilters)) {
      if (value) {
        params.push(`${key}=${encodeURIComponent(value)}`);
      }
    }

    try {
      // if (params.length > 0) {
      const res = await fetch(
        this.baseUrl +
          this.weblettersPath +
          this.searchPath +
          '?' +
          params.join('&'),
        {
          credentials: this.credentials,
        }
      );

      return await this.getResponse(res);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_APP_DEV_SERVER_BASE_URL
    : import.meta.env.VITE_APP_SERVER_BASE_URL;

export const mainApi = new MainApi(
  baseUrl,
  import.meta.env.VITE_APP_LOGIN_PATH,
  import.meta.env.VITE_APP_VERIFY_PATH,
  import.meta.env.VITE_APP_LOGOUT_PATH,
  import.meta.env.VITE_APP_WEBLETTERS_PATH,
  import.meta.env.VITE_APP_SEARCH_WEBLETTERS_PATH,
  import.meta.env.VITE_APP_WEBLETTER_TEXT_PATH,
  import.meta.env.VITE_APP_CREDENTIALS
);
