import { Navbar, Container, Button, Stack, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "./Header.module.scss";
import useMediaSize from "@/hooks/useMediaSize";


const Header = ({ favorite, main }: { favorite?: boolean; main?: boolean }) => {
  const isMobile = useMediaSize(768);
  return (
    <Navbar className={`${styles.navbar}`} sticky="top">
      <Container
        fluid
        className={`${isMobile ? "justify-content-start" : "justify-content-center"} px-0 `}
      >
        <Col md={10}>
          <Stack direction="horizontal" gap={2}>
            {main && <Link href="/" passHref>
              <Button size="sm">На главную</Button>
            </Link>}
            {favorite && (
              <Link href="/favorites" passHref>
                <Button variant="outline-light" size="sm">
                  Избранное
                </Button>
              </Link>
            )}
          </Stack>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
