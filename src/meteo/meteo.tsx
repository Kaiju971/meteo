import React, { useState } from "react";
import axios from "axios";
import { APIKey } from "../config";
import { MeteoType } from "./types";


import * as S from "./meteo.styled";

const Meteo: React.FC = () => {
  const [data, setData] = useState<MeteoType>();
  const [location, setLocation] = useState("");
  const [destinationNotFound, setDestinationNotFound] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}&lang=fr`;

  const searchLocation = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setLocation("");
          setDestinationNotFound(false); // Réinitialiser la destination non trouvée
        })
        .catch((error) => {
          console.error(error);
          setData(undefined); // Réinitialiser les données en cas d'erreur
          setDestinationNotFound(true); // Indiquer que la destination n'a pas été trouvée
        });
    }
  };

  return (
    <S.Container>
      <S.ContIframe>
        <iframe
          name="meteoParis"
          seamless
           width="888"
           height="336"
          src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=48.85341,2.3488&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=AhheSQd5UXNVeFFmVyEAKVc%2FBTALfQgvBnpXNApvB3oCaVMyDm4BZ1Y4BnsHKAM1VXgCYVphCTkEb1IqXy0FZAJoXjIHbFE2VTpRNFd4ACtXeQVkCysILwZsVzIKeQdlAmlTMw5zAWpWMAZ6Bz8DN1V5An1aZAk3BG5SMF86BW4CaV44B2RRO1UlUSxXYQAxV2UFYAs3CDMGYFcwCm8HMgJlUzQOOwFmVicGbAc2AzBVYQJlWmIJNQRiUipfLQUfAhJeJwckUXFVb1F1V3oAYVc6BTE%3D&_c=6412fde6ca4f6cba41c13b70eafa20a0"
        ></iframe>
      </S.ContIframe>
      <S.Recherche>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Entrez votre destination préférée ..."
          type="text"
        />
      </S.Recherche>
      <S.MeteoData>
        {destinationNotFound ? (
          <div className="destination-not-found">
            <p>Destination non trouvée</p>
          </div>
        ) : (
          data !== undefined && (
            <div className="contenaire">
              <div className="information">
                <div className="infos-meteo">
                  <div className="localisation">
                    <h1>
                      {data.name} / {data.sys.country}
                    </h1>
                  </div>
                  <div className="temperature">
                    {data ? <h2>{Math.floor(data.main.temp)}°C</h2> : null}
                  </div>
                  <div className="temperature-min-max">
                    <p>
                      {Math.floor(data.main.temp_min)}°C /
                      {Math.floor(data.main.temp_max)}°C
                    </p>
                  </div>
                  <div className="description">
                    {data ? (
                      <h3 style={{ textTransform: "capitalize" }}>
                        {data.weather[0].description}
                      </h3>
                    ) : null}
                  </div>
                </div>
                <div className="icones">
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
              <div className="infos">
                <div className="ressenti">
                  {data.main ? (
                    <h3>{Math.floor(data.main.feels_like)}°C</h3>
                  ) : null}
                  <p>Ressenti</p>
                </div>
                <div className="humidité">
                  {data.main ? <h3>{data.main.humidity}%</h3> : null}
                  <p>Humidité</p>
                </div>
                <div className="vent">
                  {data ? <h3>{Math.floor(data.wind.speed)} km/h</h3> : null}
                  <p>Vent</p>
                </div>
                <div className="pression">
                  {data ? <h3>{data.main.pressure} bar</h3> : null}
                  <p>Pression</p>
                </div>
              </div>
            </div>
          )
        )}
      </S.MeteoData>
    </S.Container>
  );
};

export default Meteo;
