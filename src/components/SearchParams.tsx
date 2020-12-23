import React, {
  useEffect,
  useState,
  useContext,
  FunctionComponent,
} from "react";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";
import Results from "./Results";
import ThemeContext from "../ThemeContext";
import { RouteComponentProps } from "@reach/router";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, , AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);

  const [breeds, setBreeds] = useState([] as string[]);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breeds);

  const [pets, setPets] = useState([] as Animal[]);

  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    if (animal) {
      pet
        .breeds(animal)
        .then(({ breeds: apiBreeds }) => {
          //console.log(breeds);
          const breedStrings = apiBreeds.map(({ name }) => name);
          setBreeds(breedStrings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <AnimalDropdown />
        <BreedDropdown />

        <label htmlFor="theme">Set Your Theme :</label>
        <select
          name="theme"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="darkblue">Dark Blue </option>
          <option value="mediumorchid">Medium Orchid</option>
          <option value="chartreuse">Chartreuse</option>
        </select>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
