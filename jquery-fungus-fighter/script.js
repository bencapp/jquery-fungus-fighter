$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;

// player and fungus values (these will change)
let fungusHP = 100;
let playerAP = 100;

let regenerating = false;

// single array of objects for accessing stats
const attackStats = [
  { name: "arcane-sceptre", APCost: 12, HPDamage: 14 },
  { name: "entangle", APCost: 23, HPDamage: 9 },
  { name: "dragon-blade", APCost: 38, HPDamage: 47 },
  { name: "star-fire", APCost: 33, HPDamage: 25 },
];

function onReady() {
  // Make sure you check the index.html file!
  // There are lots of buttons and things ready for you to hook into here!
  // 🧠 Remember
  // - Handle events that ->
  // - Updates state which is ->
  // - Rendered to the DOM

  // EVENT LISTENERS
  $(".attack-btn").on("click", attack);
}

// function to handle attacks for each attack type
function attack() {
  // pull out the corresponding object for the clicked attack type
  let thisAttack = attackStats.find(
    (element) => element.name == $(this).attr("class").split(" ")[1]
  );

  // UPDATE STATE
  if (playerAP >= thisAttack.APCost) {
    playerAP -= thisAttack.APCost;
    if (fungusHP >= thisAttack.HPDamage) {
      fungusHP -= thisAttack.HPDamage;
    } else {
      fungusHP = 0;
    }
  }

  if (!regenerating) {
    regenerating = true;
    regenerate();
  }

  render();
}

//stretch goal regeneration function
function regenerate() {
  let regeneration = setInterval(function () {
    if (fungusHP < 50 && fungusHP !== 0) {
      fungusHP++;
      renderHP();
    } else {
      clearInterval(regeneration);
      regenerating = false;
      return;
    }
  }, 1000);
}

// render to the DOM
function render() {
  // update ap text and fill bar
  $(".ap-text").text(`${playerAP} AP`);
  console.log($("#ap-meter").val());
  $("#ap-meter").val(playerAP);

  // update hp text and fill bar
  renderHP();

  // if fungus is at 0 HP, it's dead
  if (fungusHP === 0) {
    $(".freaky-fungus").removeClass("walk").addClass("dead");
  }
  // if player has no AP (less than 12), the player dies
  if (playerAP < 12) {
    $(".freaky-fungus").removeClass("walk").addClass("jump");
  }
}

// I'm using this twice, so I'm giving it its own function
function renderHP() {
  $(".hp-text").text(`${fungusHP} HP`);
  $("#hp-meter").val(fungusHP);
}
