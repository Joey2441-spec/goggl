import Re, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Loading } from './Loading';
import { useResultContext } from '../contexts/ResultContextProvider';

export const Results = () => {
	const {
		results: { results, image_results, news },
		isLoading,
		getResults,
		searchTerm,
	} = useResultContext();
	const location = useLocation();

	useEffect(() => {
		getResults(`${location.pathname}/q=${searchTerm}`);
	}, [searchTerm, location.pathname]);

	if (isLoading) return <Loading />;
	console.log(location.pathname);
	switch (location.pathname) {
		case '/search':
			return (
				<div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
					{results?.map(({ link, title }, index) => (
						<div key={index} className='md:w-2/5 w-full'>
							<a href={link} target='_blank' rel='noreferrer'>
								<p className='text-sm'>{link.length > 30 ? link.substring(0, 30) + '...' : link}</p>
								<p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>{title}</p>
							</a>
						</div>
					))}
				</div>
			);
		case '/image':
			return (
				<div className='flex flex-wrap justify-center items-center'>
					{image_results?.map(({ image: { src }, link: { href, title } }, index) => (
						<a href={href} className='sm:p-3 p-5' key={index} target='_blank' rel='noreferrer'>
							<img src={src} alt={title} loading='lazy' />
							<p className='w-36 break-words text-sm mt-2'>{title}</p>
						</a>
					))}
				</div>
			);
		case '/news':
			return (
				<div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
					{news?.map(({ id, source, links, title }) => (
						<div key={id} className='md:w-2/5 w-full'>
							<a href={links?.[0].href} target='_blank' rel='noreferrer' className='hover:underline'>
								<p className='text-lg dark:text-blue-300 text-blue-700'>{title}</p>
							</a>
							<div className='flex gap-4'>
								<a href={source.href} target='_blank' rel='noreferrer'>
									{source.title}
								</a>
							</div>
						</div>
					))}
				</div>
			);
		case '/video':
			return (
				<div className='flex flex-wrap '>
					{console.log(results)}
					{results?.map((video, index) => (
						<div key={index} className='p-2'>
							{video?.additional_links?.[0]?.href && (
								<ReactPlayer url={video.additional_links?.[0].href} controls width='355px' height='200px' />
							)}
						</div>
					))}
				</div>
			);

		default:
			return 'Error';
	}
};
