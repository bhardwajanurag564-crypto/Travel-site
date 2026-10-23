
"use strict";

/* TOUR PACKAGE DATA */
const packages = [
    {
        id: 1,
        name: "Manali Mountain Escape",
        destination: "Manali",
        days: 4,
        nights: 3,
        price: 7999,
        description: "Explore pine forests, mountain views and beautiful valleys.",
        highlights: ["Solang Valley", "Old Manali", "Mountain Views"],
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
        itinerary: [
            "Day 1: Arrival in Manali and local walk.",
            "Day 2: Solang Valley sightseeing.",
            "Day 3: Old Manali and nearby attractions.",
            "Day 4: Breakfast and departure."
        ]
    },
    {
        id: 2,
        name: "Shimla Hill Getaway",
        destination: "Shimla",
        days: 3,
        nights: 2,
        price: 4999,
        description: "Enjoy heritage walks, cafés and scenic hill-town views.",
        highlights: ["Mall Road", "The Ridge", "Kufri"],
        image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
        itinerary: [
            "Day 1: Arrival and Mall Road walk.",
            "Day 2: Kufri and local sightseeing.",
            "Day 3: Breakfast and departure."
        ]
    },
    {
        id: 3,
        name: "Spiti Valley Expedition",
        destination: "Spiti Valley",
        days: 6,
        nights: 5,
        price: 14999,
        description: "Discover high-altitude landscapes and remote villages.",
        highlights: ["Kaza", "Monasteries", "Mountain Roads"],
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        itinerary: [
            "Day 1: Begin the mountain journey.",
            "Day 2: Acclimatise and explore locally.",
            "Day 3: Visit nearby villages.",
            "Day 4: Explore a monastery and valley views.",
            "Day 5: Flexible sightseeing day.",
            "Day 6: Return journey."
        ]
    },
    {
        id: 4,
        name: "Dharamshala Nature Break",
        destination: "Dharamshala",
        days: 4,
        nights: 3,
        price: 8999,
        description: "Enjoy peaceful mountain walks and local culture.",
        highlights: ["McLeod Ganj", "Cafés", "Nature Walks"],
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        itinerary: [
            "Day 1: Arrival in Dharamshala.",
            "Day 2: Explore McLeod Ganj.",
            "Day 3: Nature walks and viewpoints.",
            "Day 4: Departure."
        ]
    }
];

/* SELECT HTML ELEMENTS */
const packageList = document.getElementById("package-list");
const destinationFilter = document.getElementById("destination-filter");
const budgetFilter = document.getElementById("budget-filter");
const durationFilter = document.getElementById("duration-filter");
const sortFilter = document.getElementById("sort-filter");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

const enquiryForm = document.getElementById("enquiry-form");
const formMessage = document.getElementById("form-message");

/* FORMAT PRICE */
function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}

/* DISPLAY PACKAGE CARDS */
function displayPackages(items) {
    packageList.innerHTML = "";

    resultsCount.textContent =
        `${items.length} package${items.length === 1 ? "" : "s"} found`;

    if (items.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    items.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "package-card";

        const image = document.createElement("img");
        image.className = "package-image";
        image.src = item.image;
        image.alt = item.name;
        image.loading = "lazy";

        image.addEventListener("error", function () {
            image.alt = "Package image unavailable";
            image.style.display = "none";
        });

        const body = document.createElement("div");
        body.className = "package-body";

        const meta = document.createElement("div");
        meta.className = "package-meta";
        meta.textContent =
            `${item.destination} | ${item.days} days / ${item.nights} nights`;

        const heading = document.createElement("h3");
        heading.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const highlights = document.createElement("div");
        highlights.className = "package-highlights";

        item.highlights.forEach(function (highlight) {
            const chip = document.createElement("span");
            chip.className = "highlight";
            chip.textContent = highlight;
            highlights.appendChild(chip);
        });

        const foot = document.createElement("div");
        foot.className = "package-foot";

        const price = document.createElement("span");
        price.className = "package-price";
        price.textContent = formatPrice(item.price);

        const detailsButton = document.createElement("button");
        detailsButton.className = "details-btn";
        detailsButton.type = "button";
        detailsButton.textContent = "View itinerary";

        detailsButton.addEventListener("click", function () {
            showItinerary(item);
        });

        foot.append(price, detailsButton);
        body.append(meta, heading, description, highlights, foot);
        card.append(image, body);
        packageList.appendChild(card);
    });
}

/* FILTER AND SORT PACKAGES */
function filterPackages() {
    const destination = destinationFilter.value;
    const budget = budgetFilter.value === "all"
        ? Infinity
        : Number(budgetFilter.value);

    const duration = durationFilter.value === "all"
        ? Infinity
        : Number(durationFilter.value);

    let filtered = packages.filter(function (item) {
        return (
            (destination === "all" ||
                item.destination === destination) &&
            item.price <= budget &&
            item.days <= duration
        );
    });

    if (sortFilter.value === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortFilter.value === "duration-asc") {
        filtered.sort((a, b) => a.days - b.days);
    }

    displayPackages(filtered);
}

/* SHOW DAY-WISE ITINERARY */
function showItinerary(item) {
    const details = item.itinerary.join("\n");

    alert(
        item.name + "\n\n" +
        "Destination: " + item.destination + "\n" +
        "Duration: " + item.days + " days / " + item.nights + " nights\n" +
        "Sample price: " + formatPrice(item.price) + "\n\n" +
        "ITINERARY\n" + details +
        "\n\nNote: Package details and prices are demo examples."
    );
}

/* FILTER EVENT LISTENERS */
destinationFilter.addEventListener("change", filterPackages);
budgetFilter.addEventListener("change", filterPackages);
durationFilter.addEventListener("change", filterPackages);
sortFilter.addEventListener("change", filterPackages);

/* RESET FILTERS */
document.getElementById("reset-filters").addEventListener("click", function () {
    destinationFilter.value = "all";
    budgetFilter.value = "all";
    durationFilter.value = "all";
    sortFilter.value = "featured";

    filterPackages();
});

/* ENQUIRY FORM VALIDATION */
enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const destination =
        document.getElementById("enquiry-destination").value;

    formMessage.className = "";

    if (name.length < 2) {
        showFormMessage("Please enter your full name.", "error");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
        showFormMessage(
            "Please enter a valid 10-digit Indian mobile number.",
            "error"
        );
        return;
    }

    if (destination === "") {
        showFormMessage("Please select a destination.", "error");
        return;
    }

    showFormMessage(
        `Thank you, ${name}! Your demo enquiry is validated. It has not been sent to a server.`,
        "success"
    );

    enquiryForm.reset();
});

/* SHOW FORM MESSAGE */
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
}

/* INITIAL WEBSITE LOAD */
filterPackages();
