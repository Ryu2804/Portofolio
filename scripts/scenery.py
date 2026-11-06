"""Generate pixel-art scenery paths for components/Scenery.tsx."""
import math, sys
K,C,B,P,D,L="#413333","#f2765e","#315b8c","#f5ebdd","#23436a","#9fb2c8"

def paths(grid):
    """grid: dict (x,y)->color. Returns {color: pathdata} with row run-length rects."""
    by={}
    for (x,y),c in grid.items(): by.setdefault(c,set()).add((x,y))
    out={}
    for c,pts in by.items():
        rows={}
        for x,y in pts: rows.setdefault(y,[]).append(x)
        d=[]
        for y in sorted(rows):
            xs=sorted(rows[y]); s=xs[0]; p=s
            for x in xs[1:]+[None]:
                if x is not None and x==p+1: p=x; continue
                d.append(f"M{s} {y}h{p-s+1}v1h-{p-s+1}z")
                if x is not None: s=p=x
        out[c]="".join(d)
    return out

def sprite(art,legend,ox=0,oy=0,grid=None):
    grid=grid if grid is not None else {}
    for y,row in enumerate(art):
        for x,ch in enumerate(row):
            if ch in legend: grid[(ox+x,oy+y)]=legend[ch]
    return grid

def cloud(cx,cy,blobs,grid):
    """Union of circles, cream fill, blue outline, with a 祥云 curl."""
    inside=set()
    for dx,dy,r in blobs:
        for y in range(cy+dy-r,cy+dy+r+1):
            for x in range(cx+dx-r,cx+dx+r+1):
                if (x-cx-dx)**2+(y-cy-dy)**2<=r*r+r*0.6: inside.add((x,y))
    flat=max(y for x,y in inside)-1
    inside={(x,y) for x,y in inside if y<=flat}  # flat cloud base
    for x,y in inside:
        edge=any((x+a,y+b) not in inside for a,b in((1,0),(-1,0),(0,1),(0,-1)))
        grid[(x,y)]=B if edge else P
    # curl inside the biggest blob
    dx,dy,r=max(blobs,key=lambda b:b[2])
    curl=[".BBBB.",
          "B....B",
          "B.BB.B",
          "B.B..B",
          "B..BB.",
          ".B...."]
    sprite(curl,{"B":B},ox=cx+dx-3,oy=cy+dy-3,grid=grid)
    return grid

def mountains():
    W,H=320,100
    g={}
    def ridge(peaks,x):
        h=0
        for px,ph,s in peaks: h=max(h,ph-abs(x-px)*s)
        # stair-step the slope for pixel feel
        return int(h)//2*2
    back=[(18,62,0.9),(78,74,0.8),(140,58,1.0),(196,70,0.85),(262,64,0.9),(318,72,0.8)]
    front=[(44,48,1.1),(112,40,1.2),(166,30,1.3),(236,56,1.0),(300,38,1.2)]
    def dither(x,y):
        return True
    # sun
    for y in range(H):
        for x in range(W):
            if (x-188)**2+(y-30)**2<=15*15 and dither(x,y): g[(x,y)]=C
    for x in range(W):
        top=H-ridge(back,x)
        for y in range(top,H):
            if dither(x,y): g[(x,y)]=L
    for x in range(W):
        top=H-max(ridge(front,x),26)
        for y in range(top,H):
            if dither(x,y): g[(x,y)]=K if y==top else B
    # pagoda on the 236 peak
    pag=["....K....",
         "...KKK...",
         ".CCCCCCC.",
         "C.KK.KK.C",
         "..KKKKK..",
         "CCCCCCCCC",
         "..KK.KK..",
         "..KKKKK..",
         "CCCCCCCCC",
         ".KK.K.KK.",
         ".KKKKKKK."]
    sprite(pag,{"K":K,"C":C},ox=232,oy=H-56-len(pag)+1,grid=g)
    return W,H,g

def clouds_layer(specs,W,H):
    g={}
    for cx,cy,blobs in specs: cloud(cx,cy,blobs,g)
    return W,H,g

LANTERN=["....K....",
         "....K....",
         "..KKKKK..",
         ".KCKCKCK.",
         "KCPKCKCCK",
         "KCPKCKCCK",
         "KCCKCKCCK",
         "KCCKCKCCK",
         "KCCKCKCCK",
         ".KCKCKCK.",
         "..KKKKK..",
         "...C.C...",
         "...C.C...",
         "....C...."]
