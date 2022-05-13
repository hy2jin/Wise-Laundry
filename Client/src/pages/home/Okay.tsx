import { Component, createRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import styled from 'styled-components';
tf.setBackend('webgl');

const threshold = 0.6;
// 모델 버전 3.15
async function load_model() {
  // It's possible to load the model locally or from a repo
  // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
  // const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
  // const model = await loadGraphModel("https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json");
  const model = await loadGraphModel(process.env.PUBLIC_URL + 'best_web_model/model.json');
  return model;
}

let classesDir = {
  1: {
    name: "laundry1",
    id: 1
  },
  2: {
    name: "laundry2",
    id: 2
  },
  3: {
    name: "laundry3",
    id: 3
  },
  4: {
    name: "laundry4",
    id: 4
  },
  5: {
    name: "bleach1",
    id: 5
  },
  6: {
    name: "bleach2",
    id: 6
  },
  7: {
    name: "bleach3",
    id: 7
  },
  8: {
    name: "bleach4",
    id: 8
  },
  9: {
    name: "bleach5",
    id: 9
  },
  10: {
    name: "bleach6",
    id: 10
  },
  11: {
    name: "bleach7",
    id: 11
  },
  12: {
    name: "dry1",
    id: 12
  },
  13: {
    name: "dry2",
    id: 13
  },
  14: {
    name: "dry3",
    id: 14
  },
  15: {
    name: "dry4",
    id: 15
  }
}

interface Istate {
  detectLabel: {
    bbox: number[]
    class: number
    label: string
    score: string
  }
}

interface IProps {
  updateLabels: (arr: Istate["detectLabel"][]) => void
}

class OkayStart extends Component<IProps> {
  videoRef = createRef<HTMLVideoElement>();
  canvasRef = createRef<HTMLCanvasElement>();


  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment"
          }
        })
        .then(stream => {
          window.stream = stream;
          if (this.videoRef.current) {
            this.videoRef.current.srcObject = stream;
            return new Promise<void>((resolve, reject) => {
              if (this.videoRef.current) {
                this.videoRef.current.onloadedmetadata = () => {
                  resolve();
                };
              }
            });
          }
        });

      const modelPromise = load_model();

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  detectFrame = (video: HTMLVideoElement | null, model: tf.GraphModel) => {
    tf.engine().startScope();
    model.executeAsync(this.process_input(video)).then(predictions => {
      // console.log(model.outputNodes)
      // 🍀인자가 두개? 한개? -> video는 안되는거 확인함
      // this.renderPredictions(predictions, video);
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
      tf.engine().endScope();
    });
  };

  process_input(video_frame: any) {
    const tfimg = tf.browser.fromPixels(video_frame).toInt();
    const expandedimg = tfimg.transpose([0,1,2]).expandDims();
    return expandedimg;
  };

  buildDetectedObjects(scores: any, threshold: any, boxes: any, classes: any, classesDir: any) {
    const detectionObjects: { class: any; label: any; score: string; bbox: number[]; }[] = []
    var video_frame = document.getElementById('frame');

    scores[0].forEach((score: number, i: string | number) => {
      if(score > threshold && video_frame) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        if(classes[i] >= 1) {
          detectionObjects.push({
            class: classes[i],
            label: classesDir[classes[i]].name,
            score: score.toFixed(4),
            bbox: bbox
          })
        }
      }
    })
    return detectionObjects
  }

  renderPredictions = (predictions: any) => {
    if (this.canvasRef.current) {
      // console.log(predictions)
      const ctx = this.canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Font options.
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";

        //Getting predictions
        const boxes = predictions[4].arraySync(); //detection_boxes
        const scores = predictions[2].arraySync(); //identity_4:0
        const classes = predictions[7].dataSync(); //identity_2:0
    
        // console.log(classes)
        const detections = this.buildDetectedObjects(scores, threshold, boxes, classes, classesDir);
        if (detections.length > 0) {
          this.props.updateLabels(detections)
          // console.log('🎲detections:\n', detections);
        }
    
        detections.forEach((item: any) => {
          const x = item['bbox'][0];
          const y = item['bbox'][1];
          const width = item['bbox'][2];
          const height = item['bbox'][3];
    
          // Draw the bounding box.
          ctx.strokeStyle = "#6768AB";
          ctx.lineWidth = 4;
          ctx.strokeRect(x, y, width, height);
    
          // Draw the label background.
          ctx.fillStyle = "#6768AB";
          const textWidth = ctx.measureText(item["label"]).width;
          // const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
          const textHeight = parseInt(font, 10); // base 10
          ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
        });
    
        detections.forEach((item: any) => {
          const x = item['bbox'][0];
          const y = item['bbox'][1];
    
          // Draw the text last to ensure it's on top.
          ctx.fillStyle = "#000000";
          ctx.fillText(item["label"], x, y);
          // ctx.fillText(item["label"] + " " + (100*item["score"]).toFixed(2) + "%", x, y);
        });
      }
    }
  };

  render() {
    const browserWidth = window.innerWidth;
    return (
      <Wrapper>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width={browserWidth > 800 ? '600' : '310'}
          height={browserWidth > 800 ? '500' : '300'}
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width={browserWidth > 800 ? '600' : '310'}
          height={browserWidth > 800 ? '500' : '300'}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  position: relative;
  width: 600px;
  height: 600px;
  margin: auto;
  video {
    height: 600px;
    width: 500px;
  }
  .size {
    position: absolute;
    top: 0;
    left: 50px;
  }
  @media screen and (max-width: 800px) {
    width: 310px;
    height: 310px;
    video {
      height: 310px;
      width: 300px;
    }
    canvas {
      height: 300px;
      width: 310px;
    }
    .size {
      left: 5px;
    }
  }
`

export default OkayStart;