fetch("./json/tc1.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((res) => {
    res.json();
  })
  .then((json) => {
    console.log(json);
  });
