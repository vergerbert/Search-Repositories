/* Функции-сокращения */

function querySelector(elementClass) {
  try {
    return document.querySelector(elementClass);
  } catch (error) {
    console.log(error);
  }
}

function createElement(elementTag, elementClass) {
  try {
    const element = document.createElement(elementTag);
    if (elementClass) element.classList.add(elementClass);

    return element;
  } catch (error) {
    console.log(error);
  }
}

function createAndAppendElement(parent, elementTag, elementClass) {
  try {
    const element = createElement(elementTag, elementClass);
    parent.append(element);

    return element;
  } catch (error) {
    console.log(error);
  }
}

/* Основной код */

const main = querySelector('.main');

const searchForm = createAndAppendElement(main, 'form', 'search-form');
const searchInput = createAndAppendElement(searchForm, 'input', 'search-input');
const searchDropdown = createAndAppendElement(main, 'div', 'search-dropdown');
const searchRepository = createAndAppendElement(main, 'div', 'search-repository');

searchInput.setAttribute('name', 'name');
searchInput.setAttribute('placeholder', 'Type to search...');

const dropdownList = createAndAppendElement(searchDropdown, 'ul', 'dropdown-list');
const repositoryList = createAndAppendElement(searchRepository, 'ul', 'repository-list');

const url = `https://api.github.com/search/repositories?q=`;
let repositories;

/* Выпадающий список репозиториев */

const debounce = (fn, ms) => {
  let timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), ms);
  }
}

function createDropdown(repository, index) {
  try {
      const dropdownItem = createAndAppendElement(dropdownList, 'li', 'dropdown-item');
      dropdownItem.innerHTML = `<span>${repository.owner.login}/${repository.name}</span>`;
      dropdownItem.classList.add(`dropdown-item${index}`);

      dropdownItem.addEventListener('click', () => {
          createRepository(repositories[index]);
          searchInput.value = '';
          dropdownList.innerHTML = '';
      })
  } catch (error) {
      console.log(error);
  }
}

const generateDropdown = debounce(async () => {
  try {
      const response = await fetch(url + `${searchInput.value}` + `&per_page=${5}`);
      const data = await response.json();

      repositories = data.items;
      dropdownList.innerHTML = '';
      repositories.forEach((repository, index) => createDropdown(repository, index));

      return repositories;
  } catch (error) {
      console.log(error);
  }
}, 250)

document.addEventListener('click', event => {
  if (!searchDropdown.contains(event.target) && !searchInput.contains(event.target)) {
    dropdownList.innerHTML = '';
  }
});

searchInput.addEventListener('keyup', () => generateDropdown());

/* Создание репозитория */

function button() {
  try {
      const closeButton = createElement('button', 'close-button');

      closeButton.addEventListener('click', event => {
          event.preventDefault();
          closeButton.parentNode.remove();
      })

      return closeButton;
  } catch (error) {
    console.log(error);
  }
}

function createRepository(data) {
  try {
      const repositoryItem = createAndAppendElement(repositoryList, 'li', 'repository-item');
      repositoryItem.innerHTML = `
      <div class="item">
        <p class="item-text">${data.name}</p>
        <p class="item-text">${data.owner.login}</p>
        <p class="item-text">&#9733; ${data.stargazers_count}</p>
      </div>
    `

      repositoryItem.append(button());
  } catch (error) {
      console.log(error);
  }
}