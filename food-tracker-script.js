document.addEventListener("DOMContentLoaded", function() {
    const addFoodButtons = document.querySelectorAll('.add-food');
    const foodModal = document.getElementById('food-search-modal');
    const closeModal = document.querySelector('.close');
    const foodForm = document.getElementById('food-form');
    const foodNameInput = document.getElementById('food-name');
    const caloriesInput = document.getElementById('calories');
    const carbsInput = document.getElementById('carbs');
    const fatInput = document.getElementById('fat');
    const proteinInput = document.getElementById('protein');
    let currentMeal = '';

    addFoodButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentMeal = this.getAttribute('data-meal');
            foodModal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        foodModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == foodModal) {
            foodModal.style.display = 'none';
        }
    });

    foodForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const foodName = foodNameInput.value;
        const calories = caloriesInput.value;
        const carbs = carbsInput.value;
        const fat = fatInput.value;
        const protein = proteinInput.value;

        const foodItem = document.createElement('li');
        foodItem.textContent = `${foodName} - ${calories} cal, ${carbs}g carbs, ${fat}g fat, ${protein}g protein`;

        document.getElementById(`${currentMeal}-log`).appendChild(foodItem);
        updateMacros(calories, carbs, fat, protein);

        foodModal.style.display = 'none';
        foodForm.reset();
    });

    function updateMacros(calories, carbs, fat, protein) {
        const caloriesSummary = document.getElementById('calories-summary');
        const carbsSummary = document.getElementById('carbs-summary');
        const fatSummary = document.getElementById('fat-summary');
        const proteinSummary = document.getElementById('protein-summary');

        if (caloriesSummary && carbsSummary && fatSummary && proteinSummary) {
            const [currentCalories, totalCalories] = caloriesSummary.textContent.split(' / ').map(Number);
            const [currentCarbs, totalCarbs] = carbsSummary.textContent.split(' / ').map(Number);
            const [currentFat, totalFat] = fatSummary.textContent.split(' / ').map(Number);
            const [currentProtein, totalProtein] = proteinSummary.textContent.split(' / ').map(Number);

            caloriesSummary.textContent = `${Math.round(currentCalories + Number(calories))} / ${Math.round(totalCalories)}`;
            carbsSummary.textContent = `${Math.round(currentCarbs + Number(carbs))}g / ${Math.round(totalCarbs)}g`;
            fatSummary.textContent = `${Math.round(currentFat + Number(fat))}g / ${Math.round(totalFat)}g`;
            proteinSummary.textContent = `${Math.round(currentProtein + Number(protein))}g / ${Math.round(totalProtein)}g`;

            updatePercentages(Math.round(currentCarbs + Number(carbs)), Math.round(currentFat + Number(fat)), Math.round(currentProtein + Number(protein)), Math.round(currentCalories + Number(calories)));
        }
    }

    function updatePercentages(carbs, fat, protein, calories) {
        const carbsPercentage = document.getElementById('carbs-percentage');
        const fatPercentage = document.getElementById('fat-percentage');
        const proteinPercentage = document.getElementById('protein-percentage');

        const carbsPercentValue = Math.round((carbs * 4) / calories * 100);
        const fatPercentValue = Math.round((fat * 9) / calories * 100);
        const proteinPercentValue = Math.round((protein * 4) / calories * 100);

        if (carbsPercentage && fatPercentage && proteinPercentage) {
            carbsPercentage.textContent = `${carbsPercentValue}%`;
            fatPercentage.textContent = `${fatPercentValue}%`;
            proteinPercentage.textContent = `${proteinPercentValue}%`;
        }
    }
});
