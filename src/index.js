import './styles.css';

const header = document.querySelector('#header');
const content = document.querySelector('#content');
const footer = document.querySelector('#footer');
const recipeArray = [];
const headHeight = 100;
const footHeight = 60;
const contentPadding = 8;
header.style.height = `${headHeight}px`;
footer.style.height = `${footHeight}px`;
let contentHeight = window.innerHeight - headHeight - footHeight - (contentPadding * 4);
content.style.height = `${contentHeight}px`;
content.style.top = `${headHeight}px`;
content.style.padding = `${contentPadding}px`;

window.addEventListener('resize', () => {
  contentHeight = window.innerHeight - headHeight - footHeight - (contentPadding * 4);
  content.style.height = `${contentHeight}px`;
});

function recipeFactory(name, description, imgSrc, calories, fat, carbs, protein) {
  return {
    name, description, imgSrc, calories, fat, carbs, protein,
  };
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  circle.style.width = `${diameter}px`;
  circle.style.height = circle.style.width;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

function clearContent() {
  while (content.firstChild && content.lastChild.className !== 'background-image') {
    content.removeChild(content.lastChild);
  }
}
function generateHome() {
  const homeBanner = document.createElement('div');
  homeBanner.classList.add('home-banner');
  content.appendChild(homeBanner);
  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');
  homeBanner.appendChild(bannerText);
  const bannerH1 = document.createElement('h1');
  bannerH1.innerHTML = 'The Nomad';
  bannerText.appendChild(bannerH1);
  const bannerH3 = document.createElement('h3');
  bannerH3.innerHTML = 'pizza kitchen';
  bannerText.appendChild(bannerH3);

  const bannerButton = document.createElement('button');
  bannerButton.textContent = 'Menu';
  bannerButton.addEventListener('click', createRipple);
  homeBanner.appendChild(bannerButton);
}
function generateMenu() {
  for (const recipe of recipeArray) {
    const recipeCard = document.createElement('div');
    content.appendChild(recipeCard);
    recipeCard.classList.add('recipe-card');
    const recipeCardInner = document.createElement('div');
    recipeCard.appendChild(recipeCardInner);
    recipeCardInner.classList.add('recipe-card-inner')
    const recipeCardFront = document.createElement('div');
    recipeCardInner.appendChild(recipeCardFront);
    recipeCardFront.classList.add('recipe-card-front');
    const recipeImg = document.createElement('img');
    recipeCardFront.appendChild(recipeImg);
    recipeImg.src = recipe.imgSrc;
    const recipeDescription = document.createElement('div');
    recipeCardFront.appendChild(recipeDescription);
    recipeDescription.classList.add('recipe-description');
    const recipeTitle = document.createElement('h3');
    recipeDescription.appendChild(recipeTitle);
    recipeTitle.innerHTML = `${recipe.name} pizza`;
    const recipeText = document.createElement('p');
    recipeDescription.appendChild(recipeText);
    recipeText.innerHTML = recipe.description;
    const recipeCardBack = document.createElement('div');
    recipeCardInner.appendChild(recipeCardBack);
    recipeCardBack.classList.add('recipe-card-back');

    recipeCardBack.appendChild(document.createElement('h3'));
    recipeCardBack.lastChild.innerHTML = 'Nutritional Info';
    recipeCardBack.appendChild(document.createElement('h5'));
    recipeCardBack.lastChild.innerHTML = '(per slice)';
    for (let i = 0; i < 8; i += 1) {
      recipeCardBack.appendChild(document.createElement('text'));
      switch (i) {
        case 0:
          recipeCardBack.lastChild.innerHTML = 'kCal: ';
          break;
        case 1:
          recipeCardBack.lastChild.innerHTML = recipe.calories;
          break;
        case 2:
          recipeCardBack.lastChild.innerHTML = 'Fat: ';
          break;
        case 3:
          recipeCardBack.lastChild.innerHTML = `${recipe.fat}(g)`;
          break;
        case 4:
          recipeCardBack.lastChild.innerHTML = 'Carbs: ';
          break;
        case 5:
          recipeCardBack.lastChild.innerHTML = `${recipe.carbs}(g)`;
          break;
        case 6:
          recipeCardBack.lastChild.innerHTML = 'Protein: ';
          break;
        case 7:
          recipeCardBack.lastChild.innerHTML = `${recipe.protein}(g)`;
          break;
        default:
          console.log('youre a dummy dumb');
          break;
      }
    }
  }
}
function generateAbout() {
  const homeContent = document.createElement('text');
  homeContent.innerHTML = 'About page';
  homeContent.style.color = 'yellow';
  content.appendChild(homeContent);
}

(() => {
  for (let i = 0; i < 3; i += 1) {
    const headerItem = document.createElement('div');
    headerItem.classList.add('header-item');
    const headerText = document.createElement('text');
    headerItem.appendChild(headerText);
    const textBar = document.createElement('div');
    textBar.classList.add('text-bar');
    headerItem.appendChild(textBar);
    header.appendChild(headerItem);

    switch (i) {
      case 0:
        headerText.innerHTML = 'Home';
        break;
      case 1:
        headerText.innerHTML = 'Menu';
        break;
      case 2:
        headerText.innerHTML = 'About';
        break;
      default:
        break;
    }

    headerItem.addEventListener('click', (event) => {
      const clickedItemBar = event.currentTarget.querySelector('.text-bar');
      const headerItems = document.querySelectorAll('.header-item');
      const itemBars = document.querySelectorAll('.text-bar');
      for (let j = 0; j < itemBars.length; j += 1) {
        itemBars[j].style.backgroundColor = 'rgb(255, 255, 255, 0.4';
        headerItems[j].style.transform = '';
      }
      clickedItemBar.style.backgroundColor = 'var(--tan)';
      clickedItemBar.parentElement.style.transform = 'translateY(-10px)';

      clearContent();
      switch (clickedItemBar.parentElement.outerText) {
        case 'Home':
          generateHome();
          break;
        case 'Menu':
          generateMenu();
          break;
        case 'About':
          generateAbout();
          break;
        default:
          break;
      }
    });
    if (i === 0) { headerItem.click(); }
  }
  // IIFE
})();

(() => {
  recipeArray.push(recipeFactory('Cheese', 'A classic cheese pizza with no frills', '../src/Images/pizza-cheese.jpg', '213', '7.8', '27', '9.1'));
  recipeArray.push(recipeFactory('Pepperoni', 'A pizza with only pepperoni added ontop', '../src/Images/pizza-pepperoni.jpg', '313', '13', '35', '13'));
  recipeArray.push(recipeFactory('Sausage', 'A pizza with only sausage added ontop', '../src/Images/pizza-sausage.jpg', '330', '14', '36', '13'));
  recipeArray.push(recipeFactory('Bacon', 'A pizza with only bacon added ontop', '../src/Images/pizza-bacon.jpg', '344', '15', '36', '17'));
  recipeArray.push(recipeFactory('Hawaiian', 'A pizza with ham and pineapple added ontop', '../src/Images/pizza-hawaiian.jpg', '310', '12', '38', '15'));
})();

generateHome();
