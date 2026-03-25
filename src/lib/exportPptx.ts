import pptxgen from "pptxgenjs"

const BG = "060606"
const WHITE = "FFFFFF"
const ACCENT = "FF4D00"
const GRAY = "9CA3AF"
const DARK_GRAY = "6B7280"

const slides = [
  {
    title: "Судебные прения",
    subtitle: "Гражданский процесс · ГПК РФ ст. 190",
    body: "Самостоятельная стадия судебного разбирательства — устные выступления участников дела, в которых стороны подводят итоги спора и убеждают суд в правоте своей позиции.",
    items: [],
    itemsLabel: "",
  },
  {
    title: "1. Понятие и значение",
    subtitle: "",
    body: "Судебные прения — устные выступления участников дела и их представителей. Стороны анализируют доказательства, сопоставляют доводы оппонента и формулируют финальные аргументы.\n\nОсновная цель — помочь судье правильно оценить результаты разбирательства. Правовое регулирование закреплено в ст. 190 ГПК РФ.",
    itemsLabel: "Значение судебных прений:",
    items: [
      "Познавательное: суд получает обобщённую информацию о деле, структурированную сторонами",
      "Убеждающее: участники пытаются убедить суд в правильности своей позиции",
      "Контрольное: стороны указывают на ошибки или пробелы в исследовании доказательств",
      "Процессуальное: соблюдение процедуры гарантирует реализацию права на защиту",
    ],
  },
  {
    title: "2. Порядок и участники",
    subtitle: "",
    body: "Прения начинаются после завершения исследования доказательств. Выступать вправе: стороны (истец и ответчик), заявители, третьи лица и их представители. Эксперты, свидетели, переводчики — не могут.",
    itemsLabel: "Последовательность выступлений (ст. 190 ГПК РФ):",
    items: [
      "1. Истец или его представитель",
      "2. Третье лицо без самостоятельных требований на стороне истца",
      "3. Ответчик или его представитель",
      "4. Третье лицо без самостоятельных требований на стороне ответчика",
      "5. Третье лицо с самостоятельными требованиями и его представитель",
    ],
  },
  {
    title: "3. Реплики и ограничения",
    subtitle: "",
    body: "После основных речей участники вправе выступить с репликами — ответами на доводы оппонента. Право последней реплики всегда принадлежит ответчику или его представителю.",
    itemsLabel: "Ограничения в ходе прений:",
    items: [
      "Нельзя ссылаться на обстоятельства, не выяснявшиеся судом",
      "Нельзя упоминать доказательства, не исследованные в заседании",
      "Нельзя использовать доказательства, признанные недопустимыми",
      "Реплика не должна повторять основную речь",
      "Суд вправе ограничить число и продолжительность реплик",
    ],
  },
  {
    title: "4. Завершение прений",
    subtitle: "",
    body: "После прений и реплик суд удаляется в совещательную комнату для вынесения решения. Суд вправе возобновить рассмотрение дела — при новых обстоятельствах, противоречиях в показаниях свидетелей или сведениях о фальсификации.",
    itemsLabel: "Процедура возобновления:",
    items: [
      "Суд выносит определение о возобновлении рассмотрения",
      "Проводится дополнительное исследование доказательств",
      "Суд вновь переходит к прениям в том же порядке",
      "После новых прений суд повторно удаляется в совещательную комнату",
    ],
  },
]

function drawGrid(slide: pptxgen.Slide, w: number, h: number) {
  const step = 1.1
  const lineOpts: pptxgen.ShapeProps = {
    line: { color: "333333", width: 0.3 },
    fill: { color: "060606", transparency: 100 },
  }
  for (let x = 0; x < w; x += step) {
    slide.addShape("rect", { ...lineOpts, x, y: 0, w: 0.01, h })
  }
  for (let y = 0; y < h; y += step) {
    slide.addShape("rect", { ...lineOpts, x: 0, y, w, h: 0.01 })
  }
}

export function exportToPptx() {
  const prs = new pptxgen()
  prs.layout = "LAYOUT_WIDE"
  const W = 13.33
  const H = 7.5

  slides.forEach((s, idx) => {
    const slide = prs.addSlide()

    // Background
    slide.background = { color: BG }

    // Grid lines
    drawGrid(slide, W, H)

    // Accent top bar
    slide.addShape("rect", {
      x: 0, y: 0, w: W, h: 0.04,
      fill: { color: ACCENT },
      line: { color: ACCENT },
    })

    // Slide number dot
    slide.addShape("ellipse", {
      x: 0.45, y: H - 0.55, w: 0.18, h: 0.18,
      fill: { color: ACCENT },
      line: { color: ACCENT },
    })
    slide.addText(`${idx + 1} / ${slides.length}`, {
      x: 0.7, y: H - 0.62, w: 1.2, h: 0.28,
      fontSize: 9, color: DARK_GRAY, fontFace: "Arial",
    })

    let curY = 0.45

    // Subtitle / badge
    if (s.subtitle) {
      slide.addText(s.subtitle, {
        x: 0.6, y: curY, w: 8, h: 0.3,
        fontSize: 9, color: GRAY, fontFace: "Arial",
        bold: false,
      })
      curY += 0.38
    }

    // Title
    slide.addText(s.title, {
      x: 0.6, y: curY, w: 11, h: idx === 0 ? 1.8 : 0.9,
      fontSize: idx === 0 ? 52 : 36,
      bold: true, color: WHITE, fontFace: "Arial",
      charSpacing: -1,
    })
    curY += idx === 0 ? 1.85 : 0.95

    // Body
    if (s.body) {
      const bodyLines = s.body.split("\n\n")
      for (const line of bodyLines) {
        const lineH = 0.42
        slide.addText(line, {
          x: 0.6, y: curY, w: 9.5, h: lineH,
          fontSize: 12, color: GRAY, fontFace: "Arial",
          wrap: true,
        })
        curY += lineH + 0.06
      }
      curY += 0.1
    }

    // Items label
    if (s.itemsLabel) {
      slide.addText(s.itemsLabel.toUpperCase(), {
        x: 0.6, y: curY, w: 9, h: 0.26,
        fontSize: 8, color: "4B5563", fontFace: "Arial",
        bold: true, charSpacing: 1.5,
      })
      curY += 0.3
    }

    // Items
    if (s.items.length > 0) {
      const rows: pptxgen.TableRow[] = s.items.map((item) => [
        {
          text: "●",
          options: { color: ACCENT, fontSize: 8, fontFace: "Arial", bold: true, valign: "top" },
        },
        {
          text: item,
          options: { color: "D1D5DB", fontSize: 11, fontFace: "Arial", valign: "top" },
        },
      ])

      slide.addTable(rows, {
        x: 0.6, y: curY, w: 9.5,
        colW: [0.22, 9.28],
        rowH: 0.3,
        border: { type: "none" },
        fill: { color: BG },
      })
    }
  })

  prs.writeFile({ fileName: "sudebnie-preniya.pptx" })
}
