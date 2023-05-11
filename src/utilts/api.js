export const api = "http://192.168.1.109:3000";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicmVzdF9pZCI6NywiaWF0IjoxNjgzODM3MTUxLCJleHAiOjE2ODM5MjM1NTF9.seO6IP082EK0H-de9H979j4PimxqYWIaGiompN0gkR8";

export const calcTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price;
  });
  return total;
};
