import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/MainLayout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { MyPost } from './../../interfaces/post';

interface PostPageProps {
	post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
	const [post, setPost] = useState(serverPost)
	const router = useRouter()

	useEffect(() => {
		async function load() {
			const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
			const data = await response.json()
			setPost(data)
		}

		if (!serverPost) {
			load()
		}
	}, [])

	if (!post) {
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		)
	}

	return (
		<MainLayout title={post.title}>
			<h1>{post.title}</h1>
			<hr />
			<p>{post.text}</p>
			<Link href={'/posts/'}><a>Back to all posts</a></Link>
		</MainLayout>
	)
}

interface PostNextPageContext extends NextPageContext {
	query: {
		id: string
	}
}

// used for combine front and back
Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
	if (!req) {
		return {
			post: null
		}
	}

	const response = await fetch(`${process.env.API_URL}/posts/${query.id}`)
	const post: MyPost = await response.json()

	return {
		post
	}
}

// recomendation - new methods, runing only server
// export async function getServerSideProps({ query }) {
// 	const response = await fetch(`${process.env.API_URL}/posts/${query.id}`)
// 	const post = await response.json()

// 	return { props: { post } }
// }