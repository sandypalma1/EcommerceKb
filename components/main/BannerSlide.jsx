import { Avatar } from '@mui/material';
import { Zoom } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

const images = [
	'/banners/banner-1.jpg',
	'/banners/banner-2.jpg',
	'/banners/banner-3.jpg',
	'/banners/banner-4.jpg',
];

const zoomOutProperties = {
	duration: 4000,
	transitionDuration: 2000,
	infinite: true,
	indicators: true,
	scale: 2,
	arrows: false,
};

export const BannerSlide = () => {
	return (
		<div className='slide-container'>
			<Zoom {...zoomOutProperties}>
				{images.map((each, index) => (
					<Avatar
						key={index}
						style={{ width: '100%', height: 'auto' }}
						src={each}
						variant='square'
					/>
				))}
			</Zoom>
		</div>
	);
};
