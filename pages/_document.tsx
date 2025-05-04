import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <meta name="description" content="Weather App Test Work"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="TestWork77"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
