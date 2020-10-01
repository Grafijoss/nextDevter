import { colors } from '../styles/theme'

import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import GitHub from '../components/icons/GitHub'

import { loginWithGitHub } from '../firebase/client'

// import styles from '../styles/Home.module.css'

export default function Home() {


	const handleClick = () => {
		loginWithGitHub().then(user => {
			console.log(user)
		}).catch(err => {
			console.log(err)
		})
	}

  return (
    <>
			<AppLayout>
				<section>
					<img src='/devter-logo.png' alt="logo" />
					<h1>Devter</h1>
					<h2>Talk about development <br />with developers</h2>
					<div>
						<Button onClick={handleClick}>
							<GitHub fill='#fff' height={24} width={24} />
							Login with GitHub
						</Button>
					</div>
				</section>
			</AppLayout>
		
			<style jsx>
				{`
					div {
						margin-top: 16px;
					}

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
