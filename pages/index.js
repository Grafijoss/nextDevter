import Head from 'next/head'
import Link from 'next/link'

import { colors } from '../styles/theme'

import AppLayout from '../components/AppLayout'

// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
			<AppLayout>
				<section>
					<img src='/devter-logo.png' alt="logo" />
					<h1>Devter</h1>
					<h2>Talk about development <br />with developers</h2>
				</section>
			</AppLayout>
		
			<style jsx>
				{`

					section {
						display: grid;
						height: 100%;
						place-content: center;
						place-items: center;
					}

					img {
						width: 120px;
					}

					h1 {
						color: ${colors.primary};
						font-size: 24px;
						font-weight: 800;
						margin-bottom: 16px;
					}

					h2 {
						color: ${colors.secondary};
						font-size: 21px;
						margin: 0;
					}
				`}
			</style>
    </>
		)

}
