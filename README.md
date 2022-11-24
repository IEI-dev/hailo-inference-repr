## Problem
Hailo Tappas is based on gstreamer.  All example code are in the form of gst pipeline.  We found that the sink of these pipelines are all XWindow(via `fpsdisplaysink video-sink=xvimagesink`).  This makes these examples not suitable for QTS apps since the main UI of QTS is Web.  Hail doesn't provide any best practice for web apps in their official programming guide.

## Proposed Solution
* Replace `fpsdisplaysink` with `fakesink` so that the whole gst pipeline won't require XWindow.
* Make use of the `hailoexport` plugin, which exports inference result to a json file.
* Backend code would serve both media files and inference results in the form HTTP resource.  Necessary conversion to the json file for ease of rendering could be done here.
* Frontend code should utilize HTML5 video and canvas API to render inference results over the video.  Necessary timing info for synchronizing between video and inferences should be included.

## Environment Setup
* install the `Tappas` container image according to `2.5.2. Running TAPPAS container from pre-built Docker image` in `TAPPAS User Guide`
* After installation, you can check it out by `docker images` command
```
$ docker images                                                                                              
REPOSITORY           TAG                       IMAGE ID       CREATED         SIZE   
hailo_tappas         v3.21.0                   0f573cb22197   2 weeks ago     4.17GB
```
* create a directory called `work` for sharing files between host and the container.
* place the script [exportinf.sh](exportinf.sh) and the video files you'd like to inference into the `work` directory
* run the `hailo_tappas` container.  You are supposed to get a interactive shell inside the container.
``` sh
IMAGE_NAME=hailo_tappas
CONTAINER_TAG=v3.21.0
CONTAINER_NAME=hailo_tappas_container_v3.21.0
XAUTH_FILE=$(realpath ~/.Xauthority)
#        --name "$CONTAINER_NAME" \
docker run --rm -it --privileged --net=host \
        --ipc=host \
        --device /dev/dri:/dev/dri \
        -v ${XAUTH_FILE}:/root/.Xauthority:rw \
        -v /tmp/.X11-unix/:/tmp/.X11-unix/ \
        -v $(realpath ./work):/local/workspace/tappas/work \
        -v /dev:/dev \
        -v /lib/firmware:/lib/firmware \
        -v /lib/$(uname -m)-linux-gnu/dri:/lib/$(uname -m)-linux-gnu/dri \
        -v /usr/lib/$(uname -m)-linux-gnu/dri/:/usr/lib/$(uname -m)-linux-gnu/dri/ \
        --group-add 44 \
        -e DISPLAY=$DISPLAY \
        -e XDG_RUNTIME_DIR=$XDG_RUNTIME_DIR \
        $IMAGE_NAME:$CONTAINER_TAG
```
* inside the container, run the script to inference a video file.  Inference results would be written into `myvideo.json` 
```
./exportinf.sh myvideo.mp4 
```

* You might found that the json file generated by `hailexport` plugin is difficult to comprehend.  Its coordinates system is based on the frame size of the detection NN instead of input video's frame size.  For ease of rendering, we prepare a conversion script to make all coordinates represented in the video's native resolution.  In the following example, the script would save all translated result into a file called `myvideo_p.json`.
```
./hlroiconv.py myvideo.json myvideo.mp4
```

* build the frontend
```
npm install
npm run build
```


* run a simple web server at port 7000
```
cd build
python3 -m http.server 7000
```

* open the browser and visit http://<your hailo linux box>:7000/ 
