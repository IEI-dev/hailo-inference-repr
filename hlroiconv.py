#!/usr/bin/env python
import cv2
import json
import sys
import math
import pathlib

#translate into in-video coordinates
class HLCoord():
    def __init__( self, vw, vh):
        self.iw=640
        self.ih=640
        self.vw = vw
        self.vh = vh
        self.widev = vw > vh
        if self.widev:
            self.ew = self.iw
            self.eh = self.ew * self.vh / self.vw
        else:
            self.eh = self.ih
            self.ew = self.eh * self.vw / self.vh 
    def ftov( self, x, y, w, h):
        if self.widev:
            ox = x * self.vw 
            oy = ( (y * self.ih) - (self.ih - self.eh)/2 ) * self.vh / self.eh
            ow = w * self.vw
            oh = (h * self.ih / self.eh) * self.vh
        else:
            oy = y * self.vh
            ox = ((x * self.iw) - (self.iw - self.ew)/2) * self.vw / self.ew
            ow = ( w * self.vw / self.ew) * self.vw
            oh = h * self.vh
        return (ox,oy,ow,oh)


class HLExport:
    def getvinfo( self, fn):
        vid = cv2.VideoCapture(fn)
        height = vid.get(cv2.CAP_PROP_FRAME_HEIGHT)
        width = vid.get(cv2.CAP_PROP_FRAME_WIDTH)
        fps = vid.get(cv2.CAP_PROP_FPS)
        return (int(width),int(height),fps)
     
    def __init__(self, hlfn, vfn=None):
        [vwidth, vheight, fps] = [1280,720,30] 
        if vfn:
            [vwidth, vheight, fps] = self.getvinfo( vfn)
        self.vwidth = vwidth
        self.vheight = vheight
        self.fps = fps
        self.frame_time = 1.0/ self.fps
        f = open( hlfn, 'r')
        self.hldets = json.loads(f.read())
        self.hlc = HLCoord( self.vwidth, self.vheight)
#{
#  'HailoDetection': 
#    { 'label': 'umbrella', 'class_id': 26, 'confidence': 0.3163391649723053, 'HailoBBox': {'xmin': 0.591410219669342, 'ymin': 0.33418598771095276, 'width': 0.045648012310266495, 'height': 0.025295356288552284}, 'SubObjects': []}}
    def convert_bbox( self, bbox):
        vbbox = self.hlc.ftov( bbox['xmin'], bbox['ymin'], bbox['width'], bbox['height'])
        pbbox = [ math.ceil(a) for a in vbbox]
        return pbbox
    def convert( self):
        frames = []
        for frm_idx, hldet in enumerate( self.hldets):
            hroi = hldet['HailoROI']
            #print(hroi['HailoBBox'])
            objs=hroi['SubObjects']
            [ boxes, labels, scores, currtime ] = [ [], [], [],0]
            for o in objs:
                det = o['HailoDetection']
                boxes.append( self.convert_bbox( det['HailoBBox']) )
                labels.append( det['label'] )
                scores.append( det['confidence'])
            frames.append( { 'frame_id': frm_idx, 'time_offt': currtime, 'boxes': boxes, 'labels': labels, 'scores': scores})
            currtime+=self.frame_time
        return { "inftype": "object_detect", "width": self.vwidth, "height": self.vheight, "fps": self.fps, 'frames': frames }
    def save(self, dstfn):
        newj = self.convert()
        with open( dstfn, 'w') as f:
            json.dump( newj, f)

def get_outfn( injfn):
    apth = pathlib.Path(injfn)
    return f'{apth.stem}_p{apth.suffix}'

if __name__ == "__main__":
    if len(sys.argv)<3:
        print(f'Usage: {sys.argv[0]} <input json> <input mp4>')
        sys.exit(0) 
    hle = HLExport( sys.argv[1], sys.argv[2])
    outfn = get_outfn( sys.argv[1])
    hle.save( outfn)
    print(f'save to {outfn}')
            
