# import the necessary packages
from PIL import Image
import pytesseract
import argparse
import cv2
import os
import numpy as np

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
                help="path to input image to be OCR'd")
ap.add_argument("-p", "--preprocess", type=str, default="thresh",
                help="type of preprocessing to be done")
args = vars(ap.parse_args())
# load the example image and convert it to grayscale
image = cv2.imread(args["image"])
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# cv2.imshow("grises", gray)
_, gray = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
# kernel = np.ones((1,1),np.uint8)
# gray = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
cv2.imshow("test", gray)
# cv2.waitKey(0)
# check to see if we should apply thresholding to preprocess the
# image
# if args["preprocess"] == "thresh":
gray = cv2.threshold(gray, 0, 255,
                     cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

# make a check to see if median blurring should be done to remove
# noise
# elif args["preprocess"] == "blur":
gray = cv2.medianBlur(gray, 3)

# write the grayscale image to disk as a temporary file so we can
# apply OCR to it
filename = "{}.png".format(os.getpid())
cv2.imwrite(filename, gray)
# Define config parameters.
# '-l eng'  for using the English language
# '--oem 1' for using LSTM OCR Engine

config = ('-l spa --oem 1 --psm 3')
# load the image as a PIL/Pillow image, apply OCR, and then delete
# the temporary file
text = pytesseract.image_to_string(Image.open(filename), config=config)
os.remove(filename)
print(text)

# show the output images
# cv2.imshow("Image", image)
# cv2.imshow("Output", gray)
cv2.waitKey(0)
