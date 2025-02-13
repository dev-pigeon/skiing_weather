import { SkiResort } from "../../WorldMap/IconLayer";
import MenuCard from "../MenuCard";
import { useEffect } from "react";
import WeatherCardHook from "../../../hooks/menu/useWeatherCard";
import CurrentConditions from "./CurrentConditions";
interface WeatherCard {
  currentResort: SkiResort;
}

const WeatherCard = ({ currentResort }: WeatherCard) => {
  const useWeatherCard = WeatherCardHook();
  useEffect(() => {
    useWeatherCard.requestWeatherData(
      parseFloat(currentResort.coordinates[1]),
      parseFloat(currentResort.coordinates[0])
    );
  }, [currentResort]);
  return (
    <div>
      {useWeatherCard.weatherData && (
        <MenuCard sx={{ width: 200 }}>
          <CurrentConditions
            useWeatherCard={useWeatherCard}
            currentResort={currentResort}
          />
        </MenuCard>
      )}
    </div>
  );
};

export default WeatherCard;
