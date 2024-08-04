// Load quotes from local storage or initialize with sample quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a specific quote
function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayQuote(randomQuote);
    // Save last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategories();
        alert('New quote added successfully!');
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categoryFilter.appendChild(option);
    });

    // Restore the last selected category filter from localStorage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
        filterQuotes();
    }
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    filteredQuotes.forEach(quote => displayQuote(quote));
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const exportFileDefaultName = 'quotes.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Populate categories and show an initial random quote when the page loads
populateCategories();
showRandomQuote();

// Restore and display the last viewed quote from session storage if available
const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
if (lastViewedQuote) {
    displayQuote(JSON.parse(lastViewedQuote));
}
