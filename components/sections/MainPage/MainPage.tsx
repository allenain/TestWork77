import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import styles from "./MainPage.module.scss";
import { WeatherApi } from "@/types/types";
import dynamic from "next/dynamic";

const CityCard = dynamic(() => import("@/components/sections/CityCard/CityCard"));
const Loader = dynamic(() => import("@/components/ui/Loader"));

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";

const MainPage = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherApi | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const { data } = await axios.get(WEATHER_API, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "ru",
        },
      });
      setWeather(data);
    } catch {
      setError("Город не найден");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container fluid className="pageBg">
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <InputGroup>
              <Form.Control
                className={styles.input}
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              />
              <Button onClick={fetchWeather}>Поиск</Button>
            </InputGroup>
          </Col>
        </Row>
        {loading && <Loader />}
        {error && <Row className="justify-content-center">{error}</Row>}
        {weather && (
          <Row className="justify-content-center mb-4">
            <Col md={10}>
              <CityCard weather={weather} />
            </Col>
          </Row>
        )}
      </Container>

  );
};

export default MainPage;
