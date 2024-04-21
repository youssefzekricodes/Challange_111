google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawCharts);
const barChartControle = document.getElementById("bar-chart__controle");
const dataMatrix = [
  { product: "Product A", date: "2022-01-01", price: 10, id: "001" },
  { product: "Product B", date: "2022-02-01", price: 12, id: "002" },
  { product: "Product C", date: "2022-03-01", price: 15, id: "003" },
  { product: "Product A", date: "2022-01-01", price: 8, id: "004" },
  { product: "Product B", date: "2022-02-01", price: 9, id: "005" },
  { product: "Product C", date: "2022-03-01", price: 11, id: "006" },
  { product: "Product A", date: "2022-01-01", price: 15, id: "007" },
  { product: "Product B", date: "2022-02-01", price: 18, id: "008" },
  { product: "Product C", date: "2022-03-01", price: 20, id: "009" },
];

function handleChangePrice(event) {
  const value = event.target.value;
  const id = event.target.dataset.id;
  const index = dataMatrix.findIndex(item => item.id === id);
  dataMatrix[index].price = Number(value);
  console.log(value, id);
  drawCharts();
}

barChartControle.innerHTML = `<div class="controle__column">
${dataMatrix.map(
  item => `<div class="controle__item">${item.date}</div>`
)}</div>
<div class="controle__column">
${dataMatrix.map(item => `<div class="controle__item">${item.product}</div>`)}
</div>
<div class="controle__column">
${dataMatrix.map(
  item =>
    `<div class="controle__item"><input type="number" min='0' value=${item.price} onchange="handleChangePrice(event)" data-id=${item.id}></input>
    </div>`
)}
</div>
`;

drawCharts();

function drawCharts() {
  const mapping = data => {
    const mappedData = [];
    data?.slice(0, 3).forEach(prod => {
      const productsWithSameDate = data.filter(
        prod2 => prod2.date === prod.date
      );
      const prices = productsWithSameDate.map(product => product.price);
      const newDataPoint = [prod.date, ...prices];
      mappedData.push(newDataPoint);
    });

    return mappedData;
  };

  var barData = google.visualization.arrayToDataTable([
    ["time", "Product A", "Product B", "Product C"],
    ...mapping(dataMatrix),
  ]);
  var barOptions = {
    focusTarget: "category",
    backgroundColor: "transparent",
    colors: ["#80ced7", "#ef233c", "#70e000"],
    fontName: "Open Sans",
    chartArea: {
      left: 50,
      top: 10,
      width: "100%",
      height: "70%",
    },
    bar: {
      groupWidth: "80%",
    },
    hAxis: {
      textStyle: {
        fontSize: 11,
      },
    },
    vAxis: {
      minValue: 0,
      maxValue: 20,
      baselineColor: "#DDD",
      gridlines: {
        color: "#DDD",
        count: 4,
      },
      textStyle: {
        fontSize: 11,
      },
    },
    legend: {
      position: "bottom",
      textStyle: {
        fontSize: 12,
      },
    },
    animation: {
      duration: 1200,
      easing: "out",
      startup: true,
    },
  };
  var barChart = new google.visualization.ColumnChart(
    document.getElementById("bar-chart")
  );
  barChart.draw(barData, barOptions);
}
