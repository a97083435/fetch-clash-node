const { rf, zore, wf, readme, wreadme } = require("./utils");

function update_read_me() {
  let read = readme();
  let update_readme = read.replace(
    /<time>(.*)<\/time>/,
    `<time>${[y, m, day].join("/")} ${[
      zore(d.getHours()),
      zore(d.getMinutes()),
      zore(d.getSeconds()),
    ].join(": ")}</time>`
  );
  wreadme(update_readme);
}

let nodes = [
  {
    name: "NodeFree",
    hostUrl: "https://nodefree.org/dy/",
  },
  {
    name: "ClashNode",
    hostUrl: "https://clashnode.com/wp-content/uploads/",
  },
  {
    name: "NodeBird",
    hostUrl: "https://nodebird.net/wp-content/uploads/",
  },
];

let d = new Date();
let y = zore(d.getFullYear());
let m = zore(d.getMonth() + 1);
let day = zore(d.getDate());
let timeStr = [y, m, `${y}${m}${day}.yaml`].join("/");
(async () => {
  try {
    for (let node of nodes) {
      let res = await fetch(node.hostUrl + timeStr).then((res) => {
        console.log(`${node.hostUrl + timeStr}`, "status is", res.status);
        if (res.status == 200) {
          return res.text();
        } else {
          return "";
        }
      });
      if (res && !(res == rf(`${node.name}.yaml`))) {
        console.log(`[ ${node.hostUrl + timeStr} ] is ok`);
        wf(`${node.name}.yaml`, res);
        update_read_me();
      }
    }
  } catch (error) {
    console.log("error :" + error);
  }
})();
