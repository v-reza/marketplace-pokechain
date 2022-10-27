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
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getRarity(rarity) {
  switch (rarity) {
    case "common":
      return {
        name: "Common",
        hex: "#8B989B",
        svg: (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ color: "#8B989B" }}
          >
            <path
              d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      };
    case "rare":
      return {
        name: "Rare",
        hex: "#2DC661",
        svg: (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ color: "#2DC661" }}
          >
            <path
              d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      };
    case "epic":
      return {
        name: "Epic",
        hex: "#26C0CA",
        svg: (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ color: "#26C0CA" }}
          >
            <path
              d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      };
    case "legendary":
      return {
        name: "Legendary",
        hex: "#DC8A0C",
        svg: (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ color: "#DC8A0C" }}
          >
            <path
              d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      };
    default:
      return "bg-gray-500";
  }
}

export function getItemType(type) {
  switch (type) {
    case "awakening": {
      return {
        img: awakening,
        hex: "#90D2E4",
        rgba: "rgba(144, 210, 228, 0.35)",
        detail: {
          name: "Awakening",
          effect: "Awakens a Pokémon.",
          rarity: getRarity("epic"),
          required: {
            name: "Max Level Pokémon",
          },
        },
      };
    }
    case "full-heal": {
      return {
        img: fullHeal,
        hex: "#BBB300",
        rgba: "rgba(187, 179, 0, 0.35)",
        detail: {
          name: "Full Heal",
          effect: "Fully heals a Pokémon.",
          rarity: getRarity("rare"),
          required: {
            name: "Pokémon Health is less than 50%",
            value: 0.5,
          },
        },
      };
    }
    case "master-ball": {
      return {
        img: masterBall,
        hex: "#AE61E8",
        rgba: "rgba(174, 97, 232, 0.35)",
        detail: {
          name: "Master Ball",
          effect: "Increase your level pokemon",
          rarity: getRarity("common"),
          required: {
            name: "Pokémon is level 1-3",
            value: {
              level: {
                1: 300,
                2: 200,
                3: 100,
              },
            },
          },
        },
      };
    }
    case "max-revive": {
      return {
        img: maxRevive,
        hex: "#9FA138",
        rgba: "rgba(159, 161, 56, 0.35)",
        detail: {
          name: "Max Revive",
          effect: "Revives a Pokémon with full health.",
          rarity: getRarity("legendary"),
          required: {
            name: "Pokémon is fainted / dead",
          },
        },
      };
    }
    case "revive": {
      return {
        img: revive,
        hex: "#FEF789",
        rgba: "rgba(254, 247, 137, 0.35)",
        detail: {
          name: "Revive",
          effect: "Revives a Pokémon with half health.",
          rarity: getRarity("epic"),
          required: {
            name: "Pokémon is fainted / dead",
          },
        },
      };
    }
    case "medium-ball": {
      return {
        img: mediumBall,
        hex: "#5BB2DD",
        rgba: "rgba(91, 178, 221, 0.35)",
        detail: {
          name: "Medium Ball",
          effect: "Increase your level pokemon",
          rarity: getRarity("epic"),
          required: {
            name: "Pokémon is level 1-6",
            value: {
              level: {
                1: 800,
                2: 700,
                3: 600,
                4: 500,
                5: 400,
                6: 300,
              },
            },
          },
        },
      };
    }
    case "potion": {
      return {
        img: potion,
        hex: "#CA30EF",
        rgba: "rgba(202, 48, 239, 0.35)",
        detail: {
          name: "Potion",
          effect: "Heals a Pokémon by 20 HP.",
          rarity: getRarity("common"),
          required: {
            name: "Pokémon Health is less than 100%",
            value: 0.2,
          },
        },
      };
    }
    case "protein": {
      return {
        img: protein,
        hex: "#955C36",
        rgba: "rgba(149, 92, 54, 0.35)",
        detail: {
          name: "Protein",
          effect: "Increase your 10 attack, 20 defense all pokemon",
          rarity: getRarity("common"),
          required: {
            name: "First start game",
            value: {
              attack: 10,
              defense: 20,
            },
          },
        },
      };
    }
    case "ultra-ball": {
      return {
        img: ultraBall,
        hex: "#FED722",
        rgba: "rgba(254, 215, 34, 0.35)",
        detail: {
          name: "Ultra Ball",
          effect: "Increase your level pokemon",
          rarity: getRarity("legendary"),
          required: {
            name: "Pokémon is level 6-10",
            value: {
              level: {
                6: 800,
                7: 700,
                8: 600,
                9: 500,
                10: 400,
              },
            },
          },
        },
      };
    }
    case "x-attack": {
      return {
        img: xAttack,
        hex: "#E198A5",
        rgba: "rgba(225, 152, 165, 0.35)",
        detail: {
          name: "X Attack",
          effect: "Increase your 20 attack pokemon",
          rarity: getRarity("rare"),
          required: {
            name: "Game is start",
            value: {
              attack: 20,
            },
          },
        },
      };
    }
    case "x-defense": {
      return {
        img: xDefense,
        hex: "#4E5399",
        rgba: "rgba(78, 83, 153, 0.35)",
        detail: {
          name: "X Defense",
          effect: "Increase your 20 defense pokemon",
          rarity: getRarity("rare"),
          required: {
            name: "Game is start",
            value: {
              defense: 20,
            },
          },
        },
      };
    }
  }
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
