import Link from 'next/link';
import React from 'react'

const Genre = () => {
    const [genreDropdownOpen, setGenreDropdownOpen] = React.useState(false);
    const genresArray = [
        "Action",
        "Adventure",
        "Avant Garde",
        "Boys Love",
        "Comedy",
        "Demons",
        "Drama",
        "Ecchi",
        "Fantasy",
        "Girls Love",
        "Gourmet",
        "Harem",
        "Horror",
        "Isekai",
        "Iyashikei",
        "Josei",
        "Kids",
        "Magic",
        "Mahou Shoujo",
        "Martial Arts",
        "Mecha",
        "Military",
        "Music",
        "Mystery",
        "Parody",
        "Psychological",
        "Reverse Harem",
        "Romance",
        "School",
        "Sci-Fi",
        "Seinen",
        "Shoujo",
        "Shounen",
        "Slice of Life",
        "Space",
        "Sports",
        "Super Power",
        "Supernatural",
        "Suspense",
        "Thriller",
        "Vampire"
      ];
      const handleGenreDropdown = () => {
        setGenreDropdownOpen(!genreDropdownOpen);
      };
      const rowSize = Math.ceil(genresArray.length / 6);
  const genresRows = [];

  for (let i = 0; i < 6; i++) {
    genresRows.push(genresArray.slice(i * rowSize, (i + 1) * rowSize));
  }
  const handleDropdownMouseEnter = () => {
    setGenreDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setGenreDropdownOpen(false);
  };
  return (
    <div
    className="relative"
    onMouseLeave={handleDropdownMouseLeave}
  >
    <button
     onMouseEnter={handleDropdownMouseEnter}
    
      className="text-white px-3 py-2 border border-white rounded-md hover:bg-[#272931]"
    >
      Genres
    </button>
    {genreDropdownOpen && (
      <div className="absolute top-full left-0 mt-1 bg-[#272931] text-white rounded-md flex flex-wrap">
        {genresRows.map((row, rowIndex) => (
          <ul key={rowIndex} className="mx-2">
            {row.map((genre, index) => (
              <li key={index}>
                <Link href={`/genre/${genre}`} className="block px-4 py-2 hover:bg-[#f07e5c]">
                  
                    {genre}
                  
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )}
  </div>
  )
}

export default Genre