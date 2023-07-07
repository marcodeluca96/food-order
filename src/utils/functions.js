export const isTimeInRange = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 12 || (hours === 12 && minutes <= 40)) {
    return true;
  }

  return false;
};

export function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return [...array];
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function orderSummary(orders) {
  /*
  {
   panini:{ totale: 4,
    extra: [{
      title:'asjbd',
      qta: '2x'
    }],
  },
  padine:{...},
  ...,

  summary:[
    {
      user:'asdas',
      food:'panino con sdjklna'
    }
  ]
  }
  */
  const summary = {
    panini: {
      totale: 0,
      extra: [],
    },
    piadine: {
      totale: 0,
      extra: [],
    },
    yogurt: {
      totale: 0,
      extra: [],
    },
    altro: {
      totale: 0,
      extra: [],
    },
    orders: [],
  };

  orders.forEach((o) => {
    const userOrder = o.data.order;
    const userOrderTitles = [];
    userOrder.forEach((uo) => {
      userOrderTitles.push(uo.qty + 'x - ' + uo.title);
      if (uo.category === 'panini') {
        let isPresent = false;
        summary.panini.extra = summary.panini.extra.map((it) => {
          if (it.title === uo.title) {
            isPresent = true;
            return { title: it.title, qty: it.qty + uo.qty };
          }
          return it;
        });
        if (!isPresent) {
          summary.panini.extra.push({ title: uo.title, qty: uo.qty });
        }

        let newTotPanini = 0;
        summary.panini.extra.forEach((it) => {
          newTotPanini += it.qty;
        });

        summary.panini.totale = newTotPanini;
      }
      if (uo.category === 'piadine') {
        let isPresent = false;
        summary.piadine.extra = summary.piadine.extra.map((it) => {
          if (it.title === uo.title) {
            isPresent = true;
            return { title: it.title, qty: it.qty + uo.qty };
          }
          return it;
        });
        if (!isPresent) {
          summary.piadine.extra.push({ title: uo.title, qty: uo.qty });
        }

        let newTotPiadine = 0;
        summary.piadine.extra.forEach((it) => {
          newTotPiadine += it.qty;
        });

        summary.piadine.totale = newTotPiadine;
      }
      if (uo.category === 'yogurt') {
        let isPresent = false;
        summary.yogurt.extra = summary.yogurt.extra.map((it) => {
          if (it.title === uo.title) {
            isPresent = true;
            return { title: it.title, qty: it.qty + uo.qty };
          }
          return it;
        });
        if (!isPresent) {
          summary.yogurt.extra.push({ title: uo.title, qty: uo.qty });
        }

        let newTotYogurt = 0;
        summary.yogurt.extra.forEach((it) => {
          newTotYogurt += it.qty;
        });

        summary.yogurt.totale = newTotYogurt;
      }
      if (uo.category === 'altro') {
        let isPresent = false;
        summary.altro.extra = summary.altro.extra.map((it) => {
          if (it.title === uo.title) {
            isPresent = true;
            return { title: it.title, qty: it.qty + uo.qty };
          }
          return it;
        });
        if (!isPresent) {
          summary.altro.extra.push({ title: uo.title, qty: uo.qty });
        }

        let newTotAltro = 0;
        summary.altro.extra.forEach((it) => {
          newTotAltro += it.qty;
        });

        summary.altro.totale = newTotAltro;
      }
    });
    //ordini di chi sono
    summary.orders.push({ user: o.data.username, food: userOrderTitles });
  });

  return summary;
}
