import { colors } from '../../styles/theme'

export default function Button ({ children, onClick }) {
	return (
		<>
			<button onClick={onClick}>
				{children}
			</button>
			<style jsx>
				{`
					button {
						background: ${colors.black};
						border: 0;
						border-radius: 9999px;
						color: ${colors.white};
						cursor: pointer;
						font-weight: 800;
						padding: 8px 24px;
						transition: .2s;
  					will-change: transform;
					} 

					button:hover {
						opacity: .7;
					}

					button:active {
						transform: scale(.9);
						outline: 0;
					}

					button:focus {
						outline: 0;
					}
				`}
			</style>
		</>
	)
}