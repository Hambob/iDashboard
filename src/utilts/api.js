// export const api = "https://squid-app-mweri.ondigitalocean.app";
export const api = "http://192.168.1.109:3001";

export const imgUrl = "https://idelivery.blob.core.windows.net/images";
export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
