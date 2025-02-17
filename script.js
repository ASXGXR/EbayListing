document.addEventListener("DOMContentLoaded", function () {



  // Weekly Profit Graph

  const ctx = document.getElementById('weeklySalesChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
              label: 'Sales (£)',
              data: [12, 20, 15, 30, 25, 40, 50], // Replace with actual sales data
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              fill: true // Set to false if you don't want the area under the line filled
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows height adjustment
        aspectRatio: 2.9, // Adjust this to make the chart shorter (higher number = shorter)
        scales: {
            y: { beginAtZero: true }
        }
      }
  });




  // Link URL

  document.querySelectorAll('.listing-item input[type="text"]').forEach(input => {
    input.addEventListener('mouseenter', () => input.focus());
  });



  // Count up

  const salesElement = document.querySelector(".card-title .green");
    const targetValue = parseInt(salesElement.innerText.replace(/[^0-9]/g, ""), 10); 
    let currentValue = 0;
    const duration = 1700; // Animation time in ms
    const increment = targetValue / (duration / 16); // Increment per frame

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
        }
        salesElement.innerText = `£${Math.floor(currentValue).toLocaleString()}`;
    }, 16);
  
  

});