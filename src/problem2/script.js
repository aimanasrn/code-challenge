const currency = fetch("https://interview.switcheo.com/prices.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
