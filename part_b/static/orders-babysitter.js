const orders_table = document.querySelector('.ordersTable');
let finished_orders_counter = 0; // Initialize a counter variable to 0
let past_orders = document.querySelector('.past_orders')

// Loop through the table rows
for (let i = 0; i < orders_table.rows.length; i++) {
  // Get a reference to the row and the completed cell
  const row = orders_table.rows[i];
  const completedCell = row.cells[5];

  // If the completed cell is true, increment the counter
  if ( completedCell.textContent === 'completed') {
    finished_orders_counter++;
  }
}

// Log the order counter
console.log(`made ${finished_orders_counter} completed orders.`);
past_orders.textContent = `The number of finished jobs is ${finished_orders_counter}`




 // JavaScript code to toggle the visibility of the rolling message container
    window.addEventListener('scroll', function() {
      const rollingMessageContainer = document.getElementById('rollingMessageContainer');
      const rollingMessage = document.getElementById('rollingMessage');
      const rollingMessageRect = rollingMessage.getBoundingClientRect();

      // Add the "visible" class if the rolling message is within the viewport
      if (rollingMessageRect.top < window.innerHeight && rollingMessageRect.bottom >= 0) {
        rollingMessageContainer.classList.add('visible');
      } else {
        rollingMessageContainer.classList.remove('visible');
      }
    });