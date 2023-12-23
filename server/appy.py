from flask import Flask, request, jsonify
import cv2
from X_MAS_HACK.model1_correction.WB_sRGB_Python.classes.models.model import WBsRGB as wb_srgb

app = Flask(__name__)

# Create an instance of the WB model
wbModel = wb_srgb.WBsRGB(gamut_mapping=2, upgraded=1)

# Define the REST API endpoint for color correction
@app.route('/color_correction', methods=['POST'])
def color_correction():
    # Get the video file from the request
    video_file = request.files['video']

    # Read the video file using OpenCV
    video_data = cv2.VideoCapture(video_file)

    # Process each frame of the video using the WB model
    corrected_frames = []
    while True:
        ret, frame = video_data.read()
        if not ret:
            break
        out_frame = wbModel.correctImage(frame)
        corrected_frames.append(out_frame)

    # Write the corrected video to a file using OpenCV
    out = cv2.VideoWriter('/content/sample-5s.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 30, (frame.shape[1], frame.shape[0]))
    for i in range(len(corrected_frames)):
        out.write(corrected_frames[i])
    out.release()

    # Return the corrected video file as a response
    return jsonify({'message': 'Video successfully corrected!', 'corrected_video': '/content/sample-5s.mp4'})

if __name__ == '__main__':
    app.run(debug=True)