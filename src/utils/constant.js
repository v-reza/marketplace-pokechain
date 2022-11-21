import bug from "@/dist/type/bug.png";
import dark from "@/dist/type/dark.png";
import dragon from "@/dist/type/dragon.png";
import electric from "@/dist/type/electric.png";
import fairy from "@/dist/type/fairy.png";
import fighting from "@/dist/type/fight.png";
import fire from "@/dist/type/fire.png";
import flying from "@/dist/type/flying.png";
import ghost from "@/dist/type/ghost.png";
import grass from "@/dist/type/grass.png";
import ground from "@/dist/type/ground.png";
import ice from "@/dist/type/ice.png";
import normal from "@/dist/type/normal.png";
import poison from "@/dist/type/poison.png";
import psychic from "@/dist/type/psychic.png";
import rock from "@/dist/type/rock.png";
import shadow from "@/dist/type/shadow.png";
import steel from "@/dist/type/steel.png";
import unknown from "@/dist/type/unknown.png";
import water from "@/dist/type/water.png";
import axios from "axios";
import awakening from "@/dist/items/awakening.webp";
import fullHeal from "@/dist/items/full-heal.png";
import masterBall from "@/dist/items/master-ball.png";
import maxRevive from "@/dist/items/max-revive.png";
import revive from "@/dist/items/revive.png";
import mediumBall from "@/dist/items/medium-ball.png";
import potion from "@/dist/items/potion.png";
import protein from "@/dist/items/protein.png";
import ultraBall from "@/dist/items/ultra-ball.png";
import xAttack from "@/dist/items/x-attack.png";
import xDefense from "@/dist/items/x-defense.png";
import token from "@/dist/token.png";

//evolve item
import dragonScale from "@/dist/items/dragon-scale.webp";
import electirizer from "@/dist/items/electirizer.webp";
import magmarizer from "@/dist/items/magmarizer.webp";
import ovalStone from "@/dist/items/oval-stone.webp";
import protector from "@/dist/items/protector.png";
import metalCoat from "@/dist/items/metal-coat.webp";
import kingsRock from "@/dist/items/kings-rock.webp";
import sunStone from "@/dist/items/sun-stone.png";
import moonStone from "@/dist/items/moon-stone.webp";
import waterStone from "@/dist/items/water-stone.webp";
import thunderStone from "@/dist/items/thunder-stone.png";
import leafStone from "@/dist/items/leaf-stone.png";
import fireStone from "@/dist/items/fire-stone.png";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getPriceToToken(price) {
  const rateUSDToken = 0.028888;
  if (process.env.currency === "IDR") {
    // var rateIDR;
    // axios
    //   .get(
    //     "https://openexchangerates.org/api/latest.json?app_id=e0e9bf8de43d4dc5ad938761d4cd928b"
    //   )
    //   .then((res) => {
    //     rateIDR = res.data.rates.IDR;
    //     console.log(res)
    //   });
    return parseFloat(price * rateUSDToken).toFixed(2);
  } else {
    return parseFloat(price * rateUSDToken).toFixed(2);
  }
}
