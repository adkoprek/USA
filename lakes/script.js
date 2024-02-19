const lakes = [
    { x: 0.11, y: 0.19, index: 0 },
    { x: 0.18, y: 0.29, index: 1 },
    { x: 0.21, y: 0.57, index: 2 },
    { x: 0.47, y: 0.33, index: 3 },
    { x: 0.33, y: 0.65, index: 4 },
    { x: 0.51, y: 0.57, index: 5 },
    { x: 0.64, y: 0.59, index: 6 },
    { x: 0.77, y: 0.45, index: 7 },
    { x: 0.70, y: 0.61, index: 8 },
    { x: 0.72, y: 0.69, index: 9 },
    { x: 0.89, y: 0.25, index: 10 }
]

const cities_names = {
    0: "Columbia River",
    1: "Snake River",
    2: "Colorado River",
    3: "Missouri River",
    4: "Rio Grande",
    5: "Arkansas River",
    6: "Mississippi River",
    7: "Ohio River",
    8: "Tennessee River",
    9: "Alabama River",
    10: "Hudson River"
}

let i = 0;

let alrady_guest = []

let score = 0;
let tries = 0;
let total_gueses = 0;
let river_to_guess = get_random_int(11);
display_lake(river_to_guess);

function display_lake(index) {
    city_label = document.getElementById("city-label");
    city_label.innerHTML = cities_names[index];
}

function draw_point(x, y, color, index) {
    var point = document.createElement('div');
    point.className = 'point ' + index;
    point.style.backgroundColor = color;
    var img = document.querySelector('.image-container img');

    point.style.left = (x * 100) + '%';
    point.style.top = (y * 100) + '%';

    img.parentElement.appendChild(point);
}

function get_random_int(max) {
    while (true) {
        number = Math.floor(Math.random() * max);
        if (!alrady_guest.includes(number)) {
            alrady_guest.push(number);
            return number;
        }
    }
}

i = 0;
lakes.forEach(lake => {
    draw_point(lake.x, lake.y, 'black', i);
    i++;
});

var points = document.getElementsByClassName('point');

for (let point of points) {
    point.addEventListener('click', (event) => {

        let clicked_river = event.target.className.match(/\d+/g).pop();

        if (clicked_river == river_to_guess) {
            if (tries == 0) {
                draw_point(lakes[river_to_guess].x, lakes[river_to_guess].y, 'green');
            }
            else {
                draw_point(lakes[river_to_guess].x, lakes[river_to_guess].y, 'orange');
            }
            tries = 0;
            score++;
            total_gueses++;
            score_counter = document.getElementById("score");
            score_counter.innerHTML = total_gueses;

            if (total_gueses == 11) {
                alrady_guest = []
                total_gueses = 0;
                window.confirm("Du hast " + score + " von 11 Flüssen erraten", "New laden");
                score = 0;
                location.reload();
            }

            river_to_guess = get_random_int(11);
            display_lake(river_to_guess);
        }
        else {
            if (clicked_river != -1) {
                tries++;
            }

            if (tries == 3) {
                draw_point(lakes[river_to_guess].x, lakes[river_to_guess].y, 'red');
                tries = 0;
                total_gueses++;
                score_counter = document.getElementById("score");
                score_counter.innerHTML = total_gueses;

                if (total_gueses == 11) {
                    alrady_guest = []
                    total_gueses = 0;
                    window.confirm("Du hast " + score + " von 11 Flüssen erraten", "New laden");
                    score = 0;
                    location.reload();
                }

                river_to_guess = get_random_int(11);
                display_lake(river_to_guess);
            }
        }
    });
}
