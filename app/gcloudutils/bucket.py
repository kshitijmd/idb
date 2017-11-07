from google.cloud import storage
import urllib.request
import shutil
import imghdr
import sys
import os

#REQUIRED
#gcloud auth application-default login
#gcloud config set project playlistr-front

# Uploads a file to google cloud blob storage
# Returns a string of the public URL
def upload_to_cloud(spotifyURL):
	if not spotifyURL or spotifyURL == "":
		return "https://storage.googleapis.com/artifacts.playlistr-front.appspot.com/images/no_image.jpg"

	spotifyURL =  spotifyURL[:4]+spotifyURL[5:]

	file_name = spotifyURL[(spotifyURL.rfind("/")+1):]

	with urllib.request.urlopen(spotifyURL) as response, open("tempfile", 'wb') as out_file:
		shutil.copyfileobj(response, out_file)

	images_destination = "images/"
	source_file_name = file_name

	extension = imghdr.what("tempfile")
	if not extension:
		extension = ".jpeg"
	bucket_name = "artifacts.playlistr-front.appspot.com"
	destination_blob_name = images_destination + source_file_name + "." + extension

	storage_client = storage.Client()

	bucket = storage_client.get_bucket(bucket_name)

	blob = bucket.blob(destination_blob_name)

	blob.upload_from_filename("tempfile")

	blob.make_public()

	os.remove("tempfile")

	return blob.public_url

