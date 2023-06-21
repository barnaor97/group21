const loggedInUserCookie = getCookie("loggedInUser");
const loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

fetch(`/getOrdersByClientId?clientID=${loggedInUser.clientID}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => res.json())
    .then((res) => {
        if (res) {
            drawOrdersInTable(res);
        } else if (res.error) {
            console.log(res);
            alert(res.error);
        }
    });

function drawOrdersInTable(res) {
    const table = document.querySelector("table tbody");
    for (let i = 0; i < res.length; i++) {
        const order = res[i];
        console.log(order);
        let html = `
            <tr>
                <td>${order.full_name ?? ""}</td>
                <td>${order.city ?? ""}</td>
                <td>${order.street ?? ""}</td>
                <td>${order.number ?? ""}</td>
                <td>${toDateTime(order.start)}</td>
                <td>${toDateTime(order.end)}</td>
                <td>${order.babysitterApproved == 0 ? "no" : "yes"}</td>
            </tr>
        `;
        table.innerHTML += html;
    }
}
