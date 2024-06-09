const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []

const getQuotes = async () => {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    await fetch(apiUrl)
            .then(response => response.json())
            .then(quotes => {
              apiQuotes = quotes
              getRandomQuote(quotes)
            })
  } catch (error) {
    console.log(error)
  }
}

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const getRandomQuote = (quotes) => {
  loading()
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  !quote.author || quote.author === "Anonymous" ? authorText.textContent = 'unknown author' : authorText.textContent = quote.author
  if (quote.text.length > 20) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = quote.text
  complete()
}

const tweetQuote = () => {
  const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} --${quoteText.textContent}`
  window.open(xUrl, '_blank')
}

twitterBtn.addEventListener("click", tweetQuote)
newQuoteBtn.addEventListener("click", getQuotes)



getQuotes()
