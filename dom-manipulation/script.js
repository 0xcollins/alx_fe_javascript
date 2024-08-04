// Initial quotes array with sample quotes
const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        alert('New quote added successfully!');
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show an initial random quote when the page loads
showRandomQuote();