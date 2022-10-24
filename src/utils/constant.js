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
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getPokemonElementType(type) {
  switch (type) {
    case "normal": {
      return { img: normal, hex: "#F9F9F9" };
    }
    case "fighting": {
      return { img: fighting, hex: "#FD6600" };
    }
    case "flying": {
      return { img: flying, hex: "#AFE9C5" };
    }
    case "poison": {
      return { img: poison, hex: "#8A6F91" };
    }
    case "ground": {
      return { img: ground, hex: "#C77137" };
    }
    case "rock": {
      return { img: rock, hex: "#FDB380" };
    }
    case "bug": {
      return { img: bug, hex: "#9393AC" };
    }
    case "ghost": {
      return { img: ghost, hex: "#7D6F92" };
    }
    case "steel": {
      return { img: steel, hex: "#707070" };
    }
    case "fire": {
      return { img: fire, hex: "#FD2A2A" };
    }
    case "water": {
      return { img: water, hex: "#297EFF" };
    }
    case "grass": {
      return { img: grass, hex: "#5BA02C" };
    }
    case "electric": {
      return { img: electric, hex: "#FEE680" };
    }
    case "psychic": {
      return { img: psychic, hex: "#C738AB" };
    }
    case "ice": {
      return { img: ice, hex: "#D5FFF5" };
    }
    case "dragon": {
      return { img: dragon, hex: "#FDAB0B" };
    }
    case "dark": {
      return { img: dark, hex: "#FFF" };
    }
    case "fairy": {
      return { img: fairy, hex: "#FB8BEC" };
    }
    case "unknown": {
      return { img: unknown, hex: "#231F20" };
    }
    case "shadow": {
      return { img: shadow, hex: "#5B5366" };
    }
    default:
      return null;
  }
}

export function getPriceToToken(price) {
    const rateUSDToken = 0.888000
    return parseFloat(price * rateUSDToken).toFixed(3) 
}
