const loggedInUserCookie = getCookie("loggedInUser");
const loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

fetch(`/getApplications?babysitterID=${loggedInUser.babysitterID}`, {
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
        let html = `
            <tr>
                <td>${order.city ?? ""}</td>
                <td>${order.street ?? ""}</td>
                <td>${order.number ?? ""}</td>
                <td>${toDateTime(order.start)}</td>
                <td>${toDateTime(order.end)}</td>
                <td>${order.kids_number ?? ""}</td>
                <td>${order.full_name ?? ""}</td>
                <td>${order.phone_Number ?? ""}</td>
                    `;

        if (order.babysitterApproved) {
            html += `<td>
                        Approved
                    </td>`;
        } else {
            html += `<td>
            <button onclick="approve(${order.orderID})">Approve</button>
        </td>`;
        }

        html += `
            </tr>
        `;
        table.innerHTML += html;
    }
}

function approve(id) {
    fetch("/approveOrder", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderID: id,
            babysitterID: loggedInUser.babysitterID,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                window.location.reload();
            } else if (res.error) {
                console.log(res);
                alert(res.error);
            }
        });
}
