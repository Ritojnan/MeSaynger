import React, { useState } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Image,
  Center,
  Text,
  Box,
} from '@chakra-ui/react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  function getImage() {
    setLoading(true);

    fetch('http://localhost:5000/api/images/getimage', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((imgobj) => {
        console.log(imgobj);
        setImages(imgobj.data);
        setLoading(false);
      });
  }

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Image Gallery
      </Text>
      <Center>
        <Button onClick={getImage} isLoading={loading} loadingText="Fetching Images">
          Fetch Images
        </Button>
      </Center>
      <Grid
        templateColumns="repeat(3, 1fr)" // Adjust the number of columns as needed
        gap={4}
        mt={4}
      >
        {images.map((image) => (
          <GridItem key={image._id} colSpan={1}>
            <Center>
              <Image
                src={image.image}
                alt="Image"
                boxSize="200px"
                objectFit="cover"
              />
            </Center>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
