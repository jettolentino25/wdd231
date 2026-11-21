const spotlightList = document.querySelector("#spotlight-list");
const spotlightStatus = document.querySelector("#spotlight-status");

function createSpotlight(member) {
    const card = document.createElement("article");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = "";
    image.width = 320;
    image.height = 180;
    image.loading = "lazy";

    const membership = document.createElement("p");
    membership.className = "spotlight-membership";
    membership.textContent = `${member.membership} member`;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("p");
    const url = new URL(member.website);

    if (url.hostname.endsWith(".example")) {
        website.textContent = `Sample website: ${url.hostname}`;
    } else {
        const link = document.createElement("a");
        link.href = url.href;
        link.textContent = `Visit ${member.name} website`;
        website.append(link);
    }

    card.append(name, image, membership, address, phone, website);
    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Could not load the member data.");
        }

        const { members } = await response.json();
        const eligible = members.filter((member) =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        for (let index = eligible.length - 1; index > 0; index -= 1) {
            const other = Math.floor(Math.random() * (index + 1));
            [eligible[index], eligible[other]] = [eligible[other], eligible[index]];
        }

        const selected = eligible.slice(0, 3);
        spotlightList.replaceChildren(...selected.map(createSpotlight));
        spotlightStatus.textContent = "";
    } catch {
        spotlightStatus.textContent = "Member spotlights are temporarily unavailable.";
    }
}

loadSpotlights();