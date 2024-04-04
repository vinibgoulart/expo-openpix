export const apiWoovi = async (endpoint: string, _options?: RequestInit) => {
  const url = `https://api.woovi.com/api/v1${endpoint}`;

  const token = process.env.EXPO_PUBLIC_APP_ID;

  const options = {
    method: "GET",
    ..._options,
    headers: {
      ..._options?.headers,
      Authorization: `${token}`,
    },
  };

  return await fetch(url, options);
};
