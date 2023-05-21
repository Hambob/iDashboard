// export const api = "https://squid-app-mweri.ondigitalocean.app";
export const api = "http://192.168.1.109:3001";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicmVzdF9pZCI6MSwiaWF0IjoxNjg0NjEyMDYwLCJleHAiOjE2ODUyMTY4NjB9.XYqM1ok4ACy9cFeRMX-u2gVR_F-KdsRzrSMBaKUNIMY";

export const imgUrl = "https://idelivery.blob.core.windows.net/images";
export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
