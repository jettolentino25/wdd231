const memberList = document.querySelector("#member-list");

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
            const details = document.createElement("p");
            const description = document.createElement("p");
            const address = document.createElement("p");
            const phone = document.createElement("p");
            const website = document.createElement("p");
            const membership = document.createElement("p");

            name.textContent = member.name;
            details.textContent = `${member.category} · ${member.location}`;
            description.textContent = member.description;
            address.textContent = `Address: ${member.address}`;
            phone.textContent = `Phone: ${member.phone}`;
            website.textContent = `Website: ${member.website}`;
            membership.textContent = `Membership: ${member.membership}`;

            card.append(name, details, description, address, phone, website, membership);
            memberList.appendChild(card);
        });
    } catch (error) {
        memberList.textContent = "The member directory could not load.";
        console.error(error.message);
    }
}

loadMembers();