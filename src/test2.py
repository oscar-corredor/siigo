# import the necessary packages
from PIL import Image
# import pytesseract
import argparse
import cv2
import os
import numpy as np


def increase_resolution():
	pass

def increase_contrast():
	pass

def binarize_img():
	gray = cv2.threshold(gray, 0, 255,
                     cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

def remove_noise(img):
	img = cv2.medianBlur(gray, 3)

def layout_analysis():
	pass



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



cv2.imshow("test", gray)
cv2.waitKey(0)










