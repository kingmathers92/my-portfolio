import { T } from './theme'
export function SectionLabel({children}) {
  return (
    <div style={{
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: T.accent,
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
    }}>
    <span style={{ width: 24, height: 1, background: T.accent }} />
    {children}
    </div>
  )
}
