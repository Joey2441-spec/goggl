import React, { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultsContextProvider = ({ children }) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const getResults = async (type) => {
		setIsLoading(true);

		const response = await fetch(`${baseUrl}${type}`, {
			method: 'GET',
			headers: {
				'X-User-Agent': 'desktop',
				'X-Proxy-Location': 'US',
				'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
				'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
			},
		});

		const data = await response.json();

		if (type.includes('/news')) {
			data['news'] = data['entries']; // Assign new key
			delete data['entries'];
		}
		console.log(data);
		setResults(data);
		setIsLoading(false);
	};

	return (
		<ResultsContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
			{children}
		</ResultsContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultsContext);
