import React from 'react';
import { Routes as Switch, Route, Navigate, useRoutes } from 'react-router-dom';
import { Results } from './Results';

export const Routes = () => {
	return (
		<div className='p-4'>
			<Switch>
				<Route path='/' element={<Navigate to='/search' />} replace={true} />
			</Switch>
			{useRoutes([
				{
					path: '/search',
					element: <Results />,
				},
				{
					path: '/image',
					element: <Results />,
				},
				{
					path: '/news',
					element: <Results />,
				},
				{
					path: '/video',
					element: <Results />,
				},
			])}
		</div>
	);
};
