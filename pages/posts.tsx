import { useEffect, useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { MyPost } from './../interfaces/post';
import { NextPageContext } from 'next';
import Link from 'next/link';

interface PostsPageProps {
	posts: MyPost[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
	const [posts, setPosts] = useState(serverPosts)

	useEffect(() => {
		async function load() {
			const response = await fetch(`${process.env.API_URL}/posts`)
			const json = await response.json()
			setPosts(json);
		}

		if (!serverPosts) {
			load()
		}
	}, [])

	if (!posts) {
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		)
	}

	return (
		<MainLayout title="Posts page">
			<h1>Posts page</h1>
			<ul>
				{posts.map(post => (
					<li key={post.id}>
						<Link href={`/post/[id]`} as={`/post/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</MainLayout>
	)
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
	if (!req) {
		return {
			post: null
		}
	}

	const response = await fetch(`${process.env.API_URL}/posts`)
	const posts: MyPost[] = await response.json()

	return {
		posts
	}
}