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
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getPokemonElementType(type) {
  switch (type) {
    case "normal": {
      return { img: normal, hex: "#F9F9F9", rgba: "rgba(249, 249, 249, .35)" };
    }
    case "fighting": {
      return { img: fighting, hex: "#FD6600", rgba: "rgba(253, 102, 0, .35)" };
    }
    case "flying": {
      return { img: flying, hex: "#AFE9C5", rgba: "rgba(175, 233, 197, .35)" };
    }
    case "poison": {
      return { img: poison, hex: "#8A6F91", rgba: "rgba(138, 111, 145, 0.35)" };
    }
    case "ground": {
      return { img: ground, hex: "#C77137", rgba: "rgba(199, 113, 55, 0.35)" };
    }
    case "rock": {
      return { img: rock, hex: "#FDB380", rgba: "rgba(253, 179, 128, 0.35)" };
    }
    case "bug": {
      return { img: bug, hex: "#9393AC", rgba: "rgba(147, 147, 172, 0.35)" };
    }
    case "ghost": {
      return { img: ghost, hex: "#7D6F92", rgba: "rgba(125, 111, 146, 0.35)" };
    }
    case "steel": {
      return { img: steel, hex: "#707070", rgba: "rgba(112, 112, 112, 0.35)" };
    }
    case "fire": {
      return { img: fire, hex: "#FD2A2A", rgba: "rgba(253, 42, 42, 0.35)" };
    }
    case "water": {
      return { img: water, hex: "#297EFF", rgba: "rgba(41, 126, 255, 0.35)" };
    }
    case "grass": {
      return { img: grass, hex: "#5BA02C", rgba: "rgba(91, 160, 44, 0.35)" };
    }
    case "electric": {
      return {
        img: electric,
        hex: "#FEE680",
        rgba: "rgba(254, 230, 128, 0.35)",
      };
    }
    case "psychic": {
      return { img: psychic, hex: "#C738AB", rgba: "rgba(199, 56, 171, 0.35)" };
    }
    case "ice": {
      return { img: ice, hex: "#D5FFF5", rgba: "rgba(213, 255, 245, 0.35)" };
    }
    case "dragon": {
      return { img: dragon, hex: "#FDAB0B", rgba: "rgba(253, 171, 11, 0.35)" };
    }
    case "dark": {
      return { img: dark, hex: "#FFF", rgba: "rgba(255, 255, 255, 0.35)" };
    }
    case "fairy": {
      return { img: fairy, hex: "#FB8BEC", rgba: "rgba(251, 139, 236, 0.35)" };
    }
    case "unknown": {
      return { img: unknown, hex: "#231F20", rgba: "rgba(35, 31, 32, 0.35)" };
    }
    case "shadow": {
      return { img: shadow, hex: "#5B5366", rgba: "rgba(91, 83, 102, 0.35)" };
    }
    default:
      return null;
  }
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
    return parseFloat(price * rateUSDToken).toFixed(3);
  } else {
    return parseFloat(price * rateUSDToken).toFixed(3);
  }
}
