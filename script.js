let root = document.getElementById("root");
let mat = root.querySelector(".matric");
let rowsCols = document.getElementById("rowsCols");
let startNum = document.getElementById("startNum");
let runBtn = document.getElementById("runBtn");
let matChilds = document.getElementsByClassName("num");
runBtn.addEventListener("click", () => {
  let p1 = +rowsCols.value;
  let p2 = +startNum.value;
  createMatric(p1, p2);
});
let mainArr = [];
let selectedItems = [];
function emptyArea() {
  mat.innerHTML = "";
}
function createMatric(n, val = 0) {
  for (let i = 0; i < n; i++) {
    mainArr.push([]);
    for (let j = val + 1; j <= n + val; j++) {
      mainArr[i].push({
        item: j,
        disabled: false,
      });
    }
    val++;
  }
  return drow(mainArr);
}
function drow(obj) {
  mat.innerHTML = "";
  emptyArea();
  for (let i = 0; i < obj.length; i++) {
    let item = obj[i];

    for (const itemKey in item) {
      let box = document.createElement("div");
      box.innerHTML = item[itemKey].item;
      box.dataset.index = i;
      box.dataset.item = itemKey;
      box.classList.add("num");
      box.style.width = 600 / obj.length + "px";
      box.style.fontSize = 200 / obj.length + "px";
      box.style.height = box.style.width;
      //
      if (item[itemKey].changeBg) {
        box.classList.add("bg-red");
      }

      if (!item[itemKey].disabled && selectedItems.length < +rowsCols.value) {
        box.addEventListener("click", changeObject, { once: true });
      }
      box.style.cursor = item[itemKey].disabled ? "no-drop" : "crosshair";
      mat.appendChild(box);
    }
  }
}
function changeObject(e) {
  let x_index = e.target.dataset.index;
  let x_item = e.target.dataset.item;
  selectedItems.push(mainArr[x_index][x_item]);

  mainArr[x_index][x_item].changeBg = true;
  for (const xItemKey in mainArr) {
    if (xItemKey === x_index) {
      mainArr[xItemKey].map((item) => (item.disabled = true));
    }

    mainArr[xItemKey][x_item].disabled = true;
  }

  return drow(mainArr);
}
selectedItems = selectedItems.sort((a, b) => b.item - a.item);
document.getElementById("result").onclick = function () {
  let ankyunagic = [];
  for (let i = rowsCols.value, j = +rowsCols.value - 1; i >= 1; i--, j--) {
    for (const key in selectedItems[selectedItems.length - i]) {
      mainArr[j][mainArr[j].length - i][key] =
        selectedItems[selectedItems.length - i][key];
    }
    ankyunagic.push(mainArr[j][mainArr[j].length - i]);
  }
  ankyunagic.forEach((e) => {
    if (mainArr.flat(4).includes(e)) {
      e.chicho = true;
      e.changeBg = true;
      console.log(e);
    }
  });
  mainArr.flat(4).forEach((e) => {
    if (!e.chicho) {
      e.changeBg = false;
    }
  });

  for (let i = 1; i < mainArr.length; i++) {
    for (let j = mainArr[i].length - i; j < mainArr[i].length; j++) {
      mainArr[i][j].item--;
    }
  }
  console.log(mainArr);
  drow(mainArr);
};

