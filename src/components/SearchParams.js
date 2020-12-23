import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";
import Results from "./Results";
import PropTypes from "prop-types";
import changeTheme from "../redux/actionCreators/changeTheme";
import changeLocation from "../redux/actionCreators/changeLocation";

const SearchParams = ({
  storeTheme,
  storeLocation,
  changeLocation,
  changeTheme,
}) => {
  const [location, setLocation] = useState(storeLocation);
  const [animal, , AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [theme, setTheme] = useState(storeTheme);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breeds);

  const [pets, setPets] = useState([]);

  async function requestPets() {
    changeLocation(location);
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }

  useEffect(() => {
    console.log("inside useEffect");
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
  }, [animal, setBreed, setBreeds, setLocation, storeLocation]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        {/* <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        /> */}
        <label htmlFor="theme">Location</label>
        <select
          name="location"
          id="location"
          value={location || storeLocation}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          onBlur={(e) => {
            setLocation(e.target.value);
          }}
        >
          <option value="San Fransisco, CA">San Fransisco, CA</option>
          <option value="Seattle, WA">Seattle, WA</option>
        </select>

        <AnimalDropdown />
        <BreedDropdown />

        <label htmlFor="theme">Set Your Theme :</label>
        <select
          name="theme"
          id="theme"
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
            changeTheme(e.target.value);
          }}
          onBlur={(e) => {
            setTheme(e.target.value);
            changeTheme(e.target.value);
          }}
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

SearchParams.propTypes = {
  storeTheme: PropTypes.string.isRequired,
  storeLocation: PropTypes.string.isRequired,
};
const mapStateToProps = ({ storeTheme, storeLocation }) => ({
  storeTheme,
  storeLocation,
});
const mapDispatchToProps = (dispatch) => ({
  changeTheme: (theme) => dispatch(changeTheme(theme)),
  changeLocation: (location) => dispatch(changeLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
