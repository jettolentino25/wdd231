const application = new URLSearchParams(window.location.search);
const firstName = application.get("firstName");
const lastName = application.get("lastName");
const membership = application.get("membership");

const membershipNames = new Map([
    ["nonprofit", "Nonprofit"],
    ["silver", "Silver"],
    ["gold", "Gold"]
]);

if (firstName && lastName && membershipNames.has(membership)) {
    const summary = document.querySelector("#application-summary");
    const level = membershipNames.get(membership);

    summary.textContent = `Thank you, ${firstName} ${lastName}. You selected ${level} membership for this demo.`;
}