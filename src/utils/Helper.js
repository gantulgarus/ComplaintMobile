export const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const getStatusColor = (statusId) => {
  switch (statusId) {
    case 0:
      return "#4b5563";
    case 2:
      return "#ea580c";
    case 3:
      return "#2563eb";
    case 4:
      return "#dc2626";
    case 6:
      return "#16a34a";
    default:
      return "#4b5563";
  }
};

export const getFileExtension = (filename) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() : "";
};
