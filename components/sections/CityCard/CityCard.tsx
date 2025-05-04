import React from "react";
import Link from "next/link";
import { Card, Col, Row, Stack } from "react-bootstrap";
import styles from "./CityCard.module.scss";
import useIsMobile from "@/hooks/useMediaSize";
import { ForecastApi, WeatherApi } from "@/types/types";
import { useFavoritesStore } from "@/store/favorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";

type Props = {
  weather: WeatherApi | ForecastApi["list"][number];
  cityName?: string;
  countryCode?: string;
  readonly?: boolean;
};

const CityCard = ({
  weather,
  cityName,
  countryCode,
  readonly = false,
}: Props) => {
  const isMobile = useIsMobile();

  const name = "name" in weather ? weather.name : (cityName ?? "");
  const country =
    typeof weather.sys === "object" && "country" in weather.sys
      ? weather.sys.country
      : (countryCode ?? "");

  const isFav = useFavoritesStore((s) => s.isFavorite({ name, country }));
  const toggleFav = useFavoritesStore((s) => s.toggleFavorite);

  const content = (
    <Card className={`cardDark text-white`}>
      <Card.Body>
        <Card.Title
          as="h2"
          className="fw-bold d-flex justify-content-between align-items-center"
        >
          <span>
            {name}, {country}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFav({ name, country });
            }}
            style={{ all: "unset", cursor: "pointer" }}
          >
            {isFav ? (
              <FaHeart color="var(--blue)" />
            ) : (
              <FaRegHeart color={"white"} />
            )}
          </button>
        </Card.Title>

        <Stack
          direction={isMobile ? "vertical" : "horizontal"}
          className="align-items-center justify-content-between my-3"
        >
          <Stack
            direction="horizontal"
            gap={3}
            className="align-items-center flex-wrap"
          >
            <div className={styles.nowTemp}>
              {Math.round(weather.main.temp)}°C
            </div>
            <Image
              width={36}
              height={36}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              unoptimized
            />
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <span className={`${styles.tempBox} ${styles.min}`}>
              +{Math.round(weather.main.temp_min)}°
            </span>
            <span className={`${styles.tempBox} ${styles.max}`}>
              +{Math.round(weather.main.temp_max)}°
            </span>
          </Stack>
        </Stack>

        <Stack
          direction="horizontal"
          gap={3}
          className={`${styles.conditions} flex-wrap justify-content-between`}
        >
          <span>
            💧{" "}
            {isMobile
              ? `${weather.main.humidity}%`
              : `Влажность: ${weather.main.humidity}%`}
          </span>
          <span>
            💨{" "}
            {isMobile
              ? `${weather.wind.speed} м/с`
              : `Ветер: ${weather.wind.speed} м/с`}
          </span>
          <span>
            🌡{" "}
            {isMobile
              ? `${weather.main.feels_like}°`
              : `Ощущается как: ${weather.main.feels_like}°`}
          </span>
        </Stack>
      </Card.Body>
    </Card>
  );

  return (
    <Row className="justify-content-center">
      <Col>
        {!readonly && "name" in weather ? (
          <Link
            href={`/${encodeURIComponent(name.toLowerCase())}`}
            className="text-decoration-none"
          >
            {content}
          </Link>
        ) : (
          content
        )}
      </Col>
    </Row>
  );
};

export default CityCard;
