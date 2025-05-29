import axios from 'axios';

const factsForm = document.querySelector('.cat-facts-form');
const imagesForm = document.querySelector('.cats-images-form');
const factsInput = document.querySelector('.facts-form-input');
const imagesInput = document.querySelector('.images-form-input');
const resultBox = document.querySelector('.result-box');

factsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const number = parseInt(factsInput.value.trim());

  if (isNaN(number) || number < 1 || number > 50) {
    alert('Please enter only numbers between 1 and 50.');
    return;
  }

  try {
    const response = await axios.get(`https://meowfacts.herokuapp.com/?count=${number}`);
    const facts = response.data.data;
    giveResults(facts.map(fact => `<p class="fact-item">${fact}</p>`))
    giveResults(facts.map((fact, index) => `<p class="fact-item">${index + 1}. ${fact}</p>`));
  } catch (error) {
    console.error('Error!', error);
    resultBox.innerHTML = '<p class="error">Failed! Please try again Later.</p>';
  }
});

imagesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const number = parseInt(imagesInput.value.trim());

  if (isNaN(number) ||number < 1 || number > 10) {
    alert('Please only enter numbers between 1 and 10');
    return;
  }

  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${number}`);
    const images = response.data;

    giveResults(images.map(img => `<img class="cat-photo" src="${img.url}" alt="Cat Photo" width="200" />`));
  } catch (error) {
    console.error('Error!', error);
    resultBox.innerHTML = '<p class="error">Failed! Please Try again Later.</p>';
  }
});

function giveResults(elements) {
  resultBox.innerHTML = '';
  elements.forEach(html => {
    const div = document.createElement('div');
    div.innerHTML = html;
    resultBox.appendChild(div);
  });
}
