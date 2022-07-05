export interface RequestTokenBody {
  consumer_key: string;
  redirect_uri: string;
}

export interface RequestTokenResponse {
  code: string;
}

export interface AccessTokenBody {
  consumer_key: string;
  code: string;
}

export interface AccessTokenResponse {
  access_token: string;
  username: string;
}

export interface AddBody {
  url: string;
  consumer_key: string;
  access_token: string;
}

export interface AddResponse {
  accessToken: string;
  username: string;
}
