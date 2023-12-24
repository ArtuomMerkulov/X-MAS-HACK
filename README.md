Для запуска инференса на python через терминал:
1. Добавить изображение/видео для инференса в любую директорию
2. Перейти в X-MAS-HACK\model1_correction\WB_sRGB_Python
3.
* Для изображения выполнить команду вида: `python demo.py --img_path path1 --out_dir path2 --out_name desired_name`, где path1 - путь к картинке для инференса; path2 - путь к директории, куда будет сохранено полученное изображение (если не указано, то будет сохранено по дефолту в X-MAS-HACK\model1_correction\WB_sRGB_Python); desired_name - имя для файла вместе с расшерением (если не указать, то по дефолту result.png). По дефолту исходное и итоговое изображения автоматически откроются в новом окне, если это поведение не является желательным, можно добавить в команду `--show_output 0`. Пример: `python demo.py --img_path ..\example_images\Set1_Rendered_WB.png --out_name Set1_Rendered_WB_result.png`
* Для видео выполнить команду вида: `python demo.py --video_path path1 --out_dir path2 --out_name desired_name`, где path1 - путь к видео для инференса; path2 - путь к директории, куда будет сохранено полученное видео (если не указано, то будет сохранено по дефолту в X-MAS-HACK\model1_correction\WB_sRGB_Python); desired_name - имя для файла вместе с расшерением (если не указать, то по дефолту result_video.mp4). `python demo.py --video_path ..\example_images\sample.mp4 --out_name sample_result.mp4`

Для запуска web-интерфейса:
1. Проверьте установлен ли у вас Node JS `node -v`. Если нет, то установите.
2. Перейдите в папку X-MAS-HACK\UI
3. Обновите зависимости `npm install`
4. Запустите локальный web-сервер `npm run dev`
5. В браузере перейдите по ссылке `http://localhost:5173/`
