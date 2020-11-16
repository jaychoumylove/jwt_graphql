let accessToken: string = "";

export const setAccessToken = (value: string) => {
  accessToken = value;
};

export const getAccessToken: () => string = () => {
  return accessToken;
};
