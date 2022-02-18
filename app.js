// let totalRequests = 0;
// const getPokemon = async (id) => {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     if(!response.ok) {
//       throw `Error fetching pokemon with id ${id}`
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     // this code executes whether or not we catch an error
//     console.log(`finished with ${id}`);
//     totalRequests ++;
//   }
// };

// const myFetchFunc = async () => {
//   const resolved = await Promise.all([
//     getPokemon(1),
//     getPokemon(2),
//     getPokemon(3),
//     getPokemon(4),
//     getPokemon('foo')
//   ]);
//   console.log('totalRequests: ', totalRequests);
// }

// myFetchFunc();

// // using then
// let pokemon;
// fetch(`https://pokeapi.co/api/v2/pokemon/`)
//   .then((response) => {
//     console.log('IN .then() response: ', response)
//     return response.json();
//   })
//   .then((data) => {
//     // we only have access to .data here, in this .then
//     console.log(' IN .then() data: ', data);
//     pokemon = data;
//   })

// // this would still be undefined, executed before async fetch is done
// console.log('pokemon', pokemon)

// // then with Promise
// // dot (.) chain promises
// // not as clear as using async/await with Promise
// Promise.all([
//   getPokemon(1),
//   getPokemon(2),
//   getPokemon('foo')
// ])
// .then(([pokemonList1, pokemonList2]) => {
//   console.log('pokemonList1: ', pokemonList1);
//   console.log('pokemonList2: ', pokemonList2);
// })
// .catch(err => {
//   console.error(err);
// })
// .finally(() => {
//   console.log("we're done!");
// })