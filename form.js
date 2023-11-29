document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var commentsInput = document.getElementById('comments');
    var errorOutput = document.querySelector('output[name="errorOutput"]');
    var infoOutput = document.querySelector('output[name="infoOutput"]');
    var maxCharacters = 500;

    // Function to check the validity of each input
    function checkInputValidity(input) {
        if (!input.checkValidity()) {
            if (input === nameInput) {
                input.setCustomValidity("Please enter your name using only letters and spaces.");
            } else if (input === emailInput) {
                input.setCustomValidity("Please enter a valid email address.");
            } else if (input === commentsInput) {
                input.setCustomValidity("Comments must be between 5 and 500 characters.");
            }
            errorOutput.textContent = input.validationMessage;
        } else {
            input.setCustomValidity("");
            errorOutput.textContent = '';
        }
    }

    // Event listeners for real-time validation feedback
    [nameInput, emailInput, commentsInput].forEach(function(input) {
        input.addEventListener('blur', function() {
            checkInputValidity(input);
        });

        // Clear custom validity messages when the user starts to edit the field
        input.addEventListener('input', function() {
            input.setCustomValidity("");
            errorOutput.textContent = '';
        });
    });

    // Function to handle input and check against pattern
    function handleInput(event) {
        var input = event.target;
        var pattern = input.getAttribute('pattern');
        var newValue = input.value;
        var isValid = true;
    
        // Check each character individually
        for (let i = 0; i < newValue.length; i++) {
            if (!new RegExp(pattern).test(newValue[i])) {
                isValid = false;
                break;
            }
        }
    
        // If any character is invalid, show error and flash input
        if (!isValid) {
            input.value = newValue.slice(0, -1); // Remove last character
            showError("Illegal character entered");
    
            // Add the flash effect to the input
            input.classList.add('flash-input');
            setTimeout(function() {
                input.classList.remove('flash-input');
            }, 500); // Remove the flash effect after 0.5 seconds
        }
    }    
    
    function showError(message) {
        errorOutput.textContent = message;
        errorOutput.classList.add('flash');
        setTimeout(function() {
            errorOutput.classList.remove('flash');
        }, 3000); // Message will fade out after 3 seconds
    }

    // Attach event listeners
    [nameInput, emailInput, commentsInput].forEach(function(input) {
        if (input.getAttribute('pattern')) {
            input.addEventListener('input', handleInput);
        }
    });

    commentsInput.addEventListener('input', function() {
        var remaining = maxCharacters - commentsInput.value.length;
        
        infoOutput.textContent = remaining + " characters remaining";

        if (remaining <= 50 && remaining > 10) {
            // Warn style
            infoOutput.style.color = 'orange';
        } else if (remaining <= 10) {
            // Error style
            infoOutput.style.color = 'red';
        } else {
            // Default style
            infoOutput.style.color = 'black';
        }
    });
});
