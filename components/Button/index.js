import { colors } from '../../styles/theme'

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            align-items: center;
            background: ${colors.black};
            border: 0;
            border-radius: 9999px;
            color: ${colors.white};
            cursor: pointer;
            display: flex;
            font-weight: 800;
            padding: 8px 24px;
            transition: 0.2s;
            user-select: none;
            will-change: transform;
          }

          button[disabled] {
            opacity: 0.2;
            pointer-events: none;
          }

          button > :global(svg) {
            margin-right: 8px;
          }

          button:hover {
            opacity: 0.7;
          }

          button:active {
            transform: scale(0.9);
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
