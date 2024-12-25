const text = [
    'The world is changing. I feel it in the water. I feel it in the earth. I smell it in the air. Many things that once were are now fading into memory. The lands that were once full of beauty and life now fall under shadows. Long ago, the world was as it should have been, a land of light and peace. But change has come, and with it, a darkening that cannot be undone.',
    'Much that once was is lost, for none now live who remember it. The stories of old, the whispers of the past, are vanishing from the hearts of men. Those who once knew the ancient ways are no more, their voices fading from the world. And yet, the memory of the Rings remains, passed from one age to the next, carried on the winds of time.',
    'It began with the forging of the Great Rings. Long before the dark times of war, long before the rise of Sauron, the Rings were crafted in secret. They were given to the Elves, the wisest, the fairest, the immortals who walked the earth. Three rings, forged by the hand of the greatest artisans. With them, they could weave the fabric of the world itself, preserving its beauty for eternity.',
    'But the rings were not for the Elves alone. Seven were given to the Dwarf Lords, great miners and craftsmen of the mountain halls. Their skills in stone and metal were unmatched, and with these rings, they were given dominion over the deep places of the world. But in their hearts burned a hunger for treasure, and their desire for wealth soon led to ruin.',
    'Nine rings were gifted to the race of Men, the most foolish of all. For while they held dominion over the world of flesh, their hearts longed for something more — something darker. They sought power above all else, and with each passing year, they grew more consumed by it. The Nine Rings gave them strength and authority, but in the end, they became slaves to their own desires.',
    'But they were all deceived, for another ring was made. In the shadowed lands, under the burning skies, in the fires of Mount Doom, the Dark Lord Sauron forged a ring unlike any other. A ring of unparalleled power, a ring that could control all others. A ring to rule them all, to bind them in his will.',
    'For in the Land of Mordor, in the depths of the mountain, Sauron created the One Ring. It was the source of his power, the key to his dominion. With it, he could control the minds of all who wore the lesser rings, bending them to his dark purposes. And though the Elves, Dwarves, and Men had their gifts, they were no match for the power of the One Ring. It was his creation, his triumph, and his curse.',
    'In the Land of Mordor, where the Shadows lie, Sauron ruled with fear and fire, and the world trembled beneath his gaze. He sought to enslave all free peoples, to make them bend to his will. But in the end, his own pride was his undoing. For even the One Ring could not protect him from the forces of fate.',
    'For the One Ring was lost, cast into the flames, and with it, the dark lord’s power was broken. But the Ring did not remain lost for long. The search for it began, as it always had, and as it always would. For the desire for power is eternal, and those who seek it will stop at nothing to claim it as their own.',
    'And so the world waits, forever in shadow, for the return of the One Ring. For even in its absence, its influence remains. The struggle for power never ends. It is the way of the world — a cycle that will continue for as long as the world endures.',
];

const form = document.querySelector('.lorem-form');
const amount = document.getElementById('amount');
const result = document.querySelector('.lorem-text');
const copyButton = document.getElementById('copyBtn');
const contentContainer = document.querySelector('.content'); 

// Add event listener for form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    // Parse the amount value
    const value = parseInt(amount.value);
    console.log('Input value:', value);  // Debug: Check the value of 'amount'

    // Validate the input value
    let generatedText = '';
    
    if (isNaN(value) || value < 1) {
        // Show random paragraph if input is invalid
        const random = Math.floor(Math.random() * text.length);
        generatedText = `<p class="result">${text[random]}</p>`;
    } else if (value <= 10) {
        // Generate paragraphs based on input value (1-10)
        let tempText = text.slice(0, value);  // Get the first 'value' elements
        tempText = tempText.map(function(item) {
            return `<p class="result">${item}</p>`;
        }).join("");  // Join the array elements into a single string
        generatedText = tempText;  // Show the result on the page
    } else {
        // Limit to a maximum of 40 paragraphs
        const maxParagraphs = 40;
        const paragraphsToShow = Math.min(value, maxParagraphs);  // Cap the value at 40
        
        let repeatText = [];
        while (repeatText.length < paragraphsToShow) {
            repeatText.push(...text);  // Add all text paragraphs
        }
        
        // Slice to the exact number requested
        repeatText = repeatText.slice(0, paragraphsToShow);
        let tempText = repeatText.map(function(item) {
            return `<p class="result">${item}</p>`;
        }).join("");  // Join the array elements into a single string
        generatedText = tempText;  // Show the result on the page
    }

    // Display the generated text and show the copy button
    copyButton.style.display = 'inline-block'; // Make the copy button visible

    contentContainer.style.display = 'block'; // or add class
    result.innerHTML = generatedText;
    copyButton.style.display = 'inline-block';
});

// Add event listener for the copy button
copyButton.addEventListener('click', function() {
    // Get the text to be copied
    const textToCopy = result.innerText;

    // Copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Change the button text to "Copied!"
        copyButton.textContent = "Copied!";
        copyButton.classList.add("copied");  // Add the 'copied' class
        
        // After 10 seconds, revert the button text back to "Copy Text"
        setTimeout(function() {
            copyButton.textContent = "Copy Text";
        }, 10000);  // 10000 milliseconds = 10 seconds
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
});

