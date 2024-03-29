import { useCallback, useState } from 'react';

type useLocalStorageType<T> = Readonly<{
	storedValue: T;
	setValue: (v: T) => void;
	removeItem: (key: string) => void;
}>;
export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): useLocalStorageType<T> => {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	const removeItem = useCallback(() => {
		setStoredValue(initialValue);
		window.localStorage.removeItem(key);
	}, [key, initialValue]);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = useCallback(
		(value: T) => {
			try {
				setStoredValue(value);
				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				// A more advanced implementation would handle the error case
				console.log(error);
			}
		},
		[key]
	);

	return { storedValue, setValue, removeItem };
};
