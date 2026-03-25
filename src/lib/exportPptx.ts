import pptxgen from "pptxgenjs"

const BG = "060606"
const WHITE = "FFFFFF"
const ACCENT = "FF4D00"
const GRAY = "9CA3AF"
const DARK = "374151"
const SUBTLE = "1F1F1F"

interface Slide {
  num: number
  title: string
  badge?: string
  body?: string
  flowSteps?: string[]
  boxes?: { label: string; sub?: string; accent?: boolean }[]
  tableRows?: { role: string; can: boolean }[]
  bullets?: string[]
}

const slides: Slide[] = [
  {
    num: 1,
    title: "Судебные прения",
    badge: "ГПК РФ · Статья 190",
    body: "Стадия, где стороны подводят итоги спора и убеждают суд в правоте своей позиции.",
    boxes: [
      { label: "Анализ доказательств", sub: "оценка, сопоставление" },
      { label: "Правовые доводы", sub: "нормы закона, прецеденты" },
      { label: "Опровержение оппонента", sub: "контраргументы" },
      { label: "Финальная позиция", sub: "требования к суду", accent: true },
    ],
  },
  {
    num: 2,
    title: "Место в процессе",
    body: "Прения наступают строго после исследования всех доказательств.",
    flowSteps: [
      "Подготовка к делу",
      "Судебное заседание",
      "Исследование доказательств",
      "→ Судебные прения (ст. 190)",
      "Реплики",
      "Совещательная комната",
      "Решение суда",
    ],
  },
  {
    num: 3,
    title: "Значение прений",
    body: "Прения — инструмент состязательности. Стороны помогают суду правильно оценить дело.",
    boxes: [
      { label: "Познавательная", sub: "суд получает обобщённую картину" },
      { label: "Убеждающая", sub: "формирование позиции суда", accent: true },
      { label: "Контрольная", sub: "указание на пробелы" },
      { label: "Процессуальная", sub: "гарантия права на защиту" },
    ],
  },
  {
    num: 4,
    title: "Кто выступает",
    body: "Право на выступление — только у сторон и их представителей.",
    tableRows: [
      { role: "Истец / представитель истца", can: true },
      { role: "Ответчик / представитель ответчика", can: true },
      { role: "Третье лицо с самост. требованиями", can: true },
      { role: "Третье лицо без самост. требований", can: true },
      { role: "Свидетели", can: false },
      { role: "Эксперты, специалисты", can: false },
      { role: "Переводчики", can: false },
    ],
  },
  {
    num: 5,
    title: "Порядок выступлений",
    body: "Очерёдность закреплена в ст. 190 ГПК РФ и не может быть изменена.",
    flowSteps: [
      "1. Истец / его представитель",
      "2. Третье лицо (сторона истца)",
      "3. Ответчик / его представитель",
      "4. Третье лицо (сторона ответчика)",
      "5. Третье лицо с самост. требованиями",
    ],
  },
  {
    num: 6,
    title: "Реплики",
    body: "После основных речей — краткий ответ оппоненту. Последнее слово — за ответчиком.",
    boxes: [
      { label: "Очерёдность", sub: "та же, что у основных речей" },
      { label: "Последняя реплика", sub: "всегда за ответчиком", accent: true },
      { label: "Нельзя повторять", sub: "основную речь" },
      { label: "Суд вправе", sub: "ограничить число и время" },
    ],
  },
  {
    num: 7,
    title: "Ограничения",
    body: "В прениях запрещено выходить за рамки исследованных материалов дела.",
    bullets: [
      "Обстоятельства, не выяснявшиеся в заседании",
      "Доказательства, не исследованные судом",
      "Доказательства, признанные недопустимыми",
      "Доказательства, полученные с нарушением закона",
    ],
    boxes: [
      { label: "Новые обстоятельства?", sub: "→ ходатайство о возобновлении" },
      { label: "Новые доказательства?", sub: "→ возврат к исследованию" },
      { label: "Нарушение порядка", sub: "→ суд лишает слова" },
      { label: "Письменный текст", sub: "можно приобщить к делу", accent: true },
    ],
  },
  {
    num: 8,
    title: "Завершение",
    body: "После прений и реплик суд удаляется. Процесс может быть возобновлён.",
    flowSteps: [
      "Прения окончены",
      "Реплики окончены",
      "Суд → совещательная комната",
      "Возможно возобновление",
      "Дополнительное исследование",
      "→ Новые прения и реплики",
      "Решение суда",
    ],
  },
]

