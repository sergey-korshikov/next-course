
import Link from 'next/link';
import Head from 'next/head';

export function MainLayout({ children, title = "NextApp" }) {
	return (
		<>
			<Head>
				<title>{ title } | Next course</title>
				<meta name="keywords" content="next, javascript, nextjs, react" />
				<meta name="description" content="this is project on next.js" />
				<meta charSet="utf-8" />
			</Head>

			<nav>
				<Link href={'/'}><a>Home</a></Link>
				<Link href={'/about'}><a>About</a></Link>
				<Link href={'/posts'}><a>Posts</a></Link>
			</nav>

			<main>
				{children}
			</main>

			<style jsx>{`
				nav {
					background: darkblue;
				}
				nav a {
					display: inline-block;
					color: #fff;
					padding: 15px;
				}
			`}</style>
		</>
	)
}