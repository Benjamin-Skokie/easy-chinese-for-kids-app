import { loadStrokeCharacter } from "../../data/stroke-data-loader.js";
import { strokePracticeMap } from "../../data/stroke-practice-map.js";

const basicStrokes = [
  { id: "heng", zh: "横", pinyin: "héng", en: "horizontal", direction: "left to right", path: "M 121 393 L 193 372 L 417 402 L 827 434 L 920 401", outline: "M 518 382 Q 572 385 623 389 Q 758 399 900 383 Q 928 379 935 390 Q 944 405 930 419 Q 896 452 845 475 Q 829 482 798 473 Q 723 460 480 434 Q 180 409 137 408 Q 130 408 124 408 Q 108 408 106 395 Q 105 380 127 363 Q 146 348 183 334 Q 195 330 216 338 Q 232 344 306 354 Q 400 373 518 382 Z" },
  { id: "shu", zh: "竖", pinyin: "shù", en: "vertical", direction: "top to bottom", path: "M 444 797 L 473 775 L 497 744 L 496 379 L 490 192 L 480 83 L 482 -9", outline: "M 445 104 Q 435 62 462 -1 Q 469 -20 477 -23 Q 484 -30 491 -21 Q 500 -17 510 5 Q 520 32 519 64 Q 518 113 519 571 Q 519 665 536 730 Q 546 746 542 760 Q 535 770 477 805 Q 452 821 431 806 Q 425 800 432 784 Q 465 738 466 681 Q 482 245 445 104 Z" },
  { id: "pie", zh: "撇", pinyin: "piě", en: "left-falling", direction: "top right to bottom left", path: "M 483 736 L 508 702 L 511 678 L 473 552 L 408 416 L 328 303 L 271 244 L 144 139 L 72 95", outline: "M 475 485 Q 547 653 563 683 Q 573 695 565 708 Q 558 721 519 742 Q 491 757 480 754 Q 462 750 465 730 Q 484 537 292 308 Q 280 296 269 284 Q 212 217 68 102 Q 58 92 66 89 Q 76 86 90 92 Q 190 138 274 210 Q 380 294 462 456 L 475 485 Z" },
  { id: "na", zh: "捺", en: "right-falling", direction: "top left to bottom right", path: "M 474 477 L 477 459 L 490 439 L 571 333 L 691 200 L 753 145 L 798 119 L 986 90", outline: "M 462 456 Q 480 423 575 292 Q 666 171 733 101 Q 764 67 793 69 Q 881 75 958 79 Q 991 80 992 89 Q 993 98 956 112 Q 772 178 740 205 Q 617 304 490 466 Q 481 476 475 485 C 457 509 447 482 462 456 Z" },
  { id: "zhe", zh: "折", en: "turn", direction: "across, then down", path: "M 304 560 L 359 556 L 525 583 L 628 609 L 660 605 L 699 574 L 666 457 L 660 443 L 635 424", outline: "M 681 421 Q 708 524 748 557 Q 766 576 750 596 Q 674 654 614 629 Q 572 616 534 604 L 483 593 Q 398 578 312 571 Q 294 570 295 560 Q 298 550 318 544 Q 345 531 383 542 Q 431 551 482 559 L 534 568 Q 570 575 607 582 Q 635 588 646 576 Q 658 566 655 543 Q 645 474 629 418 C 621 389 673 392 681 421 Z" },
  { id: "gou", zh: "钩", en: "hook", direction: "down, then lift left", path: "M 478 644 L 518 610 L 518 101 L 495 55 L 450 68 L 369 110", outline: "M 435 100 Q 407 107 373 116 Q 360 120 361 112 Q 361 103 373 94 Q 445 39 491 -5 Q 503 -15 518 2 Q 560 60 553 141 Q 541 447 548 561 Q 548 579 550 596 Q 556 624 549 635 Q 545 642 531 651 C 509 671 457 671 470 644 Q 485 629 485 573 Q 488 443 488 148 Q 487 112 477 99 Q 464 92 435 100 Z" },
  { id: "dian", zh: "点", en: "dot", direction: "top left to bottom right", path: "M 391 701 L 542 554 L 571 512 L 586 460", outline: "M 387 680 Q 463 595 550 475 Q 566 450 582 443 Q 592 440 601 451 Q 617 464 609 515 Q 600 587 393 715 Q 383 722 379 708 Q 376 693 387 680 Z" },
  { id: "ti", zh: "提", en: "rising", direction: "bottom left to top right", path: "M 57 240 L 108 230 L 434 425", outline: "M 362 366 Q 432 412 440 420 Q 447 433 436 433 Q 421 433 362 399 L 313 375 Q 213 327 126 281 Q 87 262 63 257 Q 50 251 46 243 Q 45 233 59 218 Q 78 200 102 190 Q 117 186 133 200 Q 199 258 312 332 L 362 366 Z" }
];

const basicStrokePinyin = { na: "nà", zhe: "zhé", gou: "gōu", dian: "diǎn", ti: "tí" };
basicStrokes.forEach((stroke) => { stroke.pinyin ??= basicStrokePinyin[stroke.id]; });

const tianOrder = ["竖", "横折", "横", "竖", "横", "横"];

// Simplified 书 stroke outlines from Hanzi Writer Data / Make Me a Hanzi
// (Arphic Public License). Keep the source paths intact rather than redrawing
// them approximately; the coordinate system is flipped at render time.
const bookStrokePaths = [
  { name: "横折", path: "M 681 421 Q 708 524 748 557 Q 766 576 750 596 Q 674 654 614 629 Q 572 616 534 604 L 483 593 Q 398 578 312 571 Q 294 570 295 560 Q 298 550 318 544 Q 345 531 383 542 Q 431 551 482 559 L 534 568 Q 570 575 607 582 Q 635 588 646 576 Q 658 566 655 543 Q 645 474 629 418 C 621 389 673 392 681 421 Z", median: "M 304 560 L 359 556 L 525 583 L 628 609 L 660 605 L 699 574 L 666 457 L 660 443 L 635 424" },
  { name: "横折钩", path: "M 531 375 Q 769 399 794 379 Q 801 372 800 357 Q 760 191 741 170 Q 731 154 714 161 Q 683 167 649 174 Q 619 178 640 158 Q 701 103 726 65 Q 733 49 749 56 Q 779 72 807 151 Q 853 319 877 339 Q 896 361 889 370 Q 882 386 826 427 Q 807 445 788 439 Q 754 429 694 423 Q 687 423 681 421 L 629 418 Q 577 415 531 410 L 478 405 Q 375 398 323 385 Q 245 372 188 368 Q 161 367 156 355 Q 153 348 173 335 Q 210 310 246 322 Q 319 346 453 367 Q 463 368 477 369 L 531 375 Z", median: "M 165 353 L 233 345 L 431 384 L 705 407 L 789 411 L 818 398 L 841 362 L 789 196 L 760 135 L 739 118 L 641 168" },
  { name: "竖", path: "M 472 -11 Q 478 -39 485 -49 Q 491 -56 499 -54 Q 514 -45 523 20 Q 535 123 532 224 Q 529 267 531 375 L 531 410 Q 531 480 534 568 L 534 604 Q 534 671 551 757 Q 555 776 539 787 Q 505 811 487 814 Q 474 820 456 810 Q 446 801 454 789 Q 484 741 484 647 Q 483 622 483 593 L 482 559 Q 481 489 478 405 L 477 369 Q 464 71 472 -11 Z", median: "M 465 799 L 499 773 L 511 756 L 512 738 L 495 -44" },
  { name: "点", path: "M 739 695 Q 764 670 790 642 Q 802 629 817 628 Q 827 628 833 641 Q 837 654 831 684 Q 825 711 737 741 Q 722 745 716 743 Q 712 739 712 727 Q 715 717 739 695 Z", median: "M 721 737 L 797 680 L 816 646" }
];

