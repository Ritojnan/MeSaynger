from PIL import Image

# Create a new image with a white background
width, height = 100, 100
image = Image.new("RGB", (width, height))

# Create a pixel data list for alternating black and white
pixels = []
for y in range(height):
    for x in range(width):
        if (x + y) % 2 == 0:
            pixels.append((int(x/255),int(y/255), 0))  # Black
        else:
            pixels.append((255, int(y/255),int(x/255)))  # White

# Put the pixel data in the image
image.putdata(pixels)

# Save the image as a BMP file
image.save("dummy_new.bmp", "BMP")
