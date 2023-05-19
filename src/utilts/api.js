export const api = "https://squid-app-mweri.ondigitalocean.app";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicmVzdF9pZCI6MSwiaWF0IjoxNjg0NDM3OTk2LCJleHAiOjE2ODQ1MjQzOTZ9.htxVjcw-cSVDHUyg75D1IIt314gt-vVkwVtNpFoXA8w";

export const imgUrl = "https://idelivery.blob.core.windows.net/images";
export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