const advancedStrokes = [
  { id: "wan-gou", zh: "弯钩", pinyin: "wān gōu", en: "curved hook", direction: "curve down, then hook", word: "字", target: 4 },
  { id: "pie-zhe", zh: "撇折", pinyin: "piě zhé", en: "left-falling turn", direction: "fall left, then turn", word: "么", target: 1 },
  { id: "pie-dian", zh: "撇点", pinyin: "piě diǎn", en: "left-falling dot", direction: "fall left, then turn to a dot", word: "姐", target: 0 },
  { id: "heng-pie", zh: "横撇", pinyin: "héng piě", en: "horizontal left-falling", direction: "across, then fall left", word: "名", target: 1 },
  { id: "wo-gou", zh: "卧钩", pinyin: "wò gōu", en: "lying hook", direction: "curve across, then hook", word: "您", target: 8 },
  { id: "shu-ti", zh: "竖提", pinyin: "shù tí", en: "vertical rising", direction: "down, then lift right", word: "眼", target: 8 },
  { id: "heng-gou", zh: "横钩", pinyin: "héng gōu", en: "horizontal hook", direction: "across, then hook", word: "你", target: 3 },
  { id: "heng-zhe-zhe-pie", zh: "横折折撇", pinyin: "héng zhé zhé piě", en: "double turn left-falling", direction: "across, turn twice, then fall left", word: "级", target: 4 },
  { id: "shu-wan", zh: "竖弯", pinyin: "shù wān", en: "vertical curve", direction: "down, then curve across", word: "四", target: 3 },
  { id: "heng-zhe-wan-gou", zh: "横折弯钩", pinyin: "héng zhé wān gōu", en: "horizontal turn curve hook", direction: "across, turn, curve, then hook", word: "九", target: 1 },
  { id: "shu-wan-gou", zh: "竖弯钩", pinyin: "shù wān gōu", en: "vertical curve hook", direction: "down, curve, then hook", word: "七", target: 1 },
  { id: "heng-zhe-gou", zh: "横折钩", pinyin: "héng zhé gōu", en: "horizontal turn hook", direction: "across, down, then hook left", word: "有", target: 3 }
];

async function prepareAdvancedStroke(stroke) {
  if (stroke.path) return stroke;
  const data = await loadStrokeCharacter(stroke.word);
  if (!data.paths[stroke.target] || !data.medians[stroke.target]) throw new Error(`Missing ${stroke.zh} data`);
  Object.assign(stroke, {
    path: data.medians[stroke.target],
    outline: data.paths[stroke.target],
    characterExample: { word: stroke.word, target: stroke.target, paths: data.paths }
  });
  return stroke;
}

const mappedPracticeRounds = new Map();
async function prepareMappedPracticeRound(entry) {
  if (mappedPracticeRounds.has(entry.word)) return mappedPracticeRounds.get(entry.word);
  const data = await loadStrokeCharacter(entry.word);
  const round = {
    id: `csl-${entry.word}`,
    word: entry.word,
    meaning: entry.meaning,
    practiceStrokeIds: entry.strokeIds,
    strokes: data.paths.map((path, index) => ({ id: String(index + 1), name: `Stroke ${index + 1}`, path, median: data.medians[index] }))
  };
  mappedPracticeRounds.set(entry.word, round);
  return round;
}

// These are a teaching sequence, rather than a claim that every reference book
// divides strokes into exactly the same number of named forms.
const compoundStrokes = [
  ["横钩", "买", "a horizontal line that finishes with a hook"],
  ["横撇", "又", "across, then a left-falling turn"],
  ["横撇弯钩", "队", "a turn with a curve and hook"],
  ["横折弯钩", "九", "turn, curve, then hook"],
  ["横折折撇", "及", "two turns, then a left-falling finish"],
  ["横折折折钩", "奶", "three turns, then a hook"],
  ["竖钩", "小", "vertical line ending in a hook"],
  ["竖弯", "四", "vertical line that curves across"],
  ["竖弯钩", "儿", "vertical curve ending in a hook"],
  ["撇点", "女", "left-falling stroke followed by a dot"],
  ["撇折", "云", "left-falling stroke that turns"],
  ["撇折点", "妈", "turning stroke followed by a dot"],
  ["斜钩", "我", "slanting line with a hook"],
  ["弯钩", "手", "curved line with a hook"],
  ["卧钩", "心", "lying curve with a hook"],
  ["横斜钩", "风", "across, slant, then hook"],
  ["竖提", "衣", "vertical line that lifts at the end"],
  ["横折提", "说", "turn, then lift" ]
];

