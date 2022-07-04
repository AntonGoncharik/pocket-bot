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
  accessToken: string;
  username: string;
}
