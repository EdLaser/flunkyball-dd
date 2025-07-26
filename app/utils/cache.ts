export const getCachedDataOrFetch = (key: string, nuxtApp: any) => {
  const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  if (!data) {
    return;
  }
  return data;
};
