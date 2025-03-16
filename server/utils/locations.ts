export const formatLocation = (location: any) => {
  if (!location) {
    return "Nicht gefunden";
  }
  return `${location.name}, ${location.street}, ${location.house_number}, ${location.postal_code} ${location.city}`;
};
