/* .js files add interaction to your website */
var reducewaylist = [
  "Compost at home! You can use food waste to create nutrient-rich soil.",
  "Buy the amount of food you need, not want.",
  "Store food properly to prevent spoilage.",
  "Plan meals for the week and only buy the ingredients you need.",
  "Do not have a clustered fridge! If you do use up the food in your fridge before it spoils.",
  "Sort your food waste into the compost bin!",
];

console.log(reducewaylist);

var reduceway = document.getElementById("reduceway");
var button1 = document.getElementById("button1");
var count = 0;

button1.addEventListener("click", displayReduceWay);

function displayReduceWay(){
  reduceway.innerHTML = reducewaylist[count];
  count++;
  if (count == reducewaylist.length){
    count = 0;
  }
}