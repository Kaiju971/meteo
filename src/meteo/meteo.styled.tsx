import { styled } from "@mui/material/styles";
import meteo from "../image/meteobis.jpg";

export const Container = styled("div")`
  background-image: url(${meteo});
  background-size: cover;
  min-height: 100vh;

  * {
    margin: 0;
    padding: 0;
  }

  /* iframe {
    width: 100vw;
    position: relative;
  } */
  @media (max-width: 750px) {
    width: 100vw;
  }
`;

export const Recherche = styled("div")`
  text-align: center;
  margin: 10%;
`;

export const MeteoData = styled("div")`
  text-align: center;
  min-height: 100vh;
  color: white;
`;


export const ContIframe = styled("div")`
  width: 100%;
  text-align: center;
  /* height: 50%; */
`;
