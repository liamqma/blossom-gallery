import React from 'react';
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: 'http://dummyimage.com/600x400/000/fff&text=1',
        thumbnail: 'http://dummyimage.com/600x400/000/fff&text=1'
    },
    {
        original: 'http://dummyimage.com/600x400/000/fff&text=2',
        thumbnail: 'http://dummyimage.com/600x400/000/fff&text=2'
    },
    {
        original: 'http://dummyimage.com/600x400/000/fff&text=3',
        thumbnail: 'http://dummyimage.com/600x400/000/fff&text=3'
    }
];

export default function Home() {
    return <ImageGallery items={images} slideInterval={2000} />;
}