function addFlowDiagram(
  slide: pptxgen.Slide,
  steps: string[],
  x: number, y: number, w: number
) {
  const stepH = 0.38
  const arrowH = 0.18
  let cy = y

  steps.forEach((step, i) => {
    const isAccent = step.startsWith("→")
    slide.addShape("rect", {
      x, y: cy, w, h: stepH,
      fill: { color: isAccent ? "1A0A00" : SUBTLE },
      line: { color: isAccent ? ACCENT : "2A2A2A", width: 1 },
    })
    slide.addText(step, {
      x: x + 0.12, y: cy, w: w - 0.24, h: stepH,
      fontSize: 9,
      color: isAccent ? ACCENT : "D1D5DB",
      fontFace: "Arial",
      valign: "middle",
      bold: isAccent,
    })
    cy += stepH
    if (i < steps.length - 1) {
      slide.addShape("rect", {
        x: x + w / 2 - 0.01, y: cy, w: 0.02, h: arrowH,
        fill: { color: "444444" }, line: { color: "444444" },
      })
      cy += arrowH
    }
  })
}

function addBoxGrid(
  slide: pptxgen.Slide,
  boxes: NonNullable<Slide["boxes"]>,
  x: number, y: number, w: number
) {
  const colW = (w - 0.12) / 2
  const rowH = 0.9
  boxes.forEach((box, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const bx = x + col * (colW + 0.12)
    const by = y + row * (rowH + 0.12)
    slide.addShape("rect", {
      x: bx, y: by, w: colW, h: rowH,
      fill: { color: box.accent ? "1A0A00" : SUBTLE },
      line: { color: box.accent ? ACCENT : "2A2A2A", width: 1 },
    })
    slide.addText(box.label, {
      x: bx + 0.15, y: by + 0.1, w: colW - 0.3, h: 0.35,
      fontSize: 10, color: box.accent ? ACCENT : WHITE, fontFace: "Arial", bold: true,
    })
    if (box.sub) {
      slide.addText(box.sub, {
        x: bx + 0.15, y: by + 0.42, w: colW - 0.3, h: 0.36,
        fontSize: 8, color: GRAY, fontFace: "Arial",
      })
    }
  })
}

function addTable(
  slide: pptxgen.Slide,
  rows: NonNullable<Slide["tableRows"]>,
  x: number, y: number, w: number
) {
  const headerRow: pptxgen.TableRow = [
    {
      text: "Участник",
      options: { bold: true, color: "6B7280", fontSize: 8, fontFace: "Arial", fill: { color: "111111" } },
    },
    {
      text: "Право",
      options: { bold: true, color: "6B7280", fontSize: 8, fontFace: "Arial", fill: { color: "111111" }, align: "center" },
    },
  ]
  const dataRows: pptxgen.TableRow[] = rows.map((r, i) => [
    {
      text: r.role,
      options: { fontSize: 9, color: "D1D5DB", fontFace: "Arial", fill: { color: i % 2 === 0 ? "0D0D0D" : "080808" } },
    },
    {
      text: r.can ? "+" : "-",
      options: {
        fontSize: 11, bold: true, color: r.can ? ACCENT : DARK, fontFace: "Arial",
        align: "center", fill: { color: i % 2 === 0 ? "0D0D0D" : "080808" },
      },
    },
  ])
  slide.addTable([headerRow, ...dataRows], {
    x, y, w,
    colW: [w - 0.8, 0.8],
    rowH: 0.34,
    border: { type: "solid", color: "1F1F1F", pt: 0.5 },
  })
}

