const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const count = 10;
const apiKey = "XttB1NGvqgZKaWe8jdGz3y3C2TXc8fOTp98mAfbg";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];

function updateDOM() {
  resultArray.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // Image inside Link
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card-body container
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card-body item
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Card-body item
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add To Favorites";
    // Card-body item
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer container(Card-body item)
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Footer item
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Footer item
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

async function getNasaPicures() {
  try {
    const res = await fetch(apiURL);
    resultArray = await res.json();
    console.log(resultArray);
    updateDOM();
  } catch (error) {}
}

getNasaPicures();
