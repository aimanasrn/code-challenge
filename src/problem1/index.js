var sum_to_n_a = function (n) {
  // aritmethic sum
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // Loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  // your code here
  if (n <= 1) return n;
  console.log(n);
  return n + sum_to_n_c(n - 1);
  //5+sum_to_n_c(4)
  //5+4+sum_to_n_c(3)
  //5+4+3+sum_to_n_c(2)
  //5+4+3+2+sum_to_n_c(1)
  //5+4+3+2+1
};

// console.log(sum_to_n_a(5));
// console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
