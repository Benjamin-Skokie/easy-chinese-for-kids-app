#!/usr/bin/env python3

from __future__ import annotations

import argparse
import os
import subprocess
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = Path(os.environ.get("EASY_CHINESE_PDF_SOURCE", PROJECT_ROOT / "resources"))
DEFAULT_OUTPUT = PROJECT_ROOT / "docs" / "ocr"
SWIFT_SCRIPT = Path(__file__).with_name("ocr_pdf.swift")


def main() -> int:
    parser = argparse.ArgumentParser(description="OCR the Easy Steps to Chinese for Kids PDFs into local text files.")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--scale", type=float, default=1.5)
    parser.add_argument("--start", type=int, default=0, help="0-based page index")
    parser.add_argument("--end", type=int, default=None, help="0-based page index")
    parser.add_argument("--match", type=str, default="", help="Only process PDFs whose names contain this string")
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(path for path in args.source.iterdir() if path.suffix.lower() == ".pdf")
    if args.match:
        pdfs = [path for path in pdfs if args.match in path.name]

    for pdf in pdfs:
        output_name = pdf.stem + ".txt"
        output_path = args.output / output_name
        cmd = [
            "swift",
            str(SWIFT_SCRIPT),
            "--pdf",
            str(pdf),
            "--out",
            str(output_path),
            "--scale",
            str(args.scale),
            "--start",
            str(args.start),
        ]
        if args.end is not None:
            cmd.extend(["--end", str(args.end)])

        print(f"OCR: {pdf.name} -> {output_path}")
        subprocess.run(cmd, check=True)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
