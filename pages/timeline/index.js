import Link from 'next/link'

import AppLayout from '../../components/AppLayout'

export default function Timeline ({testName}) {
	return (
		<>
			<AppLayout>
	<h1>This is the timeline of {testName}</h1>
				<Link href="/">Go home</Link>
			</AppLayout>
			<style jsx>
				{`
					h1 {
						font-size: 36px;
						color: green;
					}

				`}
			</style>
		</>
	)
}

Timeline.getInitialProps = async () => {
	return fetch('http://localhost:3000/api/hello')
		.then(res => res.json())
		.then(response => {
			console.log(response)
			console.log('response')
			const testEnvironment = process.env.NODE_ENV
			console.log(testEnvironment)
			const { userName: testName } = response
			return { testName }
		})
}