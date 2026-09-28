"""Pixel-compare the screenshot pairs written by scripts/verify.mjs (dev only).
Run: python3 scripts/compare-screenshots.py   (needs Pillow)
Prints, per page, whether sizes match and the share of pixels that differ by more
than a small tolerance, and writes a red-highlighted diff image for any page that differs."""
import glob, os
from PIL import Image, ImageChops

root = os.path.join(os.path.dirname(__file__), '..', 'verification')
worst = []
# screenshots may sit in verification/shots or in per-run folders (OUT_DIR=verification/<name>)
for ref_path in sorted(glob.glob(os.path.join(root, '**', 'shots', '*-ref.png'), recursive=True)):
    new_path = ref_path.replace('-ref.png', '-new.png')
    name = os.path.basename(ref_path)[:-8]
    a, b = Image.open(ref_path).convert('RGB'), Image.open(new_path).convert('RGB')
    if a.size != b.size:
        print(f'{name:40s} SIZE {a.size} vs {b.size}')
        worst.append((1.0, name)); continue
    diff = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v > 24 else 0)
    changed = sum(diff.histogram()[255:]) / (a.size[0] * a.size[1])
    worst.append((changed, name))
    flag = '' if changed == 0 else '  <-- differs'
    print(f'{name:40s} {changed * 100:7.3f}% pixels differ{flag}')
    if changed:
        overlay = a.copy(); overlay.paste((255, 0, 0), mask=diff)
        overlay.save(ref_path.replace('-ref.png', '-diff.png'))
print('\nmax', max(worst) if worst else None)
