// script.js

document.addEventListener("DOMContentLoaded", function () {



    // Define the initial proportions for the ingredients along with their units
    const ingredientsData = {
        baos: { quantity: 12, unit: 'piezas' },
        agua_tibia: { quantity: 75, unit: 'ml' },
        leche_tibia: { quantity: 135, unit: 'ml' },
        aceite: { quantity: 35, unit: 'ml' },
        levadura_fresca: { quantity: 20, unit: 'gr' },
        levadura_pasteleria: { quantity: 8, unit: 'gr' },
        harina: { quantity: 375, unit: 'gr' },
        azucar: { quantity: 30, unit: 'gr' },
        sal: { quantity: 3, unit: 'gr' }
    };

    const ingredientListContainer = document.getElementById('ingredient-list');

    function createIngredientFields() {
    for (const ingredient in ingredientsData) {
        // Create a container for each ingredient field
        const fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('mb-4', 'w-full', 'flex', 'items-center', 'justify-start'); // Adjusted justify-between to justify-start

        // Create a label for the ingredient
        const label = document.createElement('label');
        label.textContent = ingredient.replace('_', ' '); // replace underscores with spaces in the ingredient name
        label.classList.add('text-sm', 'text-gray-700', 'mr-2', 'flex-shrink-0', 'w-1/3'); // Added 'w-1/3' to give the label a third of the width

        // Create a container to hold the input field and unit label. This container will be a flex row.
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('flex', 'items-center', 'w-2/3'); // Adjusted width to 2/3 to fit alongside the label

        // Create the input field for the ingredient quantity
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.name = ingredient;
        inputField.value = ingredientsData[ingredient].quantity;
        inputField.classList.add('form-input', 'mt-1', 'rounded-md', 'shadow-sm', 'text-center', 'border-gray-300', 'focus:border-indigo-300', 'focus:ring', 'focus:ring-indigo-200', 'focus:ring-opacity-50', 'w-full'); 
        inputField.style.maxWidth = '100px'; // Limiting the width of the input field
        inputField.addEventListener('input', handleInputChange);

        // Create the unit label
        const unitLabel = document.createElement('span');
        unitLabel.textContent = ingredientsData[ingredient].unit;
        unitLabel.classList.add('text-sm', 'text-gray-600', 'ml-2'); // 'ml-2' provides spacing

        // Append everything to their respective parents
        inputGroup.appendChild(inputField);
        inputGroup.appendChild(unitLabel);
        fieldWrapper.appendChild(label); // Append label first
        fieldWrapper.appendChild(inputGroup); // Then the input group
        ingredientListContainer.appendChild(fieldWrapper);
    }
}



     // Handler for input change events
    function handleInputChange(event) {
        const currentIngredient = event.target.name;
        const currentValue = event.target.value === "" ? "" : parseFloat(event.target.value) || 0;

        // If the value is empty, set all fields to empty and exit the function
        if (currentValue === "") {
            setAllValuesToEmpty();
            return;
        }

        // Determine the ratio based on the current ingredient being edited
        const currentRatio = ingredientsData[currentIngredient].quantity / currentValue;

        // Check if the field is valid to avoid division by zero or negative values
        if (!isFinite(currentRatio) || currentRatio <= 0) {
            event.target.value = ingredientsData[currentIngredient].quantity;
            return;
        }

        // Adjust the proportions for all ingredients
        for (const ingredient in ingredientsData) {
            // Calculate the new value based on the current ingredient's ratio
            const adjustedValue = ingredientsData[ingredient].quantity / currentRatio;

            // Update the fields with new values, except for the field being currently edited
            if (ingredient !== currentIngredient) {
                document.querySelector(`input[name=${ingredient}]`).value = adjustedValue.toFixed(2); // toFixed for rounding to 2 decimal places
            }
        }
    }

    function setAllValuesToEmpty() {
        for (const ingredient in ingredientsData) {
            document.querySelector(`input[name=${ingredient}]`).value = "";
        }
    }

    // Initial setup
    createIngredientFields();
});