KOI=["......CC..........",
     "....CCCCC.........",
     "..CCPPPCCCCC...CC.",
     ".CKPPCCCCPPCCCCCC.",
     "CCCPPCCCCPPCCC.CCC",
     ".CCCCCCCCCCCCCCCC.",
     "..CCCCCCCCCC...CC.",
     "....CCCCC.........",
     "......CC.........."]

# 2-frame sprite sheet (wings up | wings level), animated with steps(2) in CSS
BIRD=["K.......K.........",
      ".K.....K..........",
      "..KK.KK..KKKK.KKKK",
      "....K........K...."]

def waves():
    """Tileable 海水 strip: stacked arcs, cream foam lines, solid sea below."""
    W,H=32,28
    g={}
    rows=[(6,0),(13,16),(20,0)]
    for y in range(H):
        for x in range(W):
            g_layer=None
            for i,(base,off) in enumerate(rows):
                for k in (-1,0,1):
                    cx=off+k*W+8; 
                    for cx2 in (cx,cx+16):
                        r=8
                        if (x-cx2)**2+(y-base)**2<=r*r and y<=base: g_layer=(i,cx2,base)
                if y>base: g_layer=g_layer or (i,None,base)
            if g_layer is None: continue
            i,cx2,base=g_layer
            # foam: arc outline
            onarc=cx2 is not None and abs(math.hypot(x-cx2,y-base)-7.5)<0.75
            g[(x,y)]=P if onarc else (B if i<2 else D)
    return W,H,g

def cloud_sea():
    """Tileable 祥云 bank: cream puffs over transparent sky, solid cream base (= paper section)."""
    W,H=80,30
    g={}
    puffs=[(6,16,7),(18,12,8),(31,17,6),(42,10,9),(56,15,7),(68,11,8),(80,16,7),(86,12,8)]
    inside=set()
    for cx,cy,r in puffs:
        for k in (-W,0,W):
            for y in range(H):
                for x in range(W):
                    if (x-cx-k)**2+(y-cy)**2<=r*r+r*0.6: inside.add((x,y))
    # each column solid from its highest puff pixel down, so no gaps between puffs
    for x in range(W):
        top=min([y for (px,y) in inside if px==x]+[19])
        for y in range(top,H): inside.add((x,y))
    for x,y in inside:
        top_edge=(x,y-1) not in inside
        g[(x,y)]=P
        if top_edge: g[(x,y)]=K
    # curls on the larger puffs
    curl=[".BBBB.","B....B","B.BB.B","B.B..B","B..BB.",".B...."]
    for cx,cy,r in puffs:
        if r>=8 and 0<=cx<W-4: sprite(curl,{"B":B},ox=cx-3,oy=cy-2,grid=g)
    return W,H,g

def emit(name,W,H,g):
    ps=paths(g)
    order=[L,C,B,D,K,P]
    body="".join(f'<path fill="{c}" d="{ps[c]}"/>' for c in order if c in ps)
    return name,W,H,body

if __name__=="__main__":
    # usage: python3 scripts/scenery.py public/scenery
    import os
    out=sys.argv[1]
    for n,(W,H,g) in {
        "mountains":mountains(),
        "mountain-clouds":clouds_layer([(40,52,[(0,0,6),(7,-3,7),(15,0,5)]),(150,44,[(0,0,5),(6,-3,6),(13,0,4)]),(282,58,[(0,0,5),(7,-2,6),(14,1,4)])],320,100),
        "cloud-sea":cloud_sea(),
        "lantern":(9,14,sprite(LANTERN,{"K":K,"C":C,"P":P})),
        "koi":(18,9,sprite(KOI,{"K":K,"C":C,"P":P})),
        "waves":waves(),
        "bird":(18,4,sprite(BIRD,{"K":K})),
    }.items():
        _,W,H,body=emit(n,W,H,g)
        # wide scenes crop from bottom-centre; tiles and sprites keep their shape
        par="xMidYMax slice" if W>=320 else "xMidYMid meet"
        open(os.path.join(out,n+".svg"),"w").write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="{par}" shape-rendering="crispEdges">{body}</svg>')
