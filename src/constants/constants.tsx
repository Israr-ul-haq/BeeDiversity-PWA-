const token = "";

let appRoutes: { name: string; link: string }[] = [
  { link: "/home", name: "Homepage" },
  { link: "/beehives", name: "Beehouses" },
];
let constants: {
  token: string;
  appRoutes: { name: string; link: string }[];
};

constants = {
  token: token,
  appRoutes: appRoutes,
};

export default constants;
