const spotlightStatus = document.querySelector("#spotlight-status");
const spotlightList = document.querySelector("#spotlight-list");

function createSpotlight(member) {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    title.textContent = member.name;

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = "";
    image.loading = "lazy";
    image.width = 320;
    image.height = 180;

    const membership = document.createElement("p");
    membership.className = "spotlight-membership";
    membership.textContent = `${member.membership} member`;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("a");
    phone.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
    phone.textContent = member.phone;
    const phoneLine = document.createElement("p");
    phoneLine.append(phone);

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

    card.append(title, image, membership, address, phoneLine, website);
    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Member data is unavailable.");
        }

        const { members } = await response.json();
        const eligible = members.filter(({ membership }) =>
            membership === "Gold" || membership === "Silver"
        );

        for (let index = eligible.length - 1; index > 0; index -= 1) {
            const other = Math.floor(Math.random() * (index + 1));
            [eligible[index], eligible[other]] = [eligible[other], eligible[index]];
        }

        const selected = eligible.slice(0, 3);
        if (selected.length < 2) {
            throw new Error("Too few eligible spotlight members.");
        }
        spotlightList.replaceChildren(...selected.map(createSpotlight));
        spotlightStatus.textContent = "";
    } catch {
        spotlightStatus.textContent = "Member spotlights are temporarily unavailable.";
    }
}

loadSpotlights();