const basicCharacterExamples = {
  zhe: { word: "书", target: 0, paths: bookStrokePaths.map((stroke) => stroke.path) },
  gou: { word: "丁", target: 1, paths: [basicStrokes.find((stroke) => stroke.id === "heng").outline, basicStrokes.find((stroke) => stroke.id === "gou").outline] },
  heng: { word: "二", source: "CSL 1A · Numbers", target: 0, paths: ["M 308 603 Q 260 597 293 574 Q 339 544 436 558 Q 551 576 673 596 Q 731 608 741 615 Q 753 625 747 636 Q 738 652 702 663 Q 669 672 559 641 Q 424 610 308 603 Z", "M 517 212 Q 569 213 620 219 Q 756 229 896 214 Q 921 210 929 220 Q 938 235 924 248 Q 891 279 842 302 Q 826 309 797 301 Q 728 286 481 261 Q 172 236 155 234 Q 142 234 128 234 Q 113 234 111 221 Q 110 208 131 191 Q 150 176 185 163 Q 197 159 217 167 Q 233 173 306 183 Q 400 202 517 212 Z"] },
  shu: { word: "中", source: "CSL 3A · Nationality", target: 3, paths: ["M 254 596 Q 244 603 202 608 Q 189 611 185 605 Q 178 598 189 580 Q 228 507 254 384 Q 260 347 282 324 Q 303 300 307 318 Q 310 328 310 343 L 306 381 Q 305 390 303 399 Q 276 513 267 556 C 261 585 259 594 254 596 Z", "M 752 425 Q 765 462 777 498 Q 793 546 828 578 Q 853 603 821 624 Q 793 648 762 666 Q 743 679 717 668 Q 677 655 615 646 Q 575 642 535 636 L 476 628 Q 427 622 380 613 Q 307 603 254 596 C 224 592 237 551 267 556 Q 274 556 286 559 Q 400 587 476 593 L 534 600 Q 604 609 698 615 Q 717 616 724 607 Q 739 583 693 435 C 684 406 742 397 752 425 Z", "M 530 370 Q 630 380 764 386 Q 776 387 778 397 Q 779 406 752 425 C 730 441 723 440 693 435 Q 606 420 530 407 L 475 399 Q 385 389 306 381 C 276 378 280 341 310 343 Q 314 343 321 343 Q 382 356 475 365 L 530 370 Z", "M 475 365 Q 472 17 485 -11 Q 486 -12 488 -16 Q 503 -32 512 -10 Q 530 32 530 370 L 530 407 Q 531 519 534 600 L 535 636 Q 538 742 559 778 Q 566 794 545 811 Q 520 830 475 843 Q 454 847 441 833 Q 431 826 444 812 Q 472 787 475 753 Q 475 704 476 628 L 476 593 Q 476 517 476 419 Q 475 409 475 399 L 475 365 Z"] },
  pie: { word: "人", source: "CSL 3A · My Family", target: 0, paths: ["M 475 485 Q 547 653 563 683 Q 573 695 565 708 Q 558 721 519 742 Q 491 757 480 754 Q 462 750 465 730 Q 484 537 292 308 Q 280 296 269 284 Q 212 217 68 102 Q 58 92 66 89 Q 76 86 90 92 Q 190 138 274 210 Q 380 294 462 456 L 475 485 Z", "M 462 456 Q 480 423 575 292 Q 666 171 733 101 Q 764 67 793 69 Q 881 75 958 79 Q 991 80 992 89 Q 993 98 956 112 Q 772 178 740 205 Q 617 304 490 466 Q 481 476 475 485 C 457 509 447 482 462 456 Z"] },
  na: { word: "人", source: "CSL 3A · My Family", target: 1, paths: ["M 475 485 Q 547 653 563 683 Q 573 695 565 708 Q 558 721 519 742 Q 491 757 480 754 Q 462 750 465 730 Q 484 537 292 308 Q 280 296 269 284 Q 212 217 68 102 Q 58 92 66 89 Q 76 86 90 92 Q 190 138 274 210 Q 380 294 462 456 L 475 485 Z", "M 462 456 Q 480 423 575 292 Q 666 171 733 101 Q 764 67 793 69 Q 881 75 958 79 Q 991 80 992 89 Q 993 98 956 112 Q 772 178 740 205 Q 617 304 490 466 Q 481 476 475 485 C 457 509 447 482 462 456 Z"] },
  dian: { word: "小", source: "CSL 2B · Big or Small?", target: 2, paths: ["M 499 695 Q 503 661 501 132 Q 500 110 488 101 Q 478 92 448 100 Q 414 107 383 113 Q 347 123 351 112 Q 352 105 375 91 Q 456 42 479 10 Q 504 -26 523 -25 Q 538 -26 552 11 Q 568 57 564 133 Q 531 583 572 723 Q 590 754 532 778 Q 498 797 477 789 Q 459 782 475 759 Q 497 731 499 695 Z", "M 266 475 Q 223 408 170 349 Q 160 339 155 320 Q 148 292 154 273 Q 158 251 185 261 Q 213 274 237 308 Q 273 357 284 404 Q 297 441 293 470 Q 289 480 283 484 Q 273 484 266 475 Z", "M 706 472 Q 769 411 842 323 Q 860 299 878 293 Q 888 292 897 303 Q 913 318 900 370 Q 887 431 709 508 Q 699 515 696 500 Q 695 484 706 472 Z"] },
  ti: { word: "打", source: "CSL · 打招呼", target: 2, paths: ["M 364 532 Q 458 562 460 563 Q 469 572 464 580 Q 455 592 426 598 Q 395 602 366 589 L 316 570 Q 226 543 148 531 Q 111 522 138 507 Q 183 483 239 501 Q 276 511 315 520 L 364 532 Z", "M 312 332 Q 311 247 310 141 Q 309 117 297 109 Q 291 105 237 108 Q 204 118 207 109 Q 208 102 229 87 Q 284 42 297 16 Q 313 -14 327 -15 Q 342 -16 356 19 Q 372 65 371 138 Q 364 252 362 366 L 362 399 Q 361 466 364 532 L 366 589 Q 366 688 386 757 Q 404 787 348 809 Q 314 828 295 821 Q 277 815 293 792 Q 315 764 316 731 Q 317 713 316 570 L 315 520 Q 314 459 313 375 L 312 332 Z", "M 362 366 Q 432 412 440 420 Q 447 433 436 433 Q 421 433 362 399 L 313 375 Q 213 327 126 281 Q 87 262 63 257 Q 50 251 46 243 Q 45 233 59 218 Q 78 200 102 190 Q 117 186 133 200 Q 199 258 312 332 L 362 366 Z", "M 709 517 Q 802 532 906 532 Q 925 533 929 542 Q 933 554 917 566 Q 860 605 805 584 Q 687 557 487 518 Q 466 515 483 499 Q 496 486 514 482 Q 535 478 550 484 Q 599 500 656 509 L 709 517 Z", "M 625 58 Q 598 65 565 72 Q 552 76 553 68 Q 554 59 565 50 Q 637 -2 684 -46 Q 697 -55 711 -38 Q 751 19 745 101 Q 730 302 738 456 Q 744 484 738 495 Q 731 505 709 517 C 684 533 647 538 656 509 Q 671 461 673 438 Q 673 435 673 432 Q 688 87 668 58 Q 656 49 625 58 Z"] }
};

