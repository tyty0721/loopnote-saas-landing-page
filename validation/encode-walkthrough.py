"""Encode REAL browser frames, resampling each recorded scene to 10 seconds."""
from pathlib import Path
import json, imageio.v2 as imageio, numpy as np
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1]
frames=sorted((root/'validation/recording-frames').glob('*.png'))
scenes=[(0,19,'01  English landing page: actual rendered interface'),(19,38,'02  Three preset meetings: switch the example'),(38,57,'03  Mark a task complete: progress updates'),(57,76,'04  Chinese localization: task state stays intact'),(76,95,'05  Mobile layout at 375 px'),(95,114,'06  Concept pricing: local dialog, no payment'),(114,len(frames),'07  FAQ: clear scope and integration boundaries')]
writer=imageio.get_writer(root/'portfolio/demo-walkthrough.mp4',fps=12,codec='libx264',quality=7,macro_block_size=1)
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',22)
for start,end,caption in scenes:
    seq=frames[start:end]
    for i in range(120):
        img=Image.open(seq[min(len(seq)-1,int(i*len(seq)/120))]).convert('RGB');img.thumbnail((1280,736),Image.Resampling.LANCZOS)
        canvas=Image.new('RGB',(1280,800),'#13213b');canvas.paste(img,((1280-img.width)//2,54+(736-img.height)//2));draw=ImageDraw.Draw(canvas);draw.text((25,13),caption,font=font,fill='white');writer.append_data(np.array(canvas))
writer.close()
(root/'portfolio/video-manifest.json').write_text(json.dumps({'duration_seconds':70,'fps':12,'source':'Actual Chromium browser screenshots captured every ~0.5 seconds during a scripted walkthrough. Resampled per scene. No generated product frames, real client results or voice-over.','scenes':scenes},indent=2),encoding='utf-8')
print(root/'portfolio/demo-walkthrough.mp4')
