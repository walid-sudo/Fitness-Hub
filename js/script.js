document.addEventListener("DOMContentLoaded", function() {
    let currentCoffeeIndex = 0;
    let coffee = [];

    fetch("https://coffee.alexflipnote.dev/uETY1LZBO70_coffee.jpg")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Invalid data format!");
            }

            coffees = data;
            displaycoffee(coffees[currentCoffeeindex]);

            // Add event listener for the "Next" button
            document.getElementById("next-button").addEventListener("click", function() {
                currentCoffeeindex = (currentCoffeeindex + 1) % coffees.length;
                displaycoffee(coffees[currentCoffeeindex]);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function displaycoffee(coffee) {
        const coffeeContainer = document.getElementById("coffee-container");
        coffeeContainer.innerHTML = `
            <h2>${coffee.name}</h2>
            <img class="coffee-image" src="${coffee.image}" alt="${coffee.name}">
            <p>${coffee.description}</p>
        `;
    }
});
