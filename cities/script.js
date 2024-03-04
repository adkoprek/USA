const cities = [
    { x: 0.12, y: 0.14, index: 0 },
    { x: 0.1, y: 0.20, index: 1 },
    { x: 0.06, y: 0.46, index: 2 },
    { x: 0.11, y: 0.61, index: 3 },
    { x: 0.13, y: 0.66, index: 4 },
    { x: 0.23, y: 0.67, index: 5 },
    { x: 0.25, y: 0.42, index: 6 },
    { x: 0.37, y: 0.47, index: 7 },
    { x: 0.52, y: 0.71, index: 8 },
    { x: 0.55, y: 0.81, index: 9 },
    { x: 0.55, y: 0.49, index: 10 },
    { x: 0.565, y: 0.29, index: 11 },
    { x: 0.63, y: 0.49, index: 12 },
    { x: 0.66, y: 0.34, index: 13 },
    { x: 0.66, y: 0.38, index: 14 },
    { x: 0.65, y: 0.79, index: 15 },
    { x: 0.70, y: 0.44, index: 16 },
    { x: 0.73, y: 0.45, index: 17 },
    { x: 0.74, y: 0.335, index: 18 },
    { x: 0.75, y: 0.41, index: 19 },
    { x: 0.75, y: 0.63, index: 20 },
    { x: 0.77, y: 0.36, index: 21 },
    { x: 0.81, y: 0.81, index: 22 },
    { x: 0.86, y: 0.86, index: 23 },
    { x: 0.81, y: 0.56, index: 24 },
    { x: 0.80, y: 0.37, index: 25 },
    { x: 0.81, y: 0.28, index: 26 },
    { x: 0.86, y: 0.41, index: 27 },
    { x: 0.86, y: 0.38, index: 28 },
    { x: 0.89, y: 0.35, index: 29 },
    { x: 0.90, y: 0.31, index: 30 },
    { x: 0.91, y: 0.27, index: 31 },
    { x: 0.93, y: 0.24, index: 32 },
]

const cities_names = {
    0:  "Seattle",
    1:  "Portland",
    2:  "San Francisco",
    3:  "Los Angeles",
    4:  "San Diego",
    5:  "Phoenix",
    6:  "Salt Lake City",
    7:  "Denver",
    8:  "Dallas",
    9:  "Houston",
    10: "Kansas City",
    11: "Minneapolis & St. Paul",
    12: "St. Louis",
    13: "Milwaukee",
    14: "Chicago",
    15: "New Orleans",
    16: "Indianapolis",
    17: "Cincinnati",
    18: "Detroit",
    19: "Columbus",
    20: "Atlanta",
    21: "Cleveland",
    22: "Tampa",
    23: "Miami",
    24: "Charlotte",
    25: "Pittsburgh",
    26: "Buffalo",
    27: "Washington D.C.",
    28: "Baltimore",
    29: "Philadelphia",
    30: "New York City",
    31: "Hartford",
    32: "Boston",
}

alrady_guest = []

score = 0;
tries = 0;
total_gueses = 0;
city_to_guess = get_random_int(33);
display_city(city_to_guess);

function get_clicked_item(x, y) {
    let city_index = -1;

    cities.forEach(city => {
        if (x > (city.x - 0.02) && x < (city.x + 0.02) && y > (city.y - 0.02) && y < (city.y + 0.02)) {
            city_index = city.index
        }
    });

    return city_index;
}

function display_city(index) {
    city_label = document.getElementById("city-label");
    city_label.innerHTML = cities_names[index];
}

function draw_point(x, y, color) {
    var point = document.createElement('div');
    point.className = 'point';
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

document.querySelector('img').addEventListener('click', (event) => {
    var x = event.offsetX / event.target.offsetWidth;
    var y = event.offsetY / event.target.offsetHeight;

    console.log({x, y});
    
    clicked_city = get_clicked_item(x, y);

    if (clicked_city == city_to_guess) {
        if (tries == 0){
            draw_point(cities[city_to_guess].x, cities[city_to_guess].y, 'green');
        }
        else {
            draw_point(cities[city_to_guess].x, cities[city_to_guess].y, 'orange');
        }
        tries = 0;
        score++;
        total_gueses++;
        score_counter = document.getElementById("score");
        score_counter.innerHTML = total_gueses;

        if (total_gueses == 33) {
            alrady_guest = []
            total_gueses = 0;
            window.confirm("Du hast " + score + " Städte von 33 erraten", "New laden");
            score = 0;
            location.reload();
        }

        city_to_guess = get_random_int(33);
        display_city(city_to_guess);
    }
    else {
        if (clicked_city != -1) {
            tries++;
        }

        if (tries == 3) {
            draw_point(cities[city_to_guess].x, cities[city_to_guess].y, 'red');
            tries = 0;
            total_gueses++;
            score_counter = document.getElementById("score");
            score_counter.innerHTML = total_gueses;
            
            if (total_gueses == 33) {
                alrady_guest = []
                total_gueses = 0;
                window.confirm("Du hast " + score + " von 33 Städten erraten", "New laden");
                score = 0;
                location.reload();
            }

            city_to_guess = get_random_int(33);
            display_city(city_to_guess);
        }
    }
});