import cv2
import os
from classes import WBsRGB as wb_srgb
import argparse
import time
from tqdm import tqdm

def ResizeWithAspectRatio(image, width=None, height=None, inter=cv2.INTER_AREA):
  (h, w) = image.shape[:2]

  if width is None and height is None:
    return image
  if width is None:
    r = height / float(h)
    dim = (int(w * r), height)
  else:
    r = width / float(w)
    dim = (width, int(h * r))

  return cv2.resize(image, dim, interpolation=inter)

def get_parser():
    """A parser for command line arguments """

    parser = argparse.ArgumentParser(description='color correction')
    parser.add_argument('--img_path', type=str, default='',
                        help='input image filepath')
    parser.add_argument('--video_path', type=str, default='',
                        help='input video filepath')
    parser.add_argument('--out_dir', type=str, default='.',
                        help='output directory')
    parser.add_argument('--show_output', type=int, default=1,
                        help='show output')
    return parser

args = get_parser().parse_args()
img_path = args.img_path
out_dir = args.out_dir 
video_path = args.video_path
# можно установить upgraded_model = 1, чтобы исользовать более новую модель
upgraded_model = 0
# use gamut_mapping = 1 for scaling, 2 for clipping (results reported using clipping). 
# If the image is over-saturated, scaling is recommended.
gamut_mapping = 2
show_output = args.show_output

# создадим инстанс используемой модели
wbModel = wb_srgb.WBsRGB(gamut_mapping=gamut_mapping,
                         upgraded=upgraded_model)
os.makedirs(out_dir, exist_ok=True)

if img_path != '' and video_path == '':
  start_inf = time.perf_counter()
  I = cv2.imread(img_path)  # считаем изображение
  outImg = wbModel.correctImage(I)  # применим коррекцию
  cv2.imwrite(out_dir + '/' + 'result.jpg', outImg * 255)  # сохраним результат
  print(f"Inference time: {time.perf_counter() - start_inf}")

  if show_output == 1:
    cv2.imshow('input', ResizeWithAspectRatio(I, width=600))
    cv2.imshow('our result', ResizeWithAspectRatio(outImg, width=600))
    cv2.waitKey()
    cv2.destroyAllWindows()

# Коррекция цвета для видео в формате MP4
elif img_path == '' and video_path != '':
    start_inf = time.perf_counter()
    # Загрузка входного видео
    input_video = cv2.VideoCapture(video_path)

    # Получим параметры видеофайла (широта, высота, число кадров)
    width = int(input_video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(input_video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(input_video.get(cv2.CAP_PROP_FRAME_COUNT))

    # Определение кодека и создание объекта VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_video = cv2.VideoWriter(out_dir + '/' + 'result_video.mp4', fourcc, 30, (width, height))

    # Цикл по кадрам видео
    with tqdm(total=total_frames) as pbar:
      while input_video.isOpened():
          ret, frame = input_video.read()

          if ret:
              outImg = wbModel.correctImage(frame)  # применим коррекцию
              # Запись выходного кадра в выходное видео
              output_video.write((wbModel.correctImage(frame) * 255).astype('int8'))
              pbar.update(1)
          else:
              break

    # Освобождение объектов входного и выходного видео и закрытие окон
    cv2.destroyAllWindows()
    input_video.release()
    output_video.release()
    print(f"Inference time: {time.perf_counter() - start_inf}")
