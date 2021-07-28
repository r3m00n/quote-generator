const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  // picks random quote from apiQuotes-array
  showLoadingSpinner();
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  authorText.textContent = quote.author;
  if (!quote.author) authorText.textContent = "Unknown";

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

const getQuotesFromAPI = async () => {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiURL);
    apiQuotes = await res.json();

    newQuote();
  } catch (error) {
    console.alert(error);
  }
};

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotesFromAPI();
