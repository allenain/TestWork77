import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Stack } from "react-bootstrap";
import { ForecastApi } from "@/types/types";
import styles from "./Forecast.module.scss";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useMediaSize";
import dynamic from "next/dynamic";
import Image from "next/image";

const CityCard = dynamic(
  () => import("@/components/sections/CityCard/CityCard"),
);
const Loader = dynamic(() => import("@/components/ui/Loader"));

const API = "https://api.openweathermap.org/data/2.5/forecast";
const KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const Forecast = () => {
  const router = useRouter();
  const isMobile = useIsMobile(992);
  const { city } = router.query;

  const [data, setData] = useState<ForecastApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [activeDate, setActiveDate] = useState<string | null>(null);

  useEffect(() => {
    if (!city || typeof city !== "string") return;

    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<ForecastApi>(API, {
          params: { q: city, appid: KEY, units: "metric", lang: "ru" },
        });
        setData(data);
        setErr("");
        setActiveDate(data.list[0].dt_txt.slice(0, 10));
      } catch {
        setErr("Ошибка получения прогноза");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [city]);

  const splitForecast = (list: ForecastApi["list"]) => {
    const byDay: Record<string, ForecastApi["list"]> = {};
    list.forEach((pt) => {
      const key = pt.dt_txt.slice(0, 10);
      (byDay[key] ??= []).push(pt);
    });
    const daily = list.filter((p) => p.dt_txt.includes("12:00:00"));
    return { byDay, daily };
  };

  if (loading) return <Loader />;
  if (err) return <p className="text-danger text-center mt-4">{err}</p>;
  if (!data) return null;

  const { byDay, daily } = splitForecast(data.list);
  const hoursForActive = activeDate ? (byDay[activeDate] ?? []) : [];
  const current = data.list[0];

  return (
    <Container fluid className="pageBg py-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Stack
            direction={isMobile ? "vertical" : "horizontal"}
            className="align-items-stretch gap-4"
          >
            <Col className="d-flex flex-column gap-4">
              <CityCard
                weather={current}
                readonly
                cityName={data.city.name}
                countryCode={data.city.country}
              />

              <Card className="cardDark text-white flex-grow-1">
                <Card.Body>
                  <Card.Title className="text-uppercase text-secondary fs-6 mb-3">
                    {activeDate
                      ? new Date(activeDate).toLocaleDateString("ru-RU", {
                          weekday: "long",
                        })
                      : "Today"}{" "}
                  </Card.Title>

                  <Stack
                    direction="horizontal"
                    gap={2}
                    className={`${hoursForActive.length > 3 && styles.hourList} overflow-auto flex-nowrap`}
                  >
                    {hoursForActive.map((p) => (
                        <div
                            key={p.dt}
                            className={`d-flex flex-column align-items-center px-2`}
                        >
                        <span className="mb-2 text-secondary fw-semibold">
                          {new Date(p.dt * 1000)
                              .getHours()
                              .toString()
                              .padStart(2, "0")}
                          :00
                        </span>
                          <Image
                              width={48}
                              height={48}
                              src={`https://openweathermap.org/img/wn/${p.weather[0].icon}.png`}
                              alt={p.weather[0].description}
                          />
                          <span className="fw-bold mt-2">
                          {Math.round(p.main.temp)}°
                        </span>
                        </div>
                    ))}
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="cardDark p-3 h-100">
                <Card.Title className="text-uppercase text-secondary fs-6 mb-3">
                  Прогноз на неделю
                </Card.Title>

                <ListGroup variant="flush" className={styles.listGroup}>
                  {daily.map((p) => {
                    const key = p.dt_txt.slice(0, 10);
                    const isActive = key === activeDate;
                    return (
                      <ListGroup.Item
                        key={p.dt}
                        onClick={() => setActiveDate(key)}
                        className={`d-flex align-items-center justify-content-between bg-transparent px-0 py-3 border-0 text-white ${
                          isActive ? styles.activeDay : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="w-25 text-capitalize">
                          {new Date(p.dt * 1000).toLocaleDateString("ru-RU", {
                            weekday: "short",
                          })}
                        </span>
                        <Image
                          width={36}
                          height={36}
                          src={`https://openweathermap.org/img/wn/${p.weather[0].icon}.png`}
                          alt={p.weather[0].description}
                        />

                        <span className="flex-grow-1 text-center text-secondary">
                          {p.weather[0].main}
                        </span>

                        <span className="fw-bold">
                          {Math.round(p.main.temp_max)}/
                          {Math.round(p.main.temp_min)}°
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Forecast