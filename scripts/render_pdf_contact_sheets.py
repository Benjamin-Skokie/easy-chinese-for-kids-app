#!/usr/bin/env python3

from __future__ import annotations

import argparse
import tempfile
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont


def render_pdf(pdf: Path, out_dir: Path, columns: int, thumb_width: int, pages_per_sheet: int) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf)
    rendered: list[tuple[int, Image.Image]] = []

    for page_index, page in enumerate(doc):
        zoom = thumb_width / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        rendered.append((page_index + 1, image))

    gutter = 18
    label_height = 30
    font = ImageFont.load_default()

    for sheet_index, start in enumerate(range(0, len(rendered), pages_per_sheet), 1):
        chunk = rendered[start : start + pages_per_sheet]
        rows = (len(chunk) + columns - 1) // columns
        max_height = max(image.height for _, image in chunk)
        sheet_width = columns * thumb_width + (columns + 1) * gutter
        sheet_height = rows * (max_height + label_height) + (rows + 1) * gutter
        sheet = Image.new("RGB", (sheet_width, sheet_height), "white")
        draw = ImageDraw.Draw(sheet)

        for offset, (page_number, image) in enumerate(chunk):
            row, column = divmod(offset, columns)
            x = gutter + column * (thumb_width + gutter)
            y = gutter + row * (max_height + label_height + gutter) + label_height
            sheet.paste(image, (x, y))
            draw.rectangle([x, y - label_height, x + 90, y - 4], fill="white")
            draw.text((x + 4, y - label_height + 7), f"Page {page_number}", fill="black", font=font)

        sheet_name = f"sheet-{sheet_index:02d}-pages-{chunk[0][0]:03d}-{chunk[-1][0]:03d}.png"
        sheet.save(out_dir / sheet_name)

    print(f"{pdf.name}: {len(doc)} pages -> {out_dir}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Render local book PDFs into review contact sheets.")
    parser.add_argument("--source", type=Path, default=Path("books_pdf"))
    parser.add_argument("--output", type=Path, default=Path(tempfile.gettempdir()) / "easy_chinese_book_sheets")
    parser.add_argument("--match", default="", help="Only render PDFs whose file name contains this string.")
    parser.add_argument("--columns", type=int, default=3)
    parser.add_argument("--thumb-width", type=int, default=420)
    parser.add_argument("--pages-per-sheet", type=int, default=6)
    args = parser.parse_args()

    pdfs = sorted(args.source.glob("*.pdf"))
    if args.match:
        pdfs = [pdf for pdf in pdfs if args.match in pdf.name]

    for pdf in pdfs:
        render_pdf(
            pdf=pdf,
            out_dir=args.output / pdf.stem,
            columns=args.columns,
            thumb_width=args.thumb_width,
            pages_per_sheet=args.pages_per_sheet,
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
