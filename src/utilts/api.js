export const api = "https://squid-app-mweri.ondigitalocean.app";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicmVzdF9pZCI6MSwiaWF0IjoxNjg0NTI0NjA4LCJleHAiOjE2ODQ2MTEwMDh9.my-L6uLF3bcyyFGQz-oOD6gC6GwxlyRRYjikSyJyyAk";

export const imgUrl = "https://idelivery.blob.core.windows.net/images";
export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
