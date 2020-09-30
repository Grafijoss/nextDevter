import Head from 'next/head'
import Link from 'next/link'

import AppLayout from '../components/AppLayout'

// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

			<AppLayout>
					<h1>
						<a href="https://nextjs.org">Depter!</a>
					</h1>
					<nav>
						<Link href="/timeline">
							timeline
						</Link>
					</nav>
			</AppLayout>
		
			<style jsx>
				{`
					h1 {
						text-align: center;
						font-size: 48px;
					}

					nav {
						font-size: 24px;
						text-align:center;
					}
				`}
			</style>
    </>
		)

}
