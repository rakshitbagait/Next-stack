import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../../styles/searchbar.css";

const SearchBar = () => {

    const [query, setQuery] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    let placeholder = "Search StackMaps...";

    switch (location.pathname) {

        case "/dashboard":
            placeholder = "Search anything...";
            break;

        case "/roadmap":
            placeholder = "Search topics in your roadmap...";
            break;

        case "/explore":
            placeholder = "Search roadmaps...";
            break;

        case "/mentor":
            placeholder = "Ask your AI mentor...";
            break;

        case "/community":
            placeholder = "Search discussions...";
            break;

        case "/news":
            placeholder = "Search news...";
            break;

        case "/trending":
            placeholder = "Search technologies...";
            break;

        case "/settings":
            placeholder = "Search settings...";
            break;

        default:
            placeholder = "Search StackMaps...";
    }

    const handleSearch = () => {

        const text = query.trim();

        if (!text) return;

        switch (location.pathname) {

            case "/dashboard":
                navigate(`/dashboard?search=${encodeURIComponent(text)}`);
                break;

            case "/roadmap":
                navigate(`/roadmap?search=${encodeURIComponent(text)}`);
                break;

            case "/explore":
                navigate(`/explore?search=${encodeURIComponent(text)}`);
                break;

            case "/mentor":
                navigate(`/mentor?query=${encodeURIComponent(text)}`);
                break;

            case "/community":
                navigate(`/community?search=${encodeURIComponent(text)}`);
                break;

            case "/news":
                navigate(`/news?search=${encodeURIComponent(text)}`);
                break;

            case "/trending":
                navigate(`/trending?search=${encodeURIComponent(text)}`);
                break;

            case "/settings":
                navigate(`/settings?search=${encodeURIComponent(text)}`);
                break;

            default:
                navigate(`/search?q=${encodeURIComponent(text)}`);
        }
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (

        <div className="search-bar">

            <FaSearch className="search-icon" />

            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
                <button
        className="search-btn"
        onClick={handleSearch}
    >
        Search
    </button>

        </div>

    );

};

export default SearchBar;