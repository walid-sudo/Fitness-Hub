document.addEventListener("DOMContentLoaded", function() {
    let currentWorkoutIndex = 0;
    let workouts = [];

    fetch("https://fitness-hub-g8e1.onrender.com/workouts")
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

            workouts = data;
            displayWorkout(workouts[currentWorkoutIndex]);

            // Add event listener for the "Next" button
            document.getElementById("next-button").addEventListener("click", function() {
                currentWorkoutIndex = (currentWorkoutIndex + 1) % workouts.length;
                displayWorkout(workouts[currentWorkoutIndex]);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function displayWorkout(workout) {
        const workoutContainer = document.getElementById("workout-container");
        workoutContainer.innerHTML = `
            <h2>${workout.name}</h2>
            <img class="workout-image" src="${workout.image}" alt="${workout.name}">
            <p>${workout.description}</p>
        `;
    }
});
