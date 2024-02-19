// export const api = "http://192.168.1.105:3001";
export const api = "https://node6730-idelivery.fin.libyanspider.cloud";

export const imgUrl = "https://idelivery.blob.core.windows.net/images";
export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
