// // @cacheText cacheText123
// function testfn() {
//   try {
//     // alert('aaa')
//     console.log("testcompilter");
//   } catch (error) {}
// }
// // @catchText cacheText123
// const fn1 = () => {
//   // alert('aaa')
//   console.log("testcompilter");
//   // alert('aaa')
//   try {
//     console.log("testcompilter");
//   } catch (error) {}
//   // alert('aaa')
//   console.log("testcompilter");
//   // alert('aaa')
//   console.log("testcompilter");
//   // alert('aaa')
//   console.log("testcompilter");
//   // alert('aaa')
//   console.log("testcompilter");
// };


console.log(111)
// @catchText cacheText123
const fn2 = function () {
  // alert('aaa')
  console.log("testcompilter");
  if (true) {
    try {
      console.log("testcompilter");
    } catch (error) {}
  }
  console.log("testcompilter");
};
