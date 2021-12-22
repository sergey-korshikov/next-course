import '../styles/globals.scss'
import NextNProgress from 'nextjs-progressbar'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			{/* <NextNProgress
				color="yellow"
				startPosition="0.3"
				stopDelayMs="200"
				height="3"
			/> */}
			<Component {...pageProps} />
		</>
	)
}