export function exportToPptx() {
  const prs = new pptxgen()
  prs.layout = "LAYOUT_WIDE"
  const W = 13.33
  const H = 7.5
  const SPLIT = 6.2
  const RIGHT_X = SPLIT + 0.35

  slides.forEach((s) => {
    const slide = prs.addSlide()
    slide.background = { color: BG }

    // Top accent bar
    slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.05, fill: { color: ACCENT }, line: { color: ACCENT } })

    // Left column subtle bg
    slide.addShape("rect", { x: 0, y: 0, w: SPLIT, h: H, fill: { color: "030303" }, line: { color: BG } })

    // Vertical divider
    slide.addShape("rect", { x: SPLIT, y: 0.05, w: 0.02, h: H - 0.1, fill: { color: "181818" }, line: { color: "181818" } })

    // Slide number
    slide.addText(`${s.num} / ${slides.length}`, {
      x: 0.5, y: H - 0.45, w: 1, h: 0.3,
      fontSize: 8, color: "4B5563", fontFace: "Arial",
    })

    // Badge
    if (s.badge) {
      slide.addShape("rect", {
        x: 0.5, y: 0.5, w: 2.6, h: 0.3,
        fill: { color: "111111" }, line: { color: "333333", width: 0.5 },
      })
      slide.addText(s.badge, {
        x: 0.5, y: 0.5, w: 2.6, h: 0.3,
        fontSize: 8, color: GRAY, fontFace: "Arial", align: "center", valign: "middle",
      })
    }

    // Title
    const titleY = s.badge ? 0.95 : 0.6
    slide.addText(s.title, {
      x: 0.5, y: titleY, w: SPLIT - 0.8, h: s.num === 1 ? 1.4 : 1.1,
      fontSize: s.num === 1 ? 48 : 38,
      bold: true, color: WHITE, fontFace: "Arial", charSpacing: -0.5,
    })

    // Body text
    if (s.body) {
      const bodyY = titleY + (s.num === 1 ? 1.45 : 1.15)
      slide.addText(s.body, {
        x: 0.5, y: bodyY, w: SPLIT - 0.8, h: 0.9,
        fontSize: 11, color: GRAY, fontFace: "Arial", wrap: true,
      })
    }

    // Bullets (slide 7 left side)
    if (s.bullets) {
      const bulletY = 3.2
      slide.addText("Запрещено:", {
        x: 0.5, y: bulletY - 0.3, w: SPLIT - 0.8, h: 0.25,
        fontSize: 8, color: "4B5563", fontFace: "Arial", bold: true, charSpacing: 1,
      })
      s.bullets.forEach((b, i) => {
        slide.addShape("ellipse", {
          x: 0.52, y: bulletY + i * 0.38 + 0.08, w: 0.1, h: 0.1,
          fill: { color: ACCENT }, line: { color: ACCENT },
        })
        slide.addText(b, {
          x: 0.74, y: bulletY + i * 0.38, w: SPLIT - 1.1, h: 0.32,
          fontSize: 10, color: "D1D5DB", fontFace: "Arial",
        })
      })
    }

    // RIGHT COLUMN
    const rightW = W - RIGHT_X - 0.3
    const rightY = 0.65

    slide.addText("СХЕМА", {
      x: RIGHT_X, y: rightY, w: rightW, h: 0.22,
      fontSize: 7, color: "3B3B3B", fontFace: "Arial", bold: true, charSpacing: 2,
    })

    if (s.flowSteps) {
      addFlowDiagram(slide, s.flowSteps, RIGHT_X, rightY + 0.28, rightW)
    } else if (s.boxes) {
      addBoxGrid(slide, s.boxes, RIGHT_X, rightY + 0.28, rightW)
    } else if (s.tableRows) {
      addTable(slide, s.tableRows, RIGHT_X, rightY + 0.28, rightW)
    }
  })

  prs.writeFile({ fileName: "sudebnie-preniya.pptx" })
}
