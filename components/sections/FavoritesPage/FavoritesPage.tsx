import { useEffect, useState } from "react";
import axios from "axios";
import { useFavoritesStore } from "@/store/favorites";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { WeatherApi } from "@/types/types";
import dynamic from "next/dynamic";


const CityCard = dynamic(() => import("@/components/sections/CityCard/CityCard"));
const Loader = dynamic(() => import("@/components/ui/Loader"));

const KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const API = "https://api.openweathermap.org/data/2.5/weather";

const FavoritesPage = () => {
  const favorites = useFavoritesStore((s) => s.favorites);
  const [weatherData, setWeatherData] = useState<WeatherApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const results = await Promise.all(
        favorites.map(async (fav) => {
          if (!fav.name) return null;
          try {
            const res = await axios.get(API, {
              params: {
                q: `${fav.name},${fav.country}`,
                appid: KEY,
                units: "metric",
                lang: "ru",
              },
            });
            return res.data;
          } catch {
            return null;
          }
        }),
      );
      setWeatherData(results.filter(Boolean));
      setLoading(false);
    };

    if (favorites.length > 0) {
      fetchWeather();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  return (
    <Container fluid className="pageBg">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-white mb-4">Избранные города</h2>
          {loading ? (
            <Loader />
          ) : weatherData.length === 0 ? (
            <p className="text-white">Нет избранных городов.</p>
          ) : (
            <Stack direction="vertical" gap={3}>
              {weatherData.map((weather, i) => (
                <CityCard key={i} weather={weather} />
              ))}
            </Stack>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FavoritesPage;
