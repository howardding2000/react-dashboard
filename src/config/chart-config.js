export const salesData = [
  {
    name: "Oct",
    books: 4000,
    games: 2400,
    laptops: 1400,
  },
  {
    name: "Nov",
    books: 3000,
    games: 1398,
    laptops: 1210,
  },
  {
    name: "Dec",
    books: 5600,
    games: 9800,
    laptops: 2090,
  },
  {
    name: "Jan",
    books: 2780,
    games: 3908,
    laptops: 1000,
  },
  {
    name: "Feb",
    books: 1890,
    games: 4800,
    laptops: 1181,
  },
  {
    name: "Mar",
    books: 2390,
    games: 3800,
    laptops: 1500,
  },
  {
    name: "Apr",
    books: 3490,
    games: 4300,
    laptops: 1100,
  },
];

export const salesVolumeData = salesData.map((item) => ({
  name: item.name,
  books: Math.floor(item.books * (120 - Math.random() * 40)),
  games: Math.floor(item.games * (120 - Math.random() * 40)),
  laptops: Math.floor(item.laptops * (120 - Math.random() * 40) * 8),
}));

const getItemTotal = (data) => {
  return data.reduce(
    (pre, item) => [
      { name: "Books", value: pre[0].value + item.books },
      { name: "Games", value: pre[1].value + item.games },
      { name: "Laptops", value: pre[2].value + item.laptops },
    ],
    [
      { name: "Books", value: 0 },
      { name: "Games", value: 0 },
      { name: "Laptops", value: 0 },
    ]
  );
};

export const salesTotal = getItemTotal(salesData);

export const salesVolumeTotal = getItemTotal(salesVolumeData);

export const CHART_COLORS = ["#8884d8", "#82ca9d", "#FCAD7E"];
