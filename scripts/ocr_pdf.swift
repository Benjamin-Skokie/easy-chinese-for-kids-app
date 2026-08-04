import Foundation
import PDFKit
import Vision
import AppKit

struct OCRConfig {
    let pdfPath: String
    let outputPath: String
    let scale: CGFloat
    let startPage: Int
    let endPage: Int?
}

func parseArgs() -> OCRConfig {
    var pdfPath: String?
    var outputPath: String?
    var scale: CGFloat = 1.5
    var startPage = 0
    var endPage: Int?

    var i = 1
    while i < CommandLine.arguments.count {
        let arg = CommandLine.arguments[i]
        switch arg {
        case "--pdf":
            i += 1
            pdfPath = CommandLine.arguments[i]
        case "--out":
            i += 1
            outputPath = CommandLine.arguments[i]
        case "--scale":
            i += 1
            scale = CGFloat(Double(CommandLine.arguments[i]) ?? 1.5)
        case "--start":
            i += 1
            startPage = Int(CommandLine.arguments[i]) ?? 0
        case "--end":
            i += 1
            endPage = Int(CommandLine.arguments[i])
        default:
            break
        }
        i += 1
    }

    guard let pdfPath, let outputPath else {
        fputs("usage: swift ocr_pdf.swift --pdf <path> --out <path> [--scale 1.5] [--start 0] [--end N]\n", stderr)
        exit(2)
    }

    return OCRConfig(
        pdfPath: pdfPath,
        outputPath: outputPath,
        scale: scale,
        startPage: startPage,
        endPage: endPage
    )
}

func renderPage(_ page: PDFPage, scale: CGFloat) throws -> CGImage {
    let pageRect = page.bounds(for: .mediaBox)
    let size = NSSize(width: pageRect.width * scale, height: pageRect.height * scale)
    let image = NSImage(size: size)

    image.lockFocus()
    NSColor.white.set()
    NSRect(origin: .zero, size: size).fill()

    guard let context = NSGraphicsContext.current?.cgContext else {
        image.unlockFocus()
        throw NSError(domain: "ocr", code: 2, userInfo: [NSLocalizedDescriptionKey: "No graphics context"])
    }

    context.saveGState()
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    image.unlockFocus()

    guard
        let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let cgImage = bitmap.cgImage
    else {
        throw NSError(domain: "ocr", code: 3, userInfo: [NSLocalizedDescriptionKey: "Image conversion failed"])
    }

    return cgImage
}

func recognizeText(from cgImage: CGImage) throws -> [String] {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en-US", "zh-Hans"]
    request.usesLanguageCorrection = true

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    try handler.perform([request])

    return (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
}

let config = parseArgs()
let pdfURL = URL(fileURLWithPath: config.pdfPath)
guard let document = PDFDocument(url: pdfURL) else {
    fputs("Failed to load PDF at \(config.pdfPath)\n", stderr)
    exit(1)
}

let finalPage = min(config.endPage ?? (document.pageCount - 1), document.pageCount - 1)
var output = ""

for pageIndex in config.startPage...finalPage {
    guard let page = document.page(at: pageIndex) else { continue }
    let cgImage = try renderPage(page, scale: config.scale)
    let lines = try recognizeText(from: cgImage)
    output += "===== PAGE \(pageIndex + 1) =====\n"
    output += lines.joined(separator: "\n")
    output += "\n\n"
}

try output.write(toFile: config.outputPath, atomically: true, encoding: .utf8)
print("Wrote OCR to \(config.outputPath)")
