document.addEventListener('DOMContentLoaded', () => {
    const ingredientLines = document.getElementById('ingredient-lines');
    const ingredientButtons = document.querySelectorAll('.igr');
    const resetButton = document.getElementById('reset-button');
    const finishButton = document.getElementById('finish-button');

    const modal = document.getElementById('order-modal');
    const closeModalButton = document.getElementById('close-modal');
    const totalPriceModal = document.getElementById('total-price-modal');

// Show the modal when Finish button is clicked
    finishButton.addEventListener('click', () => {
        modal.style.display = 'block';
        totalPriceModal.innerText = totalPrice.toFixed(2); // Update the total price in the modal
    });

// Close the modal when the close button is clicked
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });





    let currentHeight = 0; 
    let breadAdded = false; 
    let totalPrice = 0;
    const ingredientPrices = {
        "Lettuce": 0.5,
        "Tomato": 0.7,
        "Onion": 0.4,
        "Meat": 1.5,
        "Cheese": 0.8,
        "Cucumber": 0.6,
        "Chiken": 1.2,
        "jalapeno": 0.9,
    };
    
    ingredientButtons.forEach(igr => {
        igr.addEventListener('click', () => {
            const ingredientName = igr.querySelector('p').innerText.trim();//cherche texte p et enleve les espaces trim
            const ingredientPrice = ingredientPrices[ingredientName] || 0; //PRIX=0 SI N'EXISTE PAS
    
            totalPrice += ingredientPrice;
            document.getElementById('total-price').innerText = totalPrice.toFixed(2);
        });
    });
    const ingredients = document.querySelectorAll('.igr');
    const container = document.querySelector('.container');
    ingredients.forEach(ingredient => {
        // Commence à glisser
        ingredient.addEventListener('dragstart', () => {
            ingredient.classList.add('dragging');
        });
    
        // Termine le glisser
        ingredient.addEventListener('dragend', () => {
            ingredient.classList.remove('dragging');
        });
    });
    container.addEventListener('dragover', (e) => {
        e.preventDefault(); // Nécessaire pour autoriser le dépôt
        container.classList.add('dragover');
    });
    
    // Lorsqu'on quitte la zone de dépôt
    container.addEventListener('dragleave', () => {
        container.classList.remove('dragover');
    });
    
    // Lorsque l'ingrédient est déposé dans la zone
    container.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('dragover');
    
        const draggingIngredient = document.querySelector('.igr.dragging');
        if (draggingIngredient) {
            const gradient = draggingIngredient.dataset.gradient; // Get the ingredient gradient
            const ingredientName = draggingIngredient.querySelector('p').innerText.trim(); // Get the ingredient name
    
            // Add the ingredient to the sandwich (visual logic)
            addIngredient(gradient);
    
            // Update the price
            if (ingredientPrices[ingredientName]) {
                totalPrice += ingredientPrices[ingredientName]; // Ajouter le prix de l'ingrédient au prix total
                document.getElementById('total-price').innerText = totalPrice.toFixed(2); // Mettre à jour l'affichage du prix total
            }
        }
    });
    
    function addIngredient(type) {
        const newLine = document.createElement('div');
        newLine.classList.add('line');
        newLine.style.background = type; // Utiliser la couleur de l'ingrédient
        newLine.style.bottom = `${currentHeight}px`;

        ingredientLines.appendChild(newLine);
        currentHeight += 0.5; 
    }

    ingredientButtons.forEach(igr => {
        igr.addEventListener('click', () => {
            const ingredientColor = igr.dataset.gradient; 
            addIngredient(ingredientColor); 
        });
    });

    function resetIngredients() {
        ingredientLines.innerHTML = ''; 
        currentHeight = 0; 
        breadAdded = false;
        totalPrice = 0;
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    }

    function addBread() {
        
        if (!breadAdded) {
            const breadTop = document.createElement('div');
            breadTop.style.position = 'absolute';
            breadTop.style.width = '200px';
            breadTop.style.height = '30px';
            breadTop.style.background = 'linear-gradient(to bottom, #d1a45f, #b0773c)';
            breadTop.style.borderRadius = '100px 100px 0 0';
            breadTop.style.top = `${-32 - currentHeight}px`; // Position au-dessus des ingrédients
            breadTop.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            ingredientLines.appendChild(breadTop);
            breadAdded = true; 
        }
    }

    resetButton.addEventListener('click', resetIngredients);
    finishButton.addEventListener('click', addBread);
});




