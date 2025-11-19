import React, {useEffect} from 'react';

function SearchBar({ dataToSearch, placeholder, ...props }) {

    const [query, setQuery] = React.useState("");

    useEffect(() => {

    }, [query]);

    return (

        <input className={"bg-transparent !outline-none w-full font-medium text-gray-900 text-lg placeholder-gray-400"}
               placeholder={placeholder}
               onChange={e => setQuery(e.target.value)}
               {...props}
        />
    );
}

export default SearchBar;