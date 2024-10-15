const url = 'https://jsonplaceholder.typicode.com/posts';

// const promise = fetch(url);
// console.log(promise);

// promise.then((response) => {
//   console.log(response)

//   const promise2 = response.json()
//   console.log(promise2)

//   promise2.then(e => {
//     console.log(e)
//   })
// });

// const fn = async () => {
//   const data = await (await fetch(url)).json();
//   console.log(data);
// }

// fn()

// console.log(Promise.resolve(3), Promise.reject(4));

// function delay(sec, result) {
//   return new Promise(resolve => setTimeout(() => resolve(result), sec));
// }

// const promise1 = delay(3000, 'hi')
// console.log(promise1.then(result => console.log(result)))

// const promise2 = delay(6000, 'bye')
// console.log(promise2.then(result => console.log(result)))

function button(text, result) {
  return new Promise(resolve => {
    const main = document.querySelector('main');
    const btn = document.createElement('button');

    main.append(btn);
    btn.innerHTML = text;

    btn.addEventListener('click', () => resolve(result));
  });
}

console.log(button('hello', 'world').then(result => console.log(result)));