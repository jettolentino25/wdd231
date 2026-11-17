const memberList = document.querySelector("#member-list");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

function setDirectoryView(isListView) {
    memberList.classList.toggle("list-view", isListView);
    gridButton.setAttribute("aria-pressed", String(!isListView));
    listButton.setAttribute("aria-pressed", String(isListView));
}

gridButton.addEventListener("click", () => setDirectoryView(false));
listButton.addEventListener("click", () => setDirectoryView(true));

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Member request failed (${response.status}).`);
        }

        const data = await response.json();

        data.members.forEach((member) => {
            const card = document.createElement("section");
            const name = document.createElement("h2");
            const image = document.createElement("img");
            const details = document.createElement("p");
            const description = document.createElement("p");
            const address = document.createElement("p");
            const phone = document.createElement("p");
            const website = document.createElement("p");
            const membership = document.createElement("p");

            name.textContent = member.name;
            image.className = "member-image";
            image.src = `images/${member.image}`;
            image.alt = "";
            image.loading = "lazy";

            details.textContent = `${member.category} · ${member.location}`;
            description.textContent = member.description;
            address.textContent = `Address: ${member.address}`;
            phone.textContent = `Phone: ${member.phone}`;
            website.textContent = `Website: ${member.website}`;
            membership.textContent = `Membership: ${member.membership}`;

            card.append(name, image, details, description, address, phone, website, membership);
            memberList.appendChild(card);
        });
    } catch (error) {
        memberList.textContent = "The member directory could not load.";
        console.error(error.message);
    }
}

loadMembers();