// The practice characters below appear in the Book 1A basic-stroke review.
// Each piece is a real single-stroke outline, not a font glyph cropped apart.
const basicPracticeRounds = [
  {
    id: "one", word: "一", meaning: "one", practiceStrokeIds: ["heng"],
    strokes: [{ id: "1", name: "横", path: basicStrokes.find((stroke) => stroke.id === "heng").outline, median: basicStrokes.find((stroke) => stroke.id === "heng").path }]
  },
  {
    id: "three", word: "三", meaning: "three", practiceStrokeIds: ["heng"],
    strokes: [
      { id: "1", name: "横", path: "M 326 667 Q 283 663 312 640 Q 369 610 428 623 Q 543 641 665 661 Q 720 671 729 678 Q 739 688 735 698 Q 728 711 693 722 Q 660 731 561 701 Q 420 673 326 667 Z", median: "M 316 655 L 367 645 L 416 648 L 660 692 L 722 692" },
      { id: "2", name: "横", path: "M 329 421 Q 304 417 332 392 Q 348 379 385 383 Q 557 405 685 416 Q 721 420 709 440 Q 694 462 657 472 Q 621 479 558 466 Q 435 441 329 421 Z", median: "M 331 407 L 375 405 L 628 443 L 657 443 L 700 432" },
      { id: "3", name: "横", path: "M 130 165 Q 102 162 122 139 Q 140 120 163 113 Q 191 104 212 110 Q 515 179 929 157 Q 930 158 933 157 Q 960 156 967 167 Q 974 183 953 201 Q 884 255 835 246 Q 643 210 130 165 Z", median: "M 127 152 L 158 142 L 195 139 L 500 178 L 846 204 L 881 200 L 955 174" }
    ]
  },
  {
    id: "person", word: "人", meaning: "person", practiceStrokeIds: ["pie", "na"],
    strokes: [
      { id: "1", name: "撇", path: basicStrokes.find((stroke) => stroke.id === "pie").outline, median: basicStrokes.find((stroke) => stroke.id === "pie").path },
      { id: "2", name: "捺", path: basicStrokes.find((stroke) => stroke.id === "na").outline, median: basicStrokes.find((stroke) => stroke.id === "na").path }
    ]
  },
  {
    id: "ding", word: "丁", meaning: "fourth", practiceStrokeIds: ["heng", "gou"],
    strokes: [
      { id: "1", name: "横", path: "M 531 651 Q 736 675 868 663 Q 893 662 899 670 Q 906 683 894 696 Q 863 724 817 744 Q 801 750 775 740 Q 712 725 483 694 Q 185 660 168 657 Q 162 658 156 657 Q 141 657 141 645 Q 140 632 160 618 Q 178 605 211 594 Q 221 590 240 599 Q 348 629 470 644 L 531 651 Z", median: "M 153 645 L 177 634 L 219 628 L 416 663 L 794 706 L 823 702 L 887 679" },
      { id: "2", name: "竖钩", path: "M 435 100 Q 407 107 373 116 Q 360 120 361 112 Q 361 103 373 94 Q 445 39 491 -5 Q 503 -15 518 2 Q 560 60 553 141 Q 541 447 548 561 Q 548 579 550 596 Q 556 624 549 635 Q 545 642 531 651 C 509 671 457 671 470 644 Q 485 629 485 573 Q 488 443 488 148 Q 487 112 477 99 Q 464 92 435 100 Z", median: "M 478 644 L 518 610 L 518 101 L 495 55 L 450 68 L 369 110" }
    ]
  },
  {
    id: "small", word: "小", meaning: "small", practiceStrokeIds: ["gou", "dian", "pie"],
    strokes: [
      { id: "1", name: "竖钩", path: "M 499 695 Q 503 661 501 132 Q 500 110 488 101 Q 478 92 448 100 Q 414 107 383 113 Q 347 123 351 112 Q 352 105 375 91 Q 456 42 479 10 Q 504 -26 523 -25 Q 538 -26 552 11 Q 568 57 564 133 Q 531 583 572 723 Q 590 754 532 778 Q 498 797 477 789 Q 459 782 475 759 Q 497 731 499 695 Z", median: "M 484 773 L 501 765 L 533 730 L 525 545 L 532 191 L 528 90 L 510 54 L 459 68 L 358 112" },
      { id: "2", name: "撇点", path: "M 266 475 Q 223 408 170 349 Q 160 339 155 320 Q 148 292 154 273 Q 158 251 185 261 Q 213 274 237 308 Q 273 357 284 404 Q 297 441 293 470 Q 289 480 283 484 Q 273 484 266 475 Z", median: "M 280 476 L 254 405 L 170 274" },
      { id: "3", name: "点", path: "M 706 472 Q 769 411 842 323 Q 860 299 878 293 Q 888 292 897 303 Q 913 318 900 370 Q 887 431 709 508 Q 699 515 696 500 Q 695 484 706 472 Z", median: "M 709 494 L 800 425 L 848 380 L 866 353 L 879 311" }
    ]
  },
  {
    id: "sky", word: "天", meaning: "sky", practiceStrokeIds: ["heng", "pie", "na"],
    strokes: [
      { id: "1", name: "横", path: "M 499 681 Q 581 697 671 713 Q 726 725 734 732 Q 744 741 739 750 Q 732 763 699 773 Q 666 780 562 747 Q 439 719 336 709 Q 294 703 324 684 Q 369 659 430 668 L 499 681 Z", median: "M 326 698 L 350 691 L 403 691 L 654 741 L 700 747 L 727 744" },
      { id: "2", name: "横", path: "M 509 439 Q 615 454 771 455 Q 843 455 848 465 Q 854 478 836 493 Q 781 532 739 524 Q 652 505 506 478 L 447 470 Q 323 452 181 432 Q 159 429 175 411 Q 208 381 250 391 Q 340 416 442 430 L 509 439 Z", median: "M 179 421 L 204 414 L 238 414 L 519 462 L 749 490 L 800 484 L 839 472" },
      { id: "3", name: "撇", path: "M 506 478 Q 512 583 534 637 Q 540 650 530 658 Q 518 670 499 681 C 474 698 413 693 430 668 Q 455 637 455 606 Q 454 531 447 470 L 442 430 Q 412 253 320 176 Q 232 113 145 75 Q 130 71 127 66 Q 121 60 138 57 Q 214 51 362 143 Q 390 167 413 194 Q 470 267 494 405 L 506 478 Z", median: "M 438 664 L 485 643 L 491 633 L 466 401 L 450 336 L 424 268 L 394 216 L 340 158 L 212 87 L 134 63" },
      { id: "4", name: "捺", path: "M 494 405 Q 629 144 722 51 Q 740 33 762 31 Q 847 30 920 27 Q 951 26 952 33 Q 953 42 920 59 Q 752 134 710 180 Q 601 294 515 430 Q 511 434 509 439 C 493 464 473 446 494 405 Z", median: "M 505 431 L 510 408 L 533 366 L 596 270 L 714 122 L 771 78 L 947 35" }
    ]
  },
  {
    id: "field", word: "田", meaning: "field", practiceStrokeIds: ["heng", "shu", "heng-zhe"],
    strokes: [
      { id: "1", name: "竖", path: "M 225 620 Q 201 636 175 642 Q 168 646 161 639 Q 151 632 163 619 Q 163 616 169 607 Q 230 487 231 222 Q 234 140 277 112 L 279 111 Q 300 104 302 142 Q 302 152 301 164 L 297 200 Q 296 213 292 227 Q 264 473 260 573 Q 260 574 261 574 C 261 598 251 605 225 620 Z", median: "M 168 630 L 204 600 L 225 563 L 253 357 L 267 183 L 285 124" },
      { id: "2", name: "横折", path: "M 669 194 Q 679 166 703 111 Q 712 92 723 92 Q 741 93 753 123 Q 805 217 816 348 Q 829 430 840 523 Q 847 581 873 615 Q 894 639 879 655 Q 854 680 798 705 Q 776 717 738 703 Q 626 666 496 644 Q 385 629 225 620 C 195 618 232 568 261 574 Q 348 592 461 609 L 513 617 Q 600 632 701 646 Q 750 655 768 632 Q 778 610 779 586 Q 769 414 727 248 Q 723 218 710 216 C 695 190 658 222 669 194 Z", median: "M 234 618 L 277 600 L 518 632 L 739 675 L 770 675 L 804 655 L 823 634 L 792 401 L 761 236 L 746 196 L 726 169 L 724 108" },
      { id: "3", name: "横", path: "M 529 394 Q 598 404 660 411 Q 685 414 677 428 Q 667 444 640 450 Q 613 454 530 436 L 478 426 Q 408 413 345 402 Q 326 398 347 382 Q 363 370 394 375 Q 436 382 478 387 L 529 394 Z", median: "M 346 392 L 383 391 L 601 427 L 642 430 L 665 423" },
      { id: "4", name: "竖", path: "M 530 436 Q 533 598 534 598 Q 522 610 513 617 C 490 636 446 635 461 609 Q 465 602 470 594 Q 477 575 478 426 L 478 387 Q 478 320 478 219 C 478 189 524 196 524 226 Q 525 316 529 394 L 530 436 Z", median: "M 468 608 L 503 582 L 502 251 L 484 228" },
      { id: "5", name: "横", path: "M 301 164 Q 419 185 669 194 C 699 195 737 203 710 216 Q 707 216 675 236 Q 653 251 524 226 L 478 219 Q 381 207 297 200 C 267 197 271 159 301 164 Z", median: "M 305 171 L 320 185 L 393 194 L 604 216 L 696 217" }
    ]
  },
  {
    id: "book", word: "书", meaning: "book", practiceStrokeIds: ["heng-zhe", "heng-zhe-gou", "shu", "dian"],
    strokes: bookStrokePaths.map((stroke, index) => ({ id: String(index + 1), name: stroke.name, path: stroke.path, median: stroke.median }))
  },
  {
    id: "two", word: "二", meaning: "two", practiceStrokeIds: ["heng"],
    strokes: [
      { id: "1", name: "横", path: basicCharacterExamples.heng.paths[0], median: "M 293 588 L 436 584 L 673 624 L 724 626" },
      { id: "2", name: "横", path: basicCharacterExamples.heng.paths[1], median: "M 128 220 L 217 198 L 481 239 L 842 278 L 914 235" }
    ]
  },
  {
    id: "big", word: "大", meaning: "big", practiceStrokeIds: ["heng", "pie", "na"],
    strokes: [
      { id: "1", name: "横", path: "M 494 476 Q 542 485 795 501 Q 817 502 822 512 Q 826 525 808 540 Q 750 580 707 569 Q 631 550 500 522 L 436 509 Q 331 490 213 469 Q 189 465 208 447 Q 241 420 294 432 Q 357 453 431 465 L 494 476 Z", median: "M 210 458 L 268 453 L 514 503 L 719 534 L 770 529 L 810 517" },
      { id: "2", name: "撇", path: "M 487 437 Q 491 456 494 476 L 500 522 Q 510 711 528 763 Q 534 776 523 786 Q 501 805 459 822 Q 434 832 414 825 Q 390 816 410 796 Q 444 762 444 726 Q 445 602 436 509 L 431 465 Q 398 275 310 179 Q 303 173 297 166 Q 251 118 148 55 Q 133 48 130 43 Q 124 36 144 34 Q 195 34 300 104 Q 385 173 414 218 Q 444 266 480 396 L 487 437 Z", median: "M 416 810 L 444 799 L 482 759 L 469 518 L 448 394 L 426 320 L 386 231 L 361 196 L 307 140 L 202 67 L 138 41" },
      { id: "3", name: "捺", path: "M 480 396 Q 501 357 575 245 Q 657 124 718 56 Q 746 22 774 22 Q 856 28 928 32 Q 959 33 959 41 Q 960 50 927 66 Q 753 144 719 174 Q 614 267 500 419 Q 493 429 487 437 C 469 461 465 422 480 396 Z", median: "M 486 430 L 500 393 L 576 284 L 660 182 L 722 118 L 774 77 L 953 42" }
    ]
  },
  {
    id: "four", word: "四", meaning: "four", practiceStrokeIds: ["heng", "shu", "heng-zhe", "pie"],
    strokes: [
      { id: "1", name: "竖", path: "M 181 600 Q 160 612 138 618 Q 131 621 125 615 Q 115 608 127 596 Q 187 488 192 250 Q 193 186 231 153 Q 234 150 239 147 Q 258 141 260 176 Q 260 179 260 181 L 256 222 Q 255 237 233 382 Q 223 476 218 552 C 216 582 208 586 181 600 Z", median: "M 132 606 L 163 582 L 189 529 L 224 229 L 244 159" },
      { id: "2", name: "横折", path: "M 717 200 Q 732 151 739 143 Q 746 131 756 132 Q 768 133 780 152 Q 822 206 870 461 Q 880 527 903 564 Q 916 579 914 589 Q 915 605 874 643 Q 825 691 790 679 Q 784 679 778 677 Q 756 673 680 666 Q 451 647 302 616 Q 220 604 181 600 C 151 597 189 543 218 552 Q 222 553 236 558 Q 294 576 370 589 L 410 596 Q 485 611 523 611 L 589 618 Q 686 630 773 631 Q 798 632 810 616 Q 825 603 823 571 Q 820 493 784 354 Q 759 245 748 231 Q 747 227 739 225 Q 733 226 726 230 C 709 223 709 223 717 200 Z", median: "M 187 595 L 227 581 L 466 625 L 712 650 L 801 654 L 833 638 L 866 588 L 816 348 L 781 226 L 760 193 L 755 149" },
      { id: "3", name: "撇", path: "M 370 589 Q 391 546 349 422 Q 336 386 316 357 Q 306 341 296 326 Q 292 322 289 316 Q 286 307 295 308 Q 322 308 372 379 Q 408 436 424 507 Q 428 529 436 547 Q 443 559 439 570 Q 429 585 410 596 C 385 612 359 617 370 589 Z", median: "M 377 587 L 408 560 L 387 462 L 351 379 L 298 316" },
      { id: "4", name: "竖弯", path: "M 523 611 Q 524 608 529 604 Q 545 585 545 536 Q 546 493 546 439 Q 545 384 570 366 Q 592 345 691 351 Q 725 352 735 368 Q 745 378 738 386 Q 731 393 634 397 Q 589 400 587 441 Q 581 502 605 588 Q 609 603 601 612 Q 597 616 589 618 C 562 631 504 634 523 611 Z", median: "M 530 611 L 571 584 L 566 446 L 579 393 L 608 377 L 638 373 L 699 371 L 732 379" },
      { id: "5", name: "横", path: "M 260 181 Q 270 180 283 180 Q 421 199 717 200 C 747 200 748 209 726 230 Q 693 269 620 252 Q 418 225 256 222 C 226 221 230 183 260 181 Z", median: "M 263 216 L 285 201 L 651 229 L 697 224 L 706 211" }
    ]
  },
  {
    id: "five", word: "五", meaning: "five", practiceStrokeIds: ["heng", "shu", "heng-zhe"],
    strokes: [
      { id: "1", name: "横", path: "M 499 673 Q 590 688 686 701 Q 750 711 761 720 Q 771 729 767 738 Q 760 753 727 762 Q 693 772 598 744 Q 453 713 314 705 Q 272 701 301 680 Q 340 653 430 664 Q 440 665 452 667 L 499 673 Z", median: "M 304 694 L 343 685 L 400 686 L 704 735 L 753 733" },
      { id: "2", name: "竖", path: "M 482 468 Q 494 520 507 568 Q 525 635 524 641 Q 512 660 499 673 C 479 695 448 697 452 667 Q 461 625 443 526 Q 436 499 428 460 L 419 421 Q 395 322 357 159 C 350 130 401 136 408 165 Q 442 307 472 429 L 482 468 Z", median: "M 460 663 L 489 633 L 483 587 L 391 195 L 375 174 L 362 168" },
      { id: "3", name: "横折", path: "M 641 177 Q 678 360 738 416 Q 759 438 741 459 Q 722 475 661 505 Q 640 514 614 505 Q 545 481 482 468 L 428 460 Q 355 450 280 446 Q 261 446 262 434 Q 265 424 286 416 Q 314 401 357 413 Q 388 417 419 421 L 472 429 Q 527 439 584 446 Q 614 452 625 440 Q 643 421 637 384 Q 615 266 585 174 C 576 145 635 148 641 177 Z", median: "M 273 435 L 308 428 L 345 430 L 616 476 L 654 467 L 685 434 L 619 200 L 592 179" },
      { id: "4", name: "横", path: "M 357 159 Q 329 158 301 152 Q 159 130 72 134 Q 62 135 53 128 Q 46 121 52 110 Q 64 94 119 62 Q 134 55 156 64 Q 339 130 526 140 Q 670 152 937 99 Q 943 99 949 97 Q 970 93 977 103 Q 984 115 964 132 Q 883 199 844 191 Q 840 191 837 189 Q 807 183 641 177 L 585 174 Q 521 178 408 165 L 357 159 Z", median: "M 63 118 L 138 97 L 419 149 L 654 161 L 855 153 L 905 138 L 966 110" }
    ]
  },
  {
    id: "six", word: "六", meaning: "six", practiceStrokeIds: ["dian", "heng", "pie", "na"],
    strokes: [
      { id: "1", name: "点", path: "M 472 702 Q 502 677 534 645 Q 552 629 572 630 Q 585 631 592 649 Q 598 668 585 705 Q 578 727 541 744 Q 447 771 436 764 Q 429 758 432 742 Q 436 729 472 702 Z", median: "M 441 756 L 455 743 L 531 705 L 568 654" },
      { id: "2", name: "横", path: "M 128 467 Q 103 464 121 443 Q 137 427 159 419 Q 184 412 205 418 Q 427 478 848 478 Q 875 478 901 477 Q 925 477 931 487 Q 938 502 918 519 Q 846 571 778 551 Q 514 509 128 467 Z", median: "M 125 455 L 184 444 L 454 484 L 805 517 L 851 515 L 918 494" },
      { id: "3", name: "撇", path: "M 346 344 Q 342 241 202 138 Q 169 116 152 101 Q 139 86 157 88 Q 220 85 332 184 Q 405 257 428 279 Q 443 291 430 311 Q 391 359 360 361 Q 347 361 346 344 Z", median: "M 360 347 L 383 297 L 347 242 L 292 181 L 249 145 L 162 97" },
      { id: "4", name: "捺", path: "M 611 302 Q 675 223 752 114 Q 767 86 785 79 Q 795 76 806 87 Q 822 100 815 155 Q 811 224 623 335 Q 620 338 618 338 Q 608 347 603 332 Q 600 316 611 302 Z", median: "M 611 333 L 753 186 L 774 154 L 789 97" }
    ]
  }
];

