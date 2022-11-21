import pikachu from "@/dist/pikachu.png";
import pokeball from "@/dist/pokeball.png";
import tabBundle from "@/dist/tab-bundle.png";
import token from "@/dist/token.png";
const navigation = [
  {
    name: "Pokemons",
    href: "/pokemon",
    icon: pikachu,
    current: false,
    customSize: true,
  },
  {
    name: "Items",
    href: "/items",
    icon: pokeball,
    current: false,
  },
  {
    name: "Bundles",
    href: "/bundles",
    icon: tabBundle,
    current: false,
    customSize: true,
  },
  {
    name: "Tokens",
    href: "/token",
    icon: token,
    current: false,
    customSize: true,
  },
];

export { navigation };
