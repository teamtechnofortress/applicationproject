// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "Zain Ali",
      email: "zainalix9@gmail.com",
      phone: "98798798"
    },
    {
      name: "Zohaib",
      email: "zohaib@gmail.com",
      phone: "656576575"
    },
    {
      name: "Zainab",
      email: "zainab@gmail.com",
      phone: "349837643"
    },
    {
      name: "Maham",
      email: "maham@gmail.com",
      phone: "213244"
    },
  ]);
}