const advancedPracticeRounds = basicPracticeRounds.filter((round) => round.practiceStrokeIds.some((id) => advancedStrokes.some((stroke) => stroke.id === id)));

// Reuse the real two-stroke 丁 outline already used by the writing exercise.
// Do not compose a character from generic isolated-stroke artwork.
const dingRound = basicPracticeRounds.find((round) => round.id === "ding");
basicCharacterExamples.gou = { word: "丁", target: 1, paths: dingRound.strokes.map((stroke) => stroke.path) };

function renderPracticeAnimation(round, nonce) {
  return `<svg class="stroke-practice-animation" viewBox="0 0 1024 900" aria-label="Animated ${round.word}"><defs>${round.strokes.map((piece, index) => `<mask id="practice-mask-${nonce}-${index}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="-80" width="1024" height="1000"><path class="stroke-reveal" style="animation-delay:${index * 1050}ms" d="${piece.median}" pathLength="100"/></mask>`).join("")}</defs><g transform="translate(0 900) scale(1 -1)">${round.strokes.map((piece) => `<path class="stroke-practice-ghost" d="${piece.path}"/>`).join("")}${round.strokes.map((piece, index) => `<path class="stroke-practice-ink" style="animation-delay:${index * 1050}ms" d="${piece.path}" mask="url(#practice-mask-${nonce}-${index})"/>`).join("")}</g></svg>`;
}

export function createStrokeRuntime({ state, focusExplorer, activityPanelTitle, activityPanelSummary, activityList, speak }) {
  const strokeGroups = {
    basic: basicStrokes,
    advanced: advancedStrokes
  };

  function activeStroke(level) {
    const strokes = strokeGroups[level];
    return strokes.find((stroke) => stroke.id === state.strokeId) ?? strokes[0];
  }

  function renderStrokeExplorer() {
    const level = state.strokeLevel === "advanced" ? "advanced" : "basic";
    const strokes = strokeGroups[level];
    const stroke = activeStroke(level);
    const isAdvanced = level === "advanced";
    const characterExample = isAdvanced ? stroke.characterExample : basicCharacterExamples[stroke.id];
    if (isAdvanced && advancedStrokes.some((item) => !item.outline)) {
      Promise.all(advancedStrokes.map(prepareAdvancedStroke)).then(() => renderStrokeExplorer()).catch(() => {});
    }
    const visibleTianStrokes = tianOrder.slice(0, state.strokeTianStep ?? 0);
    focusExplorer.innerHTML = `
      <section class="stroke-lab${isAdvanced ? " is-advanced" : ""}" aria-label="Chinese stroke lesson">
        <header class="stroke-lab-header"><div><p class="body-match-kicker">Writing path</p><h3>${isAdvanced ? "组合笔画" : "基本笔画"}</h3><p>${isAdvanced ? "Learn a connected movement after the basic strokes are familiar." : "Start with the simple movements used throughout early CSL words."}</p></div><span>简体字笔顺</span></header>
        <nav class="stroke-level-tabs" aria-label="Stroke lesson level"><button type="button" class="${!isAdvanced ? "is-active" : ""}" data-stroke-level="basic">基本笔画<span> · Basic</span></button><button type="button" class="${isAdvanced ? "is-active" : ""}" data-stroke-level="advanced">进阶笔画<span> · Advanced</span></button></nav>
        <section class="stroke-teaching-frames"><article class="stroke-single-frame"><p class="body-match-kicker">1 · 笔画</p><svg class="stroke-player" viewBox="0 0 1024 900" aria-label="Animated ${stroke.zh} stroke"><defs><marker id="stroke-arrow-${state.strokeAnimationNonce}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="54" markerHeight="54" orient="auto-start-reverse"><path class="stroke-arrowhead" d="M 0 0 L 10 5 L 0 10 Z"/></marker><mask id="stroke-reveal-mask-${state.strokeAnimationNonce}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="-80" width="1024" height="1000"><path class="stroke-reveal" d="${stroke.path}" pathLength="100"/></mask></defs><g transform="translate(0 900) scale(1 -1)"><path class="stroke-guide" d="${stroke.outline}"/><path class="stroke-demo-fill" d="${stroke.outline}" mask="url(#stroke-reveal-mask-${state.strokeAnimationNonce})" data-stroke-animation="${state.strokeAnimationNonce}"/><path class="stroke-motion" d="${stroke.path}" pathLength="100" marker-end="url(#stroke-arrow-${state.strokeAnimationNonce})"/></g></svg></article><article class="stroke-character-frame"><p class="body-match-kicker">2 · 汉字</p><svg viewBox="0 0 1024 900" aria-label="${characterExample.word}，${stroke.zh} 已高亮"><g transform="translate(0 900) scale(1 -1)">${characterExample.paths.filter((_, index) => index !== characterExample.target).map((path) => `<path class="stroke-character-path" d="${path}"/>`).join("")}<path class="stroke-character-path is-highlighted" d="${characterExample.paths[characterExample.target]}"/></g></svg><strong>${characterExample.word}</strong></article><article class="stroke-explanation-frame"><p class="body-match-kicker">3 · 怎么写</p><h4>${stroke.zh}<span> · ${stroke.en}</span></h4><p>Move <strong>${stroke.direction}</strong>.</p></article></section>
        <div class="stroke-picker" role="list" aria-label="Choose a ${isAdvanced ? "more advanced" : "basic"} stroke">${strokes.map((item) => `<button class="stroke-picker-button${item.id === stroke.id ? " is-selected" : ""}" type="button" data-stroke-id="${item.id}" aria-pressed="${item.id === stroke.id}"><svg viewBox="0 0 1024 900" aria-hidden="true"><g transform="translate(0 900) scale(1 -1)"><path d="${item.outline}"/></g></svg><span><strong>${item.zh}</strong><em>${item.pinyin}</em><small>${item.en}</small></span></button>`).join("")}</div>
        ${!isAdvanced ? `<section class="stroke-rules"><p class="body-match-kicker">The rules children use most</p><div>${[["从上到下", "top before bottom"], ["从左到右", "left before right"], ["先横后竖", "horizontal before vertical"], ["先外后内", "outside before inside"], ["最后封口", "close the frame last"]].map(([zh, en]) => `<span><strong>${zh}</strong><small>${en}</small></span>`).join("")}</div></section>` : ""}
      </section>
    `;
    const motionMarker = focusExplorer.querySelector(`[id^="stroke-arrow-"]`);
    motionMarker?.setAttribute("markerWidth", "32");
    motionMarker?.setAttribute("markerHeight", "32");
    motionMarker?.setAttribute("refX", "5.8");
    focusExplorer.querySelectorAll("[data-stroke-id]").forEach((button) => button.addEventListener("click", async () => {
      const nextStroke = strokeGroups[state.strokeLevel].find((item) => item.id === button.dataset.strokeId);
      if (state.strokeLevel === "advanced") {
        button.setAttribute("aria-busy", "true");
        try { await prepareAdvancedStroke(nextStroke); } catch { return; } finally { button.removeAttribute("aria-busy"); }
      }
      state.strokeId = nextStroke.id;
      state.strokeAnimationNonce += 1;
      if (state.tapAudioEnabled) speak?.(activeStroke(level).zh, 0.7);
      renderStrokeExplorer();
    }));
    focusExplorer.querySelectorAll("[data-stroke-level]").forEach((button) => button.addEventListener("click", async () => {
      state.strokeLevel = button.dataset.strokeLevel;
      state.strokeId = strokeGroups[state.strokeLevel][0].id;
      state.strokePracticeStrokeId = strokeGroups[state.strokeLevel][0].id;
      state.strokePracticeCharacterId = "";
      state.strokePracticeChosenIds = [];
      state.strokeAnimationNonce += 1;
      if (state.strokeLevel === "advanced") await prepareAdvancedStroke(strokeGroups.advanced[0]);
      renderStrokeExplorer();
      renderStrokePractice();
    }));
    focusExplorer.querySelector("[data-stroke-tian-next]")?.addEventListener("click", () => {
      state.strokeTianStep = state.strokeTianStep >= tianOrder.length ? 0 : state.strokeTianStep + 1;
      renderStrokeExplorer();
    });
  }

  function renderStrokePractice() {
    const isAdvanced = state.strokeLevel === "advanced";
    const practiceRounds = isAdvanced ? advancedPracticeRounds : basicPracticeRounds;
    const mappedEntries = strokePracticeMap.filter((item) => item.strokeIds.some((id) => (isAdvanced ? advancedStrokes : basicStrokes).some((stroke) => stroke.id === id)));
    const practiceStrokeChoices = (isAdvanced ? advancedStrokes : basicStrokes).filter((stroke) => mappedEntries.some((item) => item.strokeIds.includes(stroke.id)) || practiceRounds.some((item) => item.practiceStrokeIds.includes(stroke.id)));
    const selectedStroke = practiceStrokeChoices.find((stroke) => stroke.id === state.strokePracticeStrokeId) ?? practiceStrokeChoices[0];
    const matchingEntries = mappedEntries.filter((item) => item.strokeIds.includes(selectedStroke.id));
    const unloadedEntries = matchingEntries.filter((item) => !mappedPracticeRounds.has(item.word));
    if (unloadedEntries.length) Promise.all(unloadedEntries.map(prepareMappedPracticeRound)).then(() => renderStrokePractice()).catch(() => {});
    const matchingRounds = [...practiceRounds.filter((item) => item.practiceStrokeIds.includes(selectedStroke.id)), ...matchingEntries.map((item) => mappedPracticeRounds.get(item.word)).filter(Boolean)].filter((item, index, all) => all.findIndex((other) => other.word === item.word) === index);
    if (!matchingRounds.length) {
      activityPanelTitle.textContent = "Preparing character practice";
      activityPanelSummary.textContent = "Loading the local stroke paths for this CSL character.";
      activityList.innerHTML = "<p class=\"empty-state\">Preparing the character cards…</p>";
      return;
    }
    const round = matchingRounds.find((item) => item.id === state.strokePracticeCharacterId) ?? matchingRounds[0];
    const chosenIds = state.strokePracticeChosenIds ?? [];
    const availableStrokes = round.strokes.slice().reverse();
    const isComplete = chosenIds.length === round.strokes.length;
    const isCorrect = isComplete && chosenIds.every((id, index) => id === round.strokes[index].id);
    const lastPlacedIndex = chosenIds.length - 1;
    const lastPlacementCorrect = lastPlacedIndex >= 0 && chosenIds[lastPlacedIndex] === round.strokes[lastPlacedIndex].id;
    const rejectedStrokeId = state.strokePracticeRejectedId ?? "";
    const availableStrokeCards = availableStrokes.map((piece) => {
      if (chosenIds.includes(piece.id)) return `<span class="stroke-piece-placeholder" aria-hidden="true"></span>`;
      const isRejected = piece.id === rejectedStrokeId;
      return `<button type="button" class="${isRejected ? "is-last-wrong" : ""}" data-stroke-piece="${piece.id}"><svg viewBox="0 0 1024 900" aria-label="${piece.name}"><g transform="translate(0 900) scale(1 -1)"><path d="${piece.path}"/></g></svg>${isRejected ? "<i aria-label=\"Try again\">×</i>" : ""}</button>`;
    }).join("");
    const orderSlots = round.strokes.map((_, index) => {
      const chosen = chosenIds[index];
      const piece = round.strokes.find((stroke) => stroke.id === chosen);
      const feedbackClass = index === lastPlacedIndex ? (lastPlacementCorrect ? " is-last-correct" : " is-last-wrong") : "";
      const feedbackMark = index === lastPlacedIndex ? `<i aria-label="${lastPlacementCorrect ? "Correct" : "Try again"}">${lastPlacementCorrect ? "✓" : "×"}</i>` : "";
      return `<button type="button" class="${piece ? "is-filled" : ""}${feedbackClass}" disabled><b>${index + 1}</b>${feedbackMark}${piece ? `<svg viewBox="0 0 1024 900" aria-label="${piece.name}"><g transform="translate(0 900) scale(1 -1)"><path d="${piece.path}"/></g></svg>` : "<span>?</span>"}</button>`;
    }).join("");
    activityPanelTitle.textContent = isAdvanced ? "Choose a combination stroke, then a character" : "Choose a stroke, then a character";
    activityPanelSummary.textContent = isAdvanced ? "Pick a connected stroke, then practise it inside a character." : "Pick the stroke you want to practise. Then choose a character containing it.";
    activityList.className = "support-list";
    activityList.innerHTML = `<section class="stroke-practice-library"><p class="body-match-kicker">1 · Choose a stroke</p><div class="stroke-practice-stroke-picker">${practiceStrokeChoices.map((stroke) => `<button type="button" class="${stroke.id === selectedStroke.id ? "is-selected" : ""}" data-practice-stroke="${stroke.id}" aria-label="${stroke.zh}"><svg viewBox="0 0 1024 900" aria-hidden="true"><g transform="translate(0 900) scale(1 -1)"><path d="${stroke.outline}"/></g></svg></button>`).join("")}</div><p class="body-match-kicker">2 · Choose a character</p><div class="stroke-practice-character-picker">${matchingRounds.map((item) => `<button type="button" class="${item.id === round.id ? "is-selected" : ""}" data-practice-character="${item.id}"><strong>${item.word}</strong><small>${item.meaning}</small></button>`).join("")}</div></section><section class="stroke-practice-card stroke-order-practice"><header><div class="stroke-practice-character">${round.word}</div><div><p class="body-match-kicker">Write this character</p><h4>${round.meaning}</h4><p>Click the stroke cards to place them in the writing order: 1, 2, 3 …</p></div></header><div class="stroke-piece-bank" aria-label="Available strokes">${availableStrokeCards}</div><div class="stroke-order-slots" aria-label="Your stroke order">${orderSlots}</div></section>`;
    const builtPieces = chosenIds.map((id) => round.strokes.find((piece) => piece.id === id)).filter(Boolean);
    activityList.querySelector(".stroke-order-slots")?.insertAdjacentHTML?.("afterend", `<section class="stroke-build-preview" aria-live="polite"><p>What you have written</p><svg viewBox="0 0 1024 900" aria-label="Current writing of ${round.word}"><g transform="translate(0 900) scale(1 -1)">${builtPieces.map((piece) => `<path d="${piece.path}"/>`).join("")}</g></svg></section>`);
    if (isCorrect) {
      const bank = activityList.querySelector(".stroke-piece-bank");
      bank.classList.add("is-animation");
      bank.innerHTML = `<div class="stroke-piece-animation-slot"></div>`;
      const animationSlot = bank.firstElementChild;
      requestAnimationFrame(() => {
        if (!animationSlot.isConnected) return;
        animationSlot.innerHTML = renderPracticeAnimation(round, state.strokeAnimationNonce);
        requestAnimationFrame(() => animationSlot.querySelector(".stroke-practice-animation")?.classList.add("is-playing"));
      });
    }
    activityList.querySelectorAll("[data-stroke-piece]").forEach((button) => button.addEventListener("click", () => {
      const isNextStroke = button.dataset.strokePiece === round.strokes[chosenIds.length]?.id;
      if (!isNextStroke) {
        state.strokePracticeRejectedId = button.dataset.strokePiece;
        renderStrokePractice();
        setTimeout(() => {
          if (state.strokePracticeRejectedId !== button.dataset.strokePiece) return;
          state.strokePracticeRejectedId = "";
          renderStrokePractice();
        }, 700);
        return;
      }
      state.strokePracticeRejectedId = "";
      state.strokePracticeChosenIds = [...chosenIds, button.dataset.strokePiece];
      if (state.strokePracticeChosenIds.length === round.strokes.length) state.strokeAnimationNonce += 1;
      renderStrokePractice();
    }));
    activityList.querySelectorAll("[data-practice-stroke]").forEach((button) => button.addEventListener("click", () => {
      state.strokePracticeStrokeId = button.dataset.practiceStroke;
      state.strokePracticeCharacterId = "";
      state.strokePracticeChosenIds = [];
      state.strokePracticeRejectedId = "";
      renderStrokePractice();
    }));
    activityList.querySelectorAll("[data-practice-character]").forEach((button) => button.addEventListener("click", () => {
      state.strokePracticeCharacterId = button.dataset.practiceCharacter;
      state.strokePracticeChosenIds = [];
      state.strokePracticeRejectedId = "";
      renderStrokePractice();
    }));
  }

  return { renderStrokeExplorer, renderStrokePractice };
